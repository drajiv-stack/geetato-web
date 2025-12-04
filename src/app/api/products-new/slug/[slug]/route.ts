import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { products, productImages, productNutrition, productIngredients, productHighlights } from '@/db/schema';
import { eq, asc } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;

    // Validate slug parameter
    if (!slug || typeof slug !== 'string' || slug.trim() === '') {
      return NextResponse.json(
        { 
          error: 'Valid slug is required',
          code: 'INVALID_SLUG'
        },
        { status: 400 }
      );
    }

    // Fetch product by slug
    const productResult = await db
      .select()
      .from(products)
      .where(eq(products.slug, slug.trim()))
      .limit(1);

    if (productResult.length === 0) {
      return NextResponse.json(
        { 
          error: 'Product not found',
          code: 'PRODUCT_NOT_FOUND'
        },
        { status: 404 }
      );
    }

    const product = productResult[0];

    // Fetch all related data in parallel
    const [images, nutritionResult, ingredients, highlights] = await Promise.all([
      // Fetch product images ordered by displayOrder
      db
        .select()
        .from(productImages)
        .where(eq(productImages.productId, product.id))
        .orderBy(asc(productImages.displayOrder)),

      // Fetch nutrition data (single record)
      db
        .select()
        .from(productNutrition)
        .where(eq(productNutrition.productId, product.id))
        .limit(1),

      // Fetch ingredients ordered by displayOrder
      db
        .select()
        .from(productIngredients)
        .where(eq(productIngredients.productId, product.id))
        .orderBy(asc(productIngredients.displayOrder)),

      // Fetch highlights ordered by displayOrder
      db
        .select()
        .from(productHighlights)
        .where(eq(productHighlights.productId, product.id))
        .orderBy(asc(productHighlights.displayOrder))
    ]);

    // Construct comprehensive response object
    const productDetails = {
      id: product.id,
      name: product.name,
      slug: product.slug,
      category: product.category,
      subCategory: product.subCategory,
      description: product.description,
      badge: product.badge,
      featured: product.featured,
      rating: product.rating,
      reviews: product.reviews,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
      images: images.map(img => ({
        id: img.id,
        imageUrl: img.imageUrl,
        altText: img.altText,
        displayOrder: img.displayOrder,
        isPrimary: img.isPrimary
      })),
      nutrition: nutritionResult.length > 0 ? {
        id: nutritionResult[0].id,
        servingSize: nutritionResult[0].servingSize,
        calories: nutritionResult[0].calories,
        protein: nutritionResult[0].protein,
        carbs: nutritionResult[0].carbs,
        fat: nutritionResult[0].fat,
        fiber: nutritionResult[0].fiber,
        sugar: nutritionResult[0].sugar
      } : null,
      ingredients: ingredients.map(ing => ({
        id: ing.id,
        ingredientName: ing.ingredientName,
        displayOrder: ing.displayOrder
      })),
      highlights: highlights.map(hl => ({
        id: hl.id,
        highlightText: hl.highlightText,
        displayOrder: hl.displayOrder
      }))
    };

    return NextResponse.json(productDetails, { status: 200 });

  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error'),
        code: 'INTERNAL_ERROR'
      },
      { status: 500 }
    );
  }
}