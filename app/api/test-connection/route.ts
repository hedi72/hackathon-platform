import { NextResponse } from 'next/server';
import { prisma } from '../../../src/lib/prisma';

export async function GET() {
  try {
    console.log('🔧 Database connection test started');
    console.log('🌍 Environment:', process.env.NODE_ENV);
    console.log('🔗 Database URL exists:', !!process.env.DATABASE_URL);
    console.log('🔑 NextAuth Secret exists:', !!process.env.NEXTAUTH_SECRET);
    
    // Test database connection
    await prisma.$connect();
    console.log('✅ Database connected successfully');
    
    // Test a simple query
    const userCount = await prisma.user.count();
    console.log('👥 Total users in database:', userCount);
    
    await prisma.$disconnect();
    console.log('🔌 Database disconnected');
    
    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      data: {
        environment: process.env.NODE_ENV,
        userCount,
        databaseUrlExists: !!process.env.DATABASE_URL,
        nextAuthSecretExists: !!process.env.NEXTAUTH_SECRET,
        timestamp: new Date().toISOString()
      }
    });
    
  } catch (error) {
    console.error('❌ Database connection test failed:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Database connection failed',
        details: {
          message: error instanceof Error ? error.message : String(error),
          environment: process.env.NODE_ENV,
          databaseUrlExists: !!process.env.DATABASE_URL,
          nextAuthSecretExists: !!process.env.NEXTAUTH_SECRET,
          timestamp: new Date().toISOString()
        }
      },
      { status: 500 }
    );
  }
}