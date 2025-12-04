import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { products, productImages, productNutrition, productIngredients, productHighlights } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { auth } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    // Validate ID
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid product ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    const productId = parseInt(id);

    // Fetch product
    const product = await db
      .select()
      .from(products)
      .where(eq(products.id, productId))
      .limit(1);

    if (product.length === 0) {
      return NextResponse.json(
        { error: 'Product not found', code: 'PRODUCT_NOT_FOUND' },
        { status: 404 }
      );
    }

    // Fetch all related data
    const [images, nutrition, ingredients, highlights] = await Promise.all([
      db
        .select()
        .from(productImages)
        .where(eq(productImages.productId, productId))
        .orderBy(productImages.displayOrder),
      db
        .select()
        .from(productNutrition)
        .where(eq(productNutrition.productId, productId))
        .limit(1),
      db
        .select()
        .from(productIngredients)
        .where(eq(productIngredients.productId, productId))
        .orderBy(productIngredients.displayOrder),
      db
        .select()
        .from(productHighlights)
        .where(eq(productHighlights.productId, productId))
        .orderBy(productHighlights.displayOrder),
    ]);

    // Combine all data into single response
    const fullProduct = {
      ...product[0],
      images: images,
      nutrition: nutrition.length > 0 ? nutrition[0] : null,
      ingredients: ingredients,
      highlights: highlights,
    };

    return NextResponse.json(fullProduct, { status: 200 });
  } catch (error) {
    console.error('GET product error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session) {
      return NextResponse.json(
        { error: 'Authentication required', code: 'AUTH_REQUIRED' },
        { status: 401 }
      );
    }

    // Check admin authorization
    if (!session.user?.email?.includes('admin')) {
      return NextResponse.json(
        { error: 'Admin access required', code: 'ADMIN_REQUIRED' },
        { status: 403 }
      );
    }

    const { id } = await context.params;

    // Validate ID
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid product ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    const productId = parseInt(id);

    // Parse request body
    const body = await request.json();
    const { name, slug, category, subCategory, description, badge, featured, rating, reviews } = body;

    // Check if product exists
    const existingProduct = await db
      .select()
      .from(products)
      .where(eq(products.id, productId))
      .limit(1);

    if (existingProduct.length === 0) {
      return NextResponse.json(
        { error: 'Product not found', code: 'PRODUCT_NOT_FOUND' },
        { status: 404 }
      );
    }

    // If slug is being updated, check for uniqueness
    if (slug && slug !== existingProduct[0].slug) {
      const duplicateSlug = await db
        .select()
        .from(products)
        .where(and(eq(products.slug, slug)))
        .limit(1);

      if (duplicateSlug.length > 0 && duplicateSlug[0].id !== productId) {
        return NextResponse.json(
          { error: 'Product slug already exists', code: 'DUPLICATE_SLUG' },
          { status: 409 }
        );
      }
    }

    // Build update object with only provided fields
    const updates: Record<string, any> = {
      updatedAt: new Date(),
    };

    if (name !== undefined) updates.name = name;
    if (slug !== undefined) updates.slug = slug;
    if (category !== undefined) updates.category = category;
    if (subCategory !== undefined) updates.subCategory = subCategory;
    if (description !== undefined) updates.description = description;
    if (badge !== undefined) updates.badge = badge;
    if (featured !== undefined) updates.featured = featured;
    if (rating !== undefined) updates.rating = rating;
    if (reviews !== undefined) updates.reviews = reviews;

    // Update product
    const updatedProduct = await db
      .update(products)
      .set(updates)
      .where(eq(products.id, productId))
      .returning();

    if (updatedProduct.length === 0) {
      return NextResponse.json(
        { error: 'Failed to update product', code: 'UPDATE_FAILED' },
        { status: 500 }
      );
    }

    return NextResponse.json(updatedProduct[0], { status: 200 });
  } catch (error) {
    console.error('PUT product error:', error);
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
    // Check authentication
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session) {
      return NextResponse.json(
        { error: 'Authentication required', code: 'AUTH_REQUIRED' },
        { status: 401 }
      );
    }

    // Check admin authorization
    if (!session.user?.email?.includes('admin')) {
      return NextResponse.json(
        { error: 'Admin access required', code: 'ADMIN_REQUIRED' },
        { status: 403 }
      );
    }

    const { id } = await context.params;

    // Validate ID
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid product ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    const productId = parseInt(id);

    // Check if product exists
    const existingProduct = await db
      .select()
      .from(products)
      .where(eq(products.id, productId))
      .limit(1);

    if (existingProduct.length === 0) {
      return NextResponse.json(
        { error: 'Product not found', code: 'PRODUCT_NOT_FOUND' },
        { status: 404 }
      );
    }

    // Delete product (cascade will handle related records)
    const deletedProduct = await db
      .delete(products)
      .where(eq(products.id, productId))
      .returning();

    if (deletedProduct.length === 0) {
      return NextResponse.json(
        { error: 'Failed to delete product', code: 'DELETE_FAILED' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: 'Product deleted successfully',
        product: deletedProduct[0],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('DELETE product error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}