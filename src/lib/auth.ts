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
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    // Only add GitHub provider if credentials are available
    ...(process.env.GITHUB_ID && process.env.GITHUB_SECRET ? [
      GitHubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
        profile(profile) {
          return {
            id: profile.id.toString(),
            name: profile.name || profile.login,
            email: profile.email,
            image: profile.avatar_url,
            role: 'user', // default role for new GitHub users
          }
        },
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
          if (!credentials?.email || !credentials?.password) {
            return null
          }
          
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email
            }
          })

          if (!user) {
            return null
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password || ''
          )

          if (!isPasswordValid) {
            return null
          }
          
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          }
        } catch (error) {
          console.error('NextAuth authorize error:', error);
          return null
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  cookies: {
    sessionToken: {
      name: 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production'
      }
    }
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log('🔐 SignIn callback:', { provider: account?.provider, email: user?.email });
      return true;
    },
    jwt: async ({ user, token, account }) => {
      if (user) {
        console.log('🎫 JWT callback: Creating token for', user.email);
        token.role = user.role
      }
      return token
    },
    session: async ({ session, token }) => {
      if (token) {
        console.log('📋 Session callback: Creating session for', token.sub);
        session.user.id = token.sub
        session.user.role = typeof token.role === 'string' ? token.role : undefined
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      console.log('🔄 Redirect callback:', { url, baseUrl });
      
      // Toujours rediriger vers le dashboard après connexion/inscription réussie
      if (url === baseUrl || url === `${baseUrl}/` || url === '/') {
        return `${baseUrl}/dashboard`
      }
      
      // Si c'est une URL relative, construire l'URL complète
      if (url.startsWith('/')) {
        // Si c'est une page d'auth, rediriger vers le dashboard
        if (url.startsWith('/auth/')) {
          return `${baseUrl}/dashboard`
        }
        return `${baseUrl}${url}`
      }
      
      // Si l'URL contient déjà le baseUrl, la retourner telle quelle
      if (url.startsWith(baseUrl)) {
        return url
      }
      
      // Par défaut, rediriger vers le dashboard
      return `${baseUrl}/dashboard`
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
  debug: true,
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