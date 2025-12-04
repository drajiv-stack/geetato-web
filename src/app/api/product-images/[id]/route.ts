import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { productImages } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
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
        { error: 'Authentication required', code: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    // Admin check
    if (!session.user?.email?.includes('admin')) {
      return NextResponse.json(
        { error: 'Admin access required', code: 'FORBIDDEN' },
        { status: 403 }
      );
    }

    // Get and validate ID from route parameter
    const params = await context.params;
    const id = params.id;

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    const imageId = parseInt(id);

    // Check if image exists
    const existingImage = await db
      .select()
      .from(productImages)
      .where(eq(productImages.id, imageId))
      .limit(1);

    if (existingImage.length === 0) {
      return NextResponse.json(
        { error: 'Product image not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { imageUrl, altText, displayOrder, isPrimary } = body;

    // Build update object with only provided fields
    const updates: Record<string, any> = {};

    if (imageUrl !== undefined) {
      if (typeof imageUrl !== 'string' || imageUrl.trim() === '') {
        return NextResponse.json(
          { error: 'imageUrl must be a non-empty string', code: 'INVALID_IMAGE_URL' },
          { status: 400 }
        );
      }
      updates.imageUrl = imageUrl.trim();
    }

    if (altText !== undefined) {
      updates.altText = typeof altText === 'string' ? altText.trim() : null;
    }

    if (displayOrder !== undefined) {
      if (typeof displayOrder !== 'number' || displayOrder < 0) {
        return NextResponse.json(
          { error: 'displayOrder must be a non-negative number', code: 'INVALID_DISPLAY_ORDER' },
          { status: 400 }
        );
      }
      updates.displayOrder = displayOrder;
    }

    if (isPrimary !== undefined) {
      if (typeof isPrimary !== 'boolean') {
        return NextResponse.json(
          { error: 'isPrimary must be a boolean', code: 'INVALID_IS_PRIMARY' },
          { status: 400 }
        );
      }
      updates.isPrimary = isPrimary;

      // If setting this image as primary, unset all other images for the same product
      if (isPrimary) {
        const productId = existingImage[0].productId;
        await db
          .update(productImages)
          .set({ isPrimary: false })
          .where(
            and(
              eq(productImages.productId, productId),
              eq(productImages.isPrimary, true)
            )
          );
      }
    }

    // Validate that at least one field is being updated
    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: 'No valid fields provided for update', code: 'NO_UPDATE_FIELDS' },
        { status: 400 }
      );
    }

    // Perform update
    const updated = await db
      .update(productImages)
      .set(updates)
      .where(eq(productImages.id, imageId))
      .returning();

    return NextResponse.json(updated[0], { status: 200 });
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error') },
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
        { error: 'Authentication required', code: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    // Admin check
    if (!session.user?.email?.includes('admin')) {
      return NextResponse.json(
        { error: 'Admin access required', code: 'FORBIDDEN' },
        { status: 403 }
      );
    }

    // Get and validate ID from route parameter
    const params = await context.params;
    const id = params.id;

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    const imageId = parseInt(id);

    // Check if image exists
    const existingImage = await db
      .select()
      .from(productImages)
      .where(eq(productImages.id, imageId))
      .limit(1);

    if (existingImage.length === 0) {
      return NextResponse.json(
        { error: 'Product image not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    // Delete the image
    const deleted = await db
      .delete(productImages)
      .where(eq(productImages.id, imageId))
      .returning();

    return NextResponse.json(
      {
        message: 'Product image deleted successfully',
        deletedImage: deleted[0]
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    );
  }
}