import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { productHighlights, products } from '@/db/schema';
import { eq, asc } from 'drizzle-orm';
import { auth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const productId = searchParams.get('productId');

    // Validate productId parameter
    if (!productId) {
      return NextResponse.json({ 
        error: 'Product ID is required',
        code: 'MISSING_PRODUCT_ID' 
      }, { status: 400 });
    }

    const parsedProductId = parseInt(productId);
    if (isNaN(parsedProductId)) {
      return NextResponse.json({ 
        error: 'Product ID must be a valid integer',
        code: 'INVALID_PRODUCT_ID' 
      }, { status: 400 });
    }

    // Fetch all highlights for the product ordered by displayOrder
    const highlights = await db.select()
      .from(productHighlights)
      .where(eq(productHighlights.productId, parsedProductId))
      .orderBy(asc(productHighlights.displayOrder));

    return NextResponse.json(highlights, { status: 200 });

  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json({ 
        error: 'Authentication required',
        code: 'AUTHENTICATION_REQUIRED' 
      }, { status: 401 });
    }

    // Check admin authorization
    if (!session.user.email || !session.user.email.includes('admin')) {
      return NextResponse.json({ 
        error: 'Admin access required',
        code: 'FORBIDDEN' 
      }, { status: 403 });
    }

    const body = await request.json();
    const { productId, highlightText, displayOrder } = body;

    // Validate required fields
    if (!productId) {
      return NextResponse.json({ 
        error: 'Product ID is required',
        code: 'MISSING_PRODUCT_ID' 
      }, { status: 400 });
    }

    if (typeof productId !== 'number' || isNaN(productId)) {
      return NextResponse.json({ 
        error: 'Product ID must be a valid integer',
        code: 'INVALID_PRODUCT_ID' 
      }, { status: 400 });
    }

    if (!highlightText) {
      return NextResponse.json({ 
        error: 'Highlight text is required',
        code: 'MISSING_HIGHLIGHT_TEXT' 
      }, { status: 400 });
    }

    if (typeof highlightText !== 'string' || highlightText.trim().length === 0) {
      return NextResponse.json({ 
        error: 'Highlight text must be a non-empty string',
        code: 'INVALID_HIGHLIGHT_TEXT' 
      }, { status: 400 });
    }

    // Validate that product exists
    const product = await db.select()
      .from(products)
      .where(eq(products.id, productId))
      .limit(1);

    if (product.length === 0) {
      return NextResponse.json({ 
        error: 'Product not found',
        code: 'PRODUCT_NOT_FOUND' 
      }, { status: 404 });
    }

    // Create the product highlight
    const newHighlight = await db.insert(productHighlights)
      .values({
        productId,
        highlightText: highlightText.trim(),
        displayOrder: displayOrder !== undefined ? displayOrder : 0,
      })
      .returning();

    return NextResponse.json(newHighlight[0], { status: 201 });

  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
  }
}