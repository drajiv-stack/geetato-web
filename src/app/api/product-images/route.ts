import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { productImages, products } from '@/db/schema';
import { eq, asc, and } from 'drizzle-orm';
import { auth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');

    // Validate productId parameter
    if (!productId) {
      return NextResponse.json({ 
        error: "Product ID is required",
        code: "MISSING_PRODUCT_ID" 
      }, { status: 400 });
    }

    if (isNaN(parseInt(productId))) {
      return NextResponse.json({ 
        error: "Valid Product ID is required",
        code: "INVALID_PRODUCT_ID" 
      }, { status: 400 });
    }

    // Fetch all images for the product ordered by displayOrder
    const images = await db.select()
      .from(productImages)
      .where(eq(productImages.productId, parseInt(productId)))
      .orderBy(asc(productImages.displayOrder));

    return NextResponse.json(images, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Authentication check
    const session = await auth.api.getSession({
      headers: request.headers
    });

    if (!session?.user) {
      return NextResponse.json({ 
        error: 'Authentication required',
        code: "AUTH_REQUIRED" 
      }, { status: 401 });
    }

    // Admin authorization check
    if (!session.user.email?.includes('admin')) {
      return NextResponse.json({ 
        error: 'Admin access required',
        code: "ADMIN_REQUIRED" 
      }, { status: 403 });
    }

    const body = await request.json();
    const { productId, imageUrl, altText, displayOrder, isPrimary } = body;

    // Validate required fields
    if (!productId) {
      return NextResponse.json({ 
        error: "Product ID is required",
        code: "MISSING_PRODUCT_ID" 
      }, { status: 400 });
    }

    if (typeof productId !== 'number' || isNaN(productId)) {
      return NextResponse.json({ 
        error: "Valid Product ID is required",
        code: "INVALID_PRODUCT_ID" 
      }, { status: 400 });
    }

    if (!imageUrl) {
      return NextResponse.json({ 
        error: "Image URL is required",
        code: "MISSING_IMAGE_URL" 
      }, { status: 400 });
    }

    if (typeof imageUrl !== 'string' || imageUrl.trim().length === 0) {
      return NextResponse.json({ 
        error: "Image URL must be a non-empty string",
        code: "INVALID_IMAGE_URL" 
      }, { status: 400 });
    }

    // Validate product exists
    const product = await db.select()
      .from(products)
      .where(eq(products.id, productId))
      .limit(1);

    if (product.length === 0) {
      return NextResponse.json({ 
        error: 'Product not found',
        code: "PRODUCT_NOT_FOUND" 
      }, { status: 404 });
    }

    // If isPrimary is true, set all other images for this product to isPrimary=false
    if (isPrimary === true) {
      await db.update(productImages)
        .set({ isPrimary: false })
        .where(eq(productImages.productId, productId));
    }

    // Create the new product image
    const newImage = await db.insert(productImages)
      .values({
        productId,
        imageUrl: imageUrl.trim(),
        altText: altText?.trim() || null,
        displayOrder: displayOrder !== undefined ? displayOrder : 0,
        isPrimary: isPrimary === true ? true : false
      })
      .returning();

    return NextResponse.json(newImage[0], { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
  }
}