import { NextResponse } from 'next/server';
import { prisma } from '../../../../src/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    console.log('🔍 Signup API called at:', new Date().toISOString());
    console.log('🌍 Environment:', process.env.NODE_ENV);
    console.log('🔗 DATABASE_URL exists:', !!process.env.DATABASE_URL);
    console.log('🔒 NEXTAUTH_URL:', process.env.NEXTAUTH_URL);
    
    // Parse request body
    const body = await request.json();
    console.log('📝 Request body received:', { email: body.email, hasPassword: !!body.password });
    
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      console.log('❌ Missing email or password');
      return NextResponse.json(
        { error: 'Email and password are required.' }, 
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('❌ Invalid email format:', email);
      return NextResponse.json(
        { error: 'Please provide a valid email address.' }, 
        { status: 400 }
      );
    }

    // Password validation
    if (password.length < 6) {
      console.log('❌ Password too short');
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long.' }, 
        { status: 400 }
      );
    }

    console.log('🔍 Attempting database connection...');
    
    // Test database connection
    try {
      await prisma.$connect();
      console.log('✅ Database connected successfully');
    } catch (dbError) {
      console.error('❌ Database connection failed:', dbError);
      throw new Error(`Database connection failed: ${dbError instanceof Error ? dbError.message : 'Unknown error'}`);
    }

    // Check if user already exists
    console.log('🔍 Checking if user exists...');
    const existingUser = await prisma.user.findUnique({ 
      where: { email: email.toLowerCase() } 
    });
    
    if (existingUser) {
      console.log('❌ User already exists:', email);
      return NextResponse.json(
        { error: 'User with this email already exists.' }, 
        { status: 409 }
      );
    }

    console.log('🔒 Hashing password...');
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    console.log('📝 Creating user...');
    // Create user
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        createdAt: true,
        // Don't return password
      }
    });

    console.log('✅ User created successfully:', user.email);
    return NextResponse.json({ 
      message: 'User created successfully',
      user 
    }, { status: 201 });

  } catch (error) {
    console.error('💥 Signup error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : undefined,
      cause: error instanceof Error ? error.cause : undefined
    });
    
    // Handle specific errors
    if (error instanceof Error) {
      // Database URL issues
      if (error.message.includes('DATABASE_URL') || 
          error.message.includes('database connection') ||
          error.message.includes('connection failed')) {
        console.error('❌ Database configuration issue');
        return NextResponse.json(
          { 
            error: 'Database configuration error. Please check DATABASE_URL environment variable.',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
          },
          { status: 500 }
        );
      }
      
      // Network/connection issues
      if (error.message.includes('connect') || 
          error.message.includes('timeout') ||
          error.message.includes('ENOTFOUND')) {
        console.error('❌ Network/connection issue');
        return NextResponse.json(
          { 
            error: 'Unable to connect to database. Please check network configuration.',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
          },
          { status: 500 }
        );
      }

      // Prisma specific errors
      if (error.message.includes('Prisma')) {
        console.error('❌ Prisma error');
        return NextResponse.json(
          { 
            error: 'Database operation failed. Please try again.',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
          },
          { status: 500 }
        );
      }
    }

    // Generic error response
    console.error('❌ Generic error fallback');
    return NextResponse.json(
      { 
        error: 'Internal server error. Please try again later.',
        details: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.message : String(error)) : undefined
      },
      { status: 500 }
    );
  } finally {
    try {
      await prisma.$disconnect();
      console.log('🔌 Database disconnected');
    } catch (disconnectError) {
      console.error('⚠️ Error disconnecting from database:', disconnectError);
    }
  }
}
