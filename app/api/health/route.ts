import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('🏥 Health check called at:', new Date().toISOString());
    
    const healthInfo = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      vercel: {
        region: process.env.VERCEL_REGION,
        deployment: process.env.VERCEL_GIT_COMMIT_SHA?.substring(0, 7),
      },
      config: {
        hasDatabaseUrl: !!process.env.DATABASE_URL,
        hasNextAuthUrl: !!process.env.NEXTAUTH_URL,
        hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
        databaseUrlPreview: process.env.DATABASE_URL ? 
          `${process.env.DATABASE_URL.substring(0, 20)}...` : 
          'Not set',
        nextAuthUrl: process.env.NEXTAUTH_URL || 'Not set',
      }
    };

    console.log('🏥 Health info:', healthInfo);
    
    return NextResponse.json(healthInfo);
    
  } catch (error) {
    console.error('🚨 Health check error:', error);
    
    return NextResponse.json(
      {
        status: 'error',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function POST() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}