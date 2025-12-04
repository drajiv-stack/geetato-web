import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { productHighlights } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { auth } from '@/lib/auth';

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Authentication check
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session) {
      return NextResponse.json(
        { error: 'Authentication required', code: 'AUTH_REQUIRED' },
        { status: 401 }
      );
    }

    // Admin check
    if (!session.user.email.includes('admin')) {
      return NextResponse.json(
        { error: 'Admin access required', code: 'FORBIDDEN' },
        { status: 403 }
      );
    }

    // Get and validate ID from route parameter
    const { id } = await context.params;
    const highlightId = parseInt(id);

    if (!id || isNaN(highlightId)) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { highlightText, displayOrder } = body;

    // Validate at least one field is provided
    if (highlightText === undefined && displayOrder === undefined) {
      return NextResponse.json(
        { error: 'At least one field (highlightText or displayOrder) must be provided', code: 'NO_FIELDS_TO_UPDATE' },
        { status: 400 }
      );
    }

    // Validate highlightText if provided
    if (highlightText !== undefined) {
      if (typeof highlightText !== 'string' || highlightText.trim() === '') {
        return NextResponse.json(
          { error: 'highlightText must be a non-empty string', code: 'INVALID_HIGHLIGHT_TEXT' },
          { status: 400 }
        );
      }
    }

    // Validate displayOrder if provided
    if (displayOrder !== undefined) {
      if (typeof displayOrder !== 'number' || !Number.isInteger(displayOrder)) {
        return NextResponse.json(
          { error: 'displayOrder must be an integer', code: 'INVALID_DISPLAY_ORDER' },
          { status: 400 }
        );
      }
    }

    // Check if highlight exists
    const existingHighlight = await db
      .select()
      .from(productHighlights)
      .where(eq(productHighlights.id, highlightId))
      .limit(1);

    if (existingHighlight.length === 0) {
      return NextResponse.json(
        { error: 'Product highlight not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    // Prepare update data
    const updateData: { highlightText?: string; displayOrder?: number } = {};

    if (highlightText !== undefined) {
      updateData.highlightText = highlightText.trim();
    }

    if (displayOrder !== undefined) {
      updateData.displayOrder = displayOrder;
    }

    // Update the highlight
    const updated = await db
      .update(productHighlights)
      .set(updateData)
      .where(eq(productHighlights.id, highlightId))
      .returning();

    return NextResponse.json(updated[0], { status: 200 });
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Authentication check
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session) {
      return NextResponse.json(
        { error: 'Authentication required', code: 'AUTH_REQUIRED' },
        { status: 401 }
      );
    }

    // Admin check
    if (!session.user.email.includes('admin')) {
      return NextResponse.json(
        { error: 'Admin access required', code: 'FORBIDDEN' },
        { status: 403 }
      );
    }

    // Get and validate ID from route parameter
    const { id } = await context.params;
    const highlightId = parseInt(id);

    if (!id || isNaN(highlightId)) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    // Check if highlight exists
    const existingHighlight = await db
      .select()
      .from(productHighlights)
      .where(eq(productHighlights.id, highlightId))
      .limit(1);

    if (existingHighlight.length === 0) {
      return NextResponse.json(
        { error: 'Product highlight not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    // Delete the highlight
    const deleted = await db
      .delete(productHighlights)
      .where(eq(productHighlights.id, highlightId))
      .returning();

    return NextResponse.json(
      {
        message: 'Product highlight deleted successfully',
        deletedHighlight: deleted[0],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}