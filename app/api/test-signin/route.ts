import { NextResponse } from 'next/server';
import { prisma } from '../../../src/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    console.log('🧪 Test signin API called at:', new Date().toISOString());
    
    const body = await request.json();
    const { email, password } = body;
    
    console.log('📝 Test signin request:', { email, hasPassword: !!password });

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password required' },
        { status: 400 }
      );
    }

    // Step 1: Test database connection
    console.log('🔌 Testing database connection...');
    try {
      await prisma.$connect();
      console.log('✅ Database connection successful');
    } catch (dbError) {
      console.error('❌ Database connection failed:', dbError);
      return NextResponse.json(
        { 
          error: 'Database connection failed',
          details: dbError instanceof Error ? dbError.message : 'Unknown error',
          step: 'database_connection'
        },
        { status: 500 }
      );
    }

    // Step 2: Test user lookup
    console.log('👤 Looking up user...');
    let user;
    try {
      user = await prisma.user.findUnique({
        where: { email: email.toLowerCase() }
      });
      console.log('✅ User lookup successful:', !!user);
    } catch (userError) {
      console.error('❌ User lookup failed:', userError);
      return NextResponse.json(
        {
          error: 'User lookup failed',
          details: userError instanceof Error ? userError.message : 'Unknown error',
          step: 'user_lookup'
        },
        { status: 500 }
      );
    }

    if (!user) {
      console.log('❌ User not found');
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Step 3: Test password verification
    console.log('🔒 Testing password verification...');
    try {
      const isPasswordValid = await bcrypt.compare(password, user.password || '');
      console.log('✅ Password verification result:', isPasswordValid);
      
      if (!isPasswordValid) {
        return NextResponse.json(
          { error: 'Invalid password' },
          { status: 401 }
        );
      }
    } catch (passwordError) {
      console.error('❌ Password verification failed:', passwordError);
      return NextResponse.json(
        {
          error: 'Password verification failed',
          details: passwordError instanceof Error ? passwordError.message : 'Unknown error',
          step: 'password_verification'
        },
        { status: 500 }
      );
    }

    // Step 4: Test session creation simulation
    console.log('🎫 Simulating session creation...');
    const userSession = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt
    };

    console.log('✅ Test signin process completed successfully');

    return NextResponse.json({
      success: true,
      message: 'Test signin process completed successfully',
      user: userSession,
      steps: {
        database_connection: 'success',
        user_lookup: 'success',
        password_verification: 'success',
        session_simulation: 'success'
      }
    });

  } catch (error) {
    console.error('💥 Test signin error:', error);
    
    return NextResponse.json(
      {
        error: 'Test signin failed',
        details: error instanceof Error ? error.message : 'Unknown error',
        stack: process.env.NODE_ENV === 'development' ? 
          (error instanceof Error ? error.stack : undefined) : 
          undefined
      },
      { status: 500 }
    );
  } finally {
    try {
      await prisma.$disconnect();
      console.log('🔌 Database disconnected from test signin');
    } catch (disconnectError) {
      console.error('⚠️ Error disconnecting from database:', disconnectError);
    }
  }
}