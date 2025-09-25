import { NextResponse } from 'next/server';
import { prisma } from '../../../src/lib/prisma';

export async function GET(request: Request) {
  try {
    if (process.env.NODE_ENV === 'development') {
      console.log('📋 Projects API called at:', new Date().toISOString());
    }
    
    const { searchParams } = new URL(request.url);
    const rsc = searchParams.get('_rsc');
    
    if (process.env.NODE_ENV === 'development') {
      console.log('🔍 Request params:', { rsc });
    }

    // Test database connection
    await prisma.$connect();
    if (process.env.NODE_ENV === 'development') {
      console.log('✅ Database connected for projects');
    }

    // For now, return mock projects data
    // In a real app, you would fetch from the database
    const mockProjects = [
      {
        id: '1',
        name: 'AI Chat Bot',
        description: 'An intelligent chatbot using OpenAI API',
        status: 'active',
        createdAt: new Date().toISOString(),
        technologies: ['React', 'Node.js', 'OpenAI']
      },
      {
        id: '2', 
        name: 'Blockchain Voting System',
        description: 'Decentralized voting platform',
        status: 'completed',
        createdAt: new Date().toISOString(),
        technologies: ['Solidity', 'React', 'Web3.js']
      }
    ];

    if (process.env.NODE_ENV === 'development') {
      console.log('✅ Returning projects data');
    }
    
    return NextResponse.json({
      success: true,
      projects: mockProjects,
      count: mockProjects.length
    });

  } catch (error) {
    console.error('❌ Projects API error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch projects',
        details: process.env.NODE_ENV === 'development' ? 
          (error instanceof Error ? error.message : String(error)) : 
          undefined
      },
      { status: 500 }
    );
  } finally {
    try {
      await prisma.$disconnect();
      console.log('🔌 Database disconnected from projects API');
    } catch (disconnectError) {
      console.error('⚠️ Error disconnecting from database:', disconnectError);
    }
  }
}

export async function POST(request: Request) {
  try {
    console.log('📝 Creating new project');
    
    const body = await request.json();
    console.log('📋 Project data:', body);

    // Test database connection
    await prisma.$connect();

    // Here you would create the project in the database
    // For now, return success response
    const newProject = {
      id: Date.now().toString(),
      ...body,
      createdAt: new Date().toISOString(),
      status: 'active'
    };

    return NextResponse.json({
      success: true,
      project: newProject,
      message: 'Project created successfully'
    }, { status: 201 });

  } catch (error) {
    console.error('❌ Project creation error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to create project',
        details: process.env.NODE_ENV === 'development' ? 
          (error instanceof Error ? error.message : String(error)) : 
          undefined
      },
      { status: 500 }
    );
  } finally {
    try {
      await prisma.$disconnect();
    } catch (disconnectError) {
      console.error('⚠️ Error disconnecting from database:', disconnectError);
    }
  }
}