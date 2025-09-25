import { NextResponse } from 'next/server';
import { prisma } from '../../../../src/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json();
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required.' }, 
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' }, 
        { status: 400 }
      );
    }

    // Password validation
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long.' }, 
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ 
      where: { email: email.toLowerCase() } 
    });
    
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists.' }, 
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

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
      }
    });

    return NextResponse.json({ 
      message: 'User created successfully',
      user 
    }, { status: 201 });

  } catch (error) {
    console.error('Signup error:', error);
    
    // Handle specific errors
    if (error instanceof Error) {
      // Database connection issues
      if (error.message.includes('DATABASE_URL') || 
          error.message.includes('database connection') ||
          error.message.includes('connection failed')) {
        return NextResponse.json(
          { 
            error: 'Database configuration error. Please try again later.',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
          },
          { status: 500 }
        );
      }
      
      // Prisma specific errors
      if (error.message.includes('Prisma')) {
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
    return NextResponse.json(
      { 
        error: 'Internal server error. Please try again later.',
        details: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.message : String(error)) : undefined
      },
      { status: 500 }
    );
  }
}
