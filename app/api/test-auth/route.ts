import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../src/lib/auth';

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
      }
    };

    // Test getting session (this might fail if there are issues)
    try {
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
  }
}