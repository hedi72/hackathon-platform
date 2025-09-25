import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../src/lib/auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '../../../src/lib/prisma';

export async function GET() {
  try {
    console.log('🔐 NextAuth test called at:', new Date().toISOString());
    
    // Test NextAuth configuration
    const testResult: any = {
      timestamp: new Date().toISOString(),
      nextauth: {
        configured: true,
        url: process.env.NEXTAUTH_URL,
        hasSecret: !!process.env.NEXTAUTH_SECRET,
        providers: []
      },
      environment: {
        nodeEnv: process.env.NODE_ENV,
        hasGithubId: !!process.env.GITHUB_ID,
        hasGithubSecret: !!process.env.GITHUB_SECRET,
        hasDatabaseUrl: !!process.env.DATABASE_URL,
      },
      database: {
        connection: 'not_tested',
        adapter: 'not_tested'
      }
    };

    // Test database connection for adapter
    try {
      console.log('🔌 Testing database connection for adapter...');
      await prisma.$connect();
      console.log('✅ Database connected for adapter');
      testResult.database.connection = 'success';
      
      // Test adapter functionality
      console.log('🔧 Testing Prisma adapter...');
      const adapter = PrismaAdapter(prisma);
      console.log('✅ Prisma adapter created successfully');
      testResult.database.adapter = 'created';
      
      // Test basic adapter methods
      if (adapter.getUser) {
        console.log('✅ Adapter getUser method exists');
        testResult.database.adapterMethods = 'available';
      }
      
    } catch (dbError) {
      console.error('❌ Database/Adapter test failed:', dbError);
      testResult.database = {
        connection: 'failed',
        adapter: 'failed',
        error: dbError instanceof Error ? dbError.message : 'Unknown error'
      };
    }

    // Test getting session (this might fail if there are issues)
    try {
      console.log('📋 Testing session retrieval...');
      const session = await getServerSession(authOptions);
      testResult.session = {
        exists: !!session,
        user: session?.user?.email ? { email: session.user.email } : null
      };
      console.log('✅ Session test successful');
    } catch (sessionError) {
      console.error('❌ Session test failed:', sessionError);
      testResult.session = {
        error: sessionError instanceof Error ? sessionError.message : 'Unknown error'
      };
    }

    // Test auth options
    try {
      testResult.nextauth.providers = authOptions.providers?.map(provider => ({
        id: provider.id,
        name: provider.name,
        type: provider.type
      })) || [];
      console.log('✅ Auth options test successful');
    } catch (authError) {
      console.error('❌ Auth options test failed:', authError);
      testResult.authOptions = {
        error: authError instanceof Error ? authError.message : 'Unknown error'
      };
    }

    console.log('🔐 NextAuth test results:', testResult);
    
    return NextResponse.json(testResult);

  } catch (error) {
    console.error('❌ NextAuth test error:', error);
    
    return NextResponse.json(
      {
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: process.env.NODE_ENV === 'development' ? 
          (error instanceof Error ? error.stack : undefined) : 
          undefined
      },
      { status: 500 }
    );
  } finally {
    try {
      await prisma.$disconnect();
      console.log('🔌 Database disconnected from auth test');
    } catch (disconnectError) {
      console.error('⚠️ Error disconnecting from database:', disconnectError);
    }
  }
}