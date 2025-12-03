import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { wishlist } from '@/db/schema';
import { eq, and, desc } from 'drizzle-orm';
import { getCurrentUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json({ 
        error: 'Authentication required',
        code: 'UNAUTHORIZED' 
      }, { status: 401 });
    }

    const items = await db.select()
      .from(wishlist)
      .where(eq(wishlist.userId, user.id))
      .orderBy(desc(wishlist.createdAt));

    return NextResponse.json(items, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error instanceof Error ? error.message : String(error))
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json({ 
        error: 'Authentication required',
        code: 'UNAUTHORIZED' 
      }, { status: 401 });
    }

    const body = await request.json();

    if ('userId' in body || 'user_id' in body) {
      return NextResponse.json({ 
        error: "User ID cannot be provided in request body",
        code: "USER_ID_NOT_ALLOWED" 
      }, { status: 400 });
    }

    const { productId, productName, productImage } = body;

    if (!productId) {
      return NextResponse.json({ 
        error: "Product ID is required",
        code: "MISSING_PRODUCT_ID" 
      }, { status: 400 });
    }

    if (typeof productId !== 'number' || !Number.isInteger(productId)) {
      return NextResponse.json({ 
        error: "Product ID must be an integer",
        code: "INVALID_PRODUCT_ID" 
      }, { status: 400 });
    }

    if (!productName || typeof productName !== 'string' || productName.trim() === '') {
      return NextResponse.json({ 
        error: "Product name is required",
        code: "MISSING_PRODUCT_NAME" 
      }, { status: 400 });
    }

    if (!productImage || typeof productImage !== 'string' || productImage.trim() === '') {
      return NextResponse.json({ 
        error: "Product image is required",
        code: "MISSING_PRODUCT_IMAGE" 
      }, { status: 400 });
    }

    const existingItem = await db.select()
      .from(wishlist)
      .where(
        and(
          eq(wishlist.userId, user.id),
          eq(wishlist.productId, productId)
        )
      )
      .limit(1);

    if (existingItem.length > 0) {
      return NextResponse.json({ 
        error: "Product already in wishlist",
        code: "DUPLICATE_WISHLIST_ITEM" 
      }, { status: 409 });
    }

    const newItem = await db.insert(wishlist)
      .values({
        userId: user.id,
        productId,
        productName: productName.trim(),
        productImage: productImage.trim(),
        createdAt: new Date()
      })
      .returning();

    return NextResponse.json(newItem[0], { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error instanceof Error ? error.message : String(error))
    }, { status: 500 });
  }
}