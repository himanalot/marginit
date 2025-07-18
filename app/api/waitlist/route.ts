import { NextRequest, NextResponse } from 'next/server';
import { clerkClient } from '@clerk/nextjs/server';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Create a user in Clerk's waitlist
    const client = await clerkClient();
    const user = await client.users.createUser({
      emailAddress: [email],
      // Mark this user as being in waitlist mode
      publicMetadata: {
        waitlistStatus: 'pending',
        joinedAt: new Date().toISOString(),
      },
      skipPasswordRequirement: true,
      skipPasswordChecks: true,
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Successfully added to waitlist',
      userId: user.id 
    });

  } catch (error) {
    console.error('Error adding to waitlist:', error);
    
    // Check if user already exists
    if (error instanceof Error && error.message.includes('already exists')) {
      return NextResponse.json({ 
        error: 'Email already registered' 
      }, { status: 409 });
    }

    return NextResponse.json({ 
      error: 'Failed to add to waitlist' 
    }, { status: 500 });
  }
}