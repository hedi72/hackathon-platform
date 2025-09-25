import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../src/lib/auth';
import { prisma } from '../../../src/lib/prisma';

export async function GET(request: Request) {
  try {
    console.log('📋 Organize API called at:', new Date().toISOString());
    
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const rsc = searchParams.get('_rsc');
    
    console.log('🔍 Request params:', { rsc });
    console.log('👤 Session user:', session.user);

    // Test database connection
    await prisma.$connect();
    console.log('✅ Database connected for organize');

    // Fetch events organized by the current user
    const organizedEvents = await prisma.event.findMany({
      where: {
        organizerId: session.user.id || ''
      },
      include: {
        participants: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true
              }
            }
          }
        },
        projects: {
          include: {
            teamLead: {
              select: {
                id: true,
                name: true,
                email: true
              }
            },
            members: true,
            votes: true
          }
        },
        categories: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    console.log('✅ Returning organized events:', organizedEvents.length);
    
    return NextResponse.json({
      success: true,
      events: organizedEvents,
      count: organizedEvents.length
    });

  } catch (error) {
    console.error('❌ Organize API error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch organized events',
        details: process.env.NODE_ENV === 'development' ? 
          (error instanceof Error ? error.message : String(error)) : 
          undefined
      },
      { status: 500 }
    );
  } finally {
    try {
      await prisma.$disconnect();
      console.log('🔌 Database disconnected from organize API');
    } catch (disconnectError) {
      console.error('⚠️ Error disconnecting from database:', disconnectError);
    }
  }
}

export async function POST(request: Request) {
  try {
    console.log('📝 Creating new event');
    
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check if user has organizer role
    if (session.user.role !== 'ORGANIZER' && session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Insufficient permissions to create events' },
        { status: 403 }
      );
    }
    
    const body = await request.json();
    console.log('📋 Event data:', body);

    // Test database connection
    await prisma.$connect();

    // Create new event in database
    const newEvent = await prisma.event.create({
      data: {
        title: body.title,
        description: body.description,
        imageUrl: body.imageUrl,
        startDate: new Date(body.startDate),
        endDate: new Date(body.endDate),
        location: body.location,
        isVirtual: body.isVirtual || false,
        maxTeamSize: body.maxTeamSize || 5,
        prizePool: body.prizePool,
        rules: body.rules,
        requirements: body.requirements,
        organizerId: session.user.id || '',
        categories: {
          create: body.categories?.map((name: string) => ({ name })) || []
        }
      },
      include: {
        categories: true,
        organizer: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    return NextResponse.json({
      success: true,
      event: newEvent,
      message: 'Event created successfully'
    }, { status: 201 });

  } catch (error) {
    console.error('❌ Event creation error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to create event',
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