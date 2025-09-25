import { NextResponse } from 'next/server';
import { prisma } from '../../../src/lib/prisma';

export async function GET() {
  try {
    console.log('🔍 Database test called at:', new Date().toISOString());
    
    // Test database connection
    console.log('🔌 Testing database connection...');
    await prisma.$connect();
    console.log('✅ Database connected successfully');
    
    // Test a simple query
    console.log('📊 Testing database query...');
    const userCount = await prisma.user.count();
    console.log('👥 User count:', userCount);
    
    const testResult = {
      status: 'success',
      timestamp: new Date().toISOString(),
      database: {
        connected: true,
        userCount: userCount,
        provider: 'mongodb'
      },
      environment: {
        nodeEnv: process.env.NODE_ENV,
        hasDatabaseUrl: !!process.env.DATABASE_URL,
        databaseUrlPrefix: process.env.DATABASE_URL?.substring(0, 20) + '...'
      }
    };

    console.log('✅ Database test successful:', testResult);
    
    return NextResponse.json(testResult);
    
  } catch (error) {
    console.error('❌ Database test failed:', error);
    
    const errorResult = {
      status: 'error',
      timestamp: new Date().toISOString(),
      database: {
        connected: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        errorName: error instanceof Error ? error.name : undefined
      },
      environment: {
        nodeEnv: process.env.NODE_ENV,
        hasDatabaseUrl: !!process.env.DATABASE_URL,
        databaseUrlPrefix: process.env.DATABASE_URL?.substring(0, 20) + '...'
      }
    };
    
    return NextResponse.json(errorResult, { status: 500 });
    
  } finally {
    try {
      await prisma.$disconnect();
      console.log('🔌 Database disconnected');
    } catch (disconnectError) {
      console.error('⚠️ Error disconnecting from database:', disconnectError);
    }
  }
}