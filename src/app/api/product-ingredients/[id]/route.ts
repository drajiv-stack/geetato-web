import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { productIngredients } from '@/db/schema';
import { eq } from 'drizzle-orm';
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

    // Admin authorization check
    if (!session.user.email?.includes('admin')) {
      return NextResponse.json(
        { error: 'Admin access required', code: 'FORBIDDEN' },
        { status: 403 }
      );
    }

    // Get and validate ID from route params
    const { id } = await context.params;
    
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    const ingredientId = parseInt(id);

    // Parse request body
    const body = await request.json();
    const { ingredientName, displayOrder } = body;

    // Validate at least one field is provided
    if (ingredientName === undefined && displayOrder === undefined) {
      return NextResponse.json(
        { error: 'At least one field to update is required', code: 'NO_UPDATE_FIELDS' },
        { status: 400 }
      );
    }

    // Build update object
    const updates: Record<string, string | number> = {};

    // Validate and add ingredientName if provided
    if (ingredientName !== undefined) {
      if (typeof ingredientName !== 'string' || ingredientName.trim() === '') {
        return NextResponse.json(
          { error: 'Ingredient name must be a non-empty string', code: 'INVALID_INGREDIENT_NAME' },
          { status: 400 }
        );
      }
      updates.ingredientName = ingredientName.trim();
    }

    // Validate and add displayOrder if provided
    if (displayOrder !== undefined) {
      if (typeof displayOrder !== 'number' || isNaN(displayOrder)) {
        return NextResponse.json(
          { error: 'Display order must be a valid number', code: 'INVALID_DISPLAY_ORDER' },
          { status: 400 }
        );
      }
      updates.displayOrder = displayOrder;
    }

    // Check if ingredient exists
    const existingIngredient = await db
      .select()
      .from(productIngredients)
      .where(eq(productIngredients.id, ingredientId))
      .limit(1);

    if (existingIngredient.length === 0) {
      return NextResponse.json(
        { error: 'Product ingredient not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    // Update the ingredient
    const updatedIngredient = await db
      .update(productIngredients)
      .set(updates)
      .where(eq(productIngredients.id, ingredientId))
      .returning();

    return NextResponse.json(updatedIngredient[0], { status: 200 });
  } catch (error) {
    console.error('PUT error:', error);
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
    // Authentication check
    const session = await auth.api.getSession({ headers: request.headers });
    
    if (!session) {
      return NextResponse.json(
        { error: 'Authentication required', code: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    // Admin authorization check
    if (!session.user.email?.includes('admin')) {
      return NextResponse.json(
        { error: 'Admin access required', code: 'FORBIDDEN' },
        { status: 403 }
      );
    }

    // Get and validate ID from route params
    const { id } = await context.params;
    
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    const ingredientId = parseInt(id);

    // Check if ingredient exists
    const existingIngredient = await db
      .select()
      .from(productIngredients)
      .where(eq(productIngredients.id, ingredientId))
      .limit(1);

    if (existingIngredient.length === 0) {
      return NextResponse.json(
        { error: 'Product ingredient not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    // Delete the ingredient
    const deletedIngredient = await db
      .delete(productIngredients)
      .where(eq(productIngredients.id, ingredientId))
      .returning();

    return NextResponse.json(
      {
        message: 'Product ingredient deleted successfully',
        deletedIngredient: deletedIngredient[0]
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}