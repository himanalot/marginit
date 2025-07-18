import { NextResponse } from 'next/server';
import { clerkClient } from '@clerk/nextjs/server';

export async function GET() {
  try {
    // Get all users with waitlist status
    const client = await clerkClient();
    const users = await client.users.getUserList({
      limit: 500, // Adjust as needed
    });

    console.log('Total users found:', users.data?.length || 0);

    // Count users with waitlistStatus in their publicMetadata
    const waitlistCount = users.data.filter(user => {
      const hasWaitlistStatus = user.publicMetadata?.waitlistStatus === 'pending';
      console.log('User:', user.emailAddresses?.[0]?.emailAddress, 'has waitlist status:', hasWaitlistStatus);
      return hasWaitlistStatus;
    }).length;

    console.log('Waitlist count:', waitlistCount);

    return NextResponse.json({ 
      count: waitlistCount 
    });

  } catch (error) {
    console.error('Error getting waitlist count:', error);
    return NextResponse.json({ 
      count: 0,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 200 }); // Return 200 so the frontend can still display something
  }
}