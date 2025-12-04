import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { productNutrition, products } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { auth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const productId = searchParams.get('productId');

    if (!productId || isNaN(parseInt(productId))) {
      return NextResponse.json(
        { 
          error: 'Valid productId is required',
          code: 'INVALID_PRODUCT_ID'
        },
        { status: 400 }
      );
    }

    const nutrition = await db.select()
      .from(productNutrition)
      .where(eq(productNutrition.productId, parseInt(productId)))
      .limit(1);

    if (nutrition.length === 0) {
      return NextResponse.json({});
    }

    return NextResponse.json(nutrition[0]);
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
    const { 
      productId,
      servingSize,
      calories,
      protein,
      carbs,
      fat,
      fiber,
      sugar
    } = body;

    if (!productId) {
      return NextResponse.json(
        { 
          error: 'productId is required',
          code: 'MISSING_PRODUCT_ID'
        },
        { status: 400 }
      );
    }

    if (isNaN(parseInt(productId))) {
      return NextResponse.json(
        { 
          error: 'productId must be a valid integer',
          code: 'INVALID_PRODUCT_ID'
        },
        { status: 400 }
      );
    }

    const product = await db.select()
      .from(products)
      .where(eq(products.id, parseInt(productId)))
      .limit(1);

    if (product.length === 0) {
      return NextResponse.json(
        { 
          error: 'Product not found',
          code: 'PRODUCT_NOT_FOUND'
        },
        { status: 404 }
      );
    }

    const existingNutrition = await db.select()
      .from(productNutrition)
      .where(eq(productNutrition.productId, parseInt(productId)))
      .limit(1);

    if (existingNutrition.length > 0) {
      return NextResponse.json(
        { 
          error: 'Nutrition information already exists for this product',
          code: 'NUTRITION_ALREADY_EXISTS'
        },
        { status: 409 }
      );
    }

    const nutritionData: Record<string, any> = {
      productId: parseInt(productId)
    };

    if (servingSize !== undefined) nutritionData.servingSize = servingSize;
    if (calories !== undefined) {
      if (isNaN(parseInt(calories))) {
        return NextResponse.json(
          { 
            error: 'calories must be a valid integer',
            code: 'INVALID_CALORIES'
          },
          { status: 400 }
        );
      }
      nutritionData.calories = parseInt(calories);
    }
    if (protein !== undefined) {
      if (isNaN(parseFloat(protein))) {
        return NextResponse.json(
          { 
            error: 'protein must be a valid number',
            code: 'INVALID_PROTEIN'
          },
          { status: 400 }
        );
      }
      nutritionData.protein = parseFloat(protein);
    }
    if (carbs !== undefined) {
      if (isNaN(parseFloat(carbs))) {
        return NextResponse.json(
          { 
            error: 'carbs must be a valid number',
            code: 'INVALID_CARBS'
          },
          { status: 400 }
        );
      }
      nutritionData.carbs = parseFloat(carbs);
    }
    if (fat !== undefined) {
      if (isNaN(parseFloat(fat))) {
        return NextResponse.json(
          { 
            error: 'fat must be a valid number',
            code: 'INVALID_FAT'
          },
          { status: 400 }
        );
      }
      nutritionData.fat = parseFloat(fat);
    }
    if (fiber !== undefined) {
      if (isNaN(parseFloat(fiber))) {
        return NextResponse.json(
          { 
            error: 'fiber must be a valid number',
            code: 'INVALID_FIBER'
          },
          { status: 400 }
        );
      }
      nutritionData.fiber = parseFloat(fiber);
    }
    if (sugar !== undefined) {
      if (isNaN(parseFloat(sugar))) {
        return NextResponse.json(
          { 
            error: 'sugar must be a valid number',
            code: 'INVALID_SUGAR'
          },
          { status: 400 }
        );
      }
      nutritionData.sugar = parseFloat(sugar);
    }

    const newNutrition = await db.insert(productNutrition)
      .values(nutritionData)
      .returning();

    return NextResponse.json(newNutrition[0], { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}