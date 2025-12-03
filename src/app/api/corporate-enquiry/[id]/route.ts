import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { corporateEnquiries } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { auth } from '@/lib/auth';

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Authentication check
    const session = await auth.api.getSession({ headers: request.headers });
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Authentication required', code: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    // Admin authorization check
    if (!session.user.email || !session.user.email.includes('admin')) {
      return NextResponse.json(
        { error: 'Admin access required', code: 'FORBIDDEN' },
        { status: 403 }
      );
    }

    // Get and validate ID from route parameter
    const { id } = await context.params;
    
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    const enquiryId = parseInt(id);

    // Parse and validate request body
    const body = await request.json();
    const { status } = body;

    // Validate status field is provided
    if (!status) {
      return NextResponse.json(
        { error: 'Status field is required', code: 'MISSING_STATUS' },
        { status: 400 }
      );
    }

    // Check if corporate enquiry exists
    const existingEnquiry = await db
      .select()
      .from(corporateEnquiries)
      .where(eq(corporateEnquiries.id, enquiryId))
      .limit(1);

    if (existingEnquiry.length === 0) {
      return NextResponse.json(
        { error: 'Corporate enquiry not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    // Update the status
    const updated = await db
      .update(corporateEnquiries)
      .set({
        status: status
      })
      .where(eq(corporateEnquiries.id, enquiryId))
      .returning();

    if (updated.length === 0) {
      return NextResponse.json(
        { error: 'Failed to update corporate enquiry', code: 'UPDATE_FAILED' },
        { status: 500 }
      );
    }

    return NextResponse.json(updated[0], { status: 200 });

  } catch (error) {
    console.error('PATCH corporate enquiry error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error'),
        code: 'INTERNAL_ERROR'
      },
      { status: 500 }
    );
  }
}