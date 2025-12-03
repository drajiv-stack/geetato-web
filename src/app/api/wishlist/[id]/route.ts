import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { wishlist } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { auth } from '@/lib/auth';

export async function DELETE(
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

    const userId = session.user.id;

    // Get id from route parameters
    const params = await context.params;
    const { id } = params;

    // Validate ID parameter
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    const itemId = parseInt(id);

    // Check if wishlist item exists and belongs to authenticated user
    const existingItem = await db
      .select()
      .from(wishlist)
      .where(and(eq(wishlist.id, itemId), eq(wishlist.userId, userId)))
      .limit(1);

    if (existingItem.length === 0) {
      return NextResponse.json(
        { error: 'Wishlist item not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    // Delete the wishlist item
    const deleted = await db
      .delete(wishlist)
      .where(and(eq(wishlist.id, itemId), eq(wishlist.userId, userId)))
      .returning();

    return NextResponse.json(
      {
        message: 'Item removed from wishlist',
        id: itemId
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('DELETE wishlist error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}