import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { productIngredients, products } from '@/db/schema';
import { eq, asc } from 'drizzle-orm';
import { auth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const productId = searchParams.get('productId');

    // Validate productId is provided
    if (!productId) {
      return NextResponse.json(
        { 
          error: 'Product ID is required',
          code: 'MISSING_PRODUCT_ID' 
        },
        { status: 400 }
      );
    }

    // Validate productId is valid integer
    const parsedProductId = parseInt(productId);
    if (isNaN(parsedProductId)) {
      return NextResponse.json(
        { 
          error: 'Valid product ID is required',
          code: 'INVALID_PRODUCT_ID' 
        },
        { status: 400 }
      );
    }

    // Fetch all ingredients for the product ordered by displayOrder
    const ingredients = await db
      .select()
      .from(productIngredients)
      .where(eq(productIngredients.productId, parsedProductId))
      .orderBy(asc(productIngredients.displayOrder));

    return NextResponse.json(ingredients, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth.api.getSession({ headers: request.headers });
    
    if (!session?.user) {
      return NextResponse.json(
        { 
          error: 'Authentication required',
          code: 'AUTHENTICATION_REQUIRED' 
        },
        { status: 401 }
      );
    }

    // Check admin authorization
    if (!session.user.email?.includes('admin')) {
      return NextResponse.json(
        { 
          error: 'Admin access required',
          code: 'FORBIDDEN' 
        },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { productId, ingredientName, displayOrder } = body;

    // Validate required fields
    if (!productId) {
      return NextResponse.json(
        { 
          error: 'Product ID is required',
          code: 'MISSING_PRODUCT_ID' 
        },
        { status: 400 }
      );
    }

    if (!ingredientName) {
      return NextResponse.json(
        { 
          error: 'Ingredient name is required',
          code: 'MISSING_INGREDIENT_NAME' 
        },
        { status: 400 }
      );
    }

    // Validate productId is valid integer
    const parsedProductId = parseInt(productId);
    if (isNaN(parsedProductId)) {
      return NextResponse.json(
        { 
          error: 'Valid product ID is required',
          code: 'INVALID_PRODUCT_ID' 
        },
        { status: 400 }
      );
    }

    // Validate ingredientName is non-empty string
    const trimmedIngredientName = ingredientName.trim();
    if (trimmedIngredientName.length === 0) {
      return NextResponse.json(
        { 
          error: 'Ingredient name cannot be empty',
          code: 'INVALID_INGREDIENT_NAME' 
        },
        { status: 400 }
      );
    }

    // Validate product exists
    const existingProduct = await db
      .select()
      .from(products)
      .where(eq(products.id, parsedProductId))
      .limit(1);

    if (existingProduct.length === 0) {
      return NextResponse.json(
        { 
          error: 'Product not found',
          code: 'PRODUCT_NOT_FOUND' 
        },
        { status: 404 }
      );
    }

    // Validate displayOrder if provided
    let parsedDisplayOrder = 0;
    if (displayOrder !== undefined && displayOrder !== null) {
      parsedDisplayOrder = parseInt(displayOrder);
      if (isNaN(parsedDisplayOrder)) {
        return NextResponse.json(
          { 
            error: 'Valid display order is required',
            code: 'INVALID_DISPLAY_ORDER' 
          },
          { status: 400 }
        );
      }
    }

    // Create ingredient
    const newIngredient = await db
      .insert(productIngredients)
      .values({
        productId: parsedProductId,
        ingredientName: trimmedIngredientName,
        displayOrder: parsedDisplayOrder,
      })
      .returning();

    return NextResponse.json(newIngredient[0], { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}