import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { wishlist } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { auth } from '@/lib/auth';

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ product_id: string }> }
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

    // Get product_id from route parameter
    const params = await context.params;
    const productIdParam = params.product_id;

    // Validate product_id
    if (!productIdParam || isNaN(parseInt(productIdParam))) {
      return NextResponse.json(
        { error: 'Valid product ID is required', code: 'INVALID_PRODUCT_ID' },
        { status: 400 }
      );
    }

    const productId = parseInt(productIdParam);

    // Check if product exists in user's wishlist
    const existingItem = await db
      .select()
      .from(wishlist)
      .where(and(eq(wishlist.userId, userId), eq(wishlist.productId, productId)))
      .limit(1);

    if (existingItem.length === 0) {
      return NextResponse.json(
        { error: 'Product not found in wishlist', code: 'PRODUCT_NOT_FOUND' },
        { status: 404 }
      );
    }

    // Delete the wishlist item
    const deleted = await db
      .delete(wishlist)
      .where(and(eq(wishlist.userId, userId), eq(wishlist.productId, productId)))
      .returning();

    return NextResponse.json(
      {
        message: 'Product removed from wishlist',
        productId: productId,
        deletedItem: deleted[0]
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('DELETE wishlist error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    );
  }
}