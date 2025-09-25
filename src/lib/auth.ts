import { NextAuthOptions, User as NextAuthUser } from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from './prisma'
import bcrypt from 'bcryptjs'

// Extend NextAuth User and AdapterUser types to include 'role'
declare module 'next-auth' {
  interface User {
    role?: string
  }
  interface Session {
    user: {
      id?: string
      role?: string
      email?: string
      name?: string
    }
  }
}

declare module 'next-auth/adapters' {
  interface AdapterUser {
    role?: string
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    // Only add GitHub provider if credentials are available
    ...(process.env.GITHUB_ID && process.env.GITHUB_SECRET ? [
      GitHubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      })
    ] : []),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          console.log('🔐 NextAuth: Attempting credentials login');
          
          if (!credentials?.email || !credentials?.password) {
            console.log('❌ NextAuth: Missing credentials');
            return null
          }

          console.log('🔍 NextAuth: Looking for user:', credentials.email);
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email
            }
          })

          if (!user) {
            console.log('❌ NextAuth: User not found');
            return null
          }

          console.log('🔒 NextAuth: Verifying password');
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password || ''
          )

          if (!isPasswordValid) {
            console.log('❌ NextAuth: Invalid password');
            return null
          }

          console.log('✅ NextAuth: Login successful for:', user.email);
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          }
        } catch (error) {
          console.error('💥 NextAuth authorize error:', error);
          return null
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    jwt: async ({ user, token }) => {
      if (user) {
        token.role = user.role
      }
      return token
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user.id = token.sub
        session.user.role = typeof token.role === 'string' ? token.role : undefined
      }
      return session
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
  debug: process.env.NODE_ENV === 'development',
  logger: {
    error(code, metadata) {
      console.error('🚨 NextAuth Error:', code, metadata);
    },
    warn(code) {
      console.warn('⚠️ NextAuth Warning:', code);
    },
    debug(code, metadata) {
      console.log('🔍 NextAuth Debug:', code, metadata);
    },
  },
}