import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { productNutrition } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { auth } from '@/lib/auth';

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    
    if (!session) {
      return NextResponse.json(
        { error: 'Authentication required', code: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    if (!session.user.email?.includes('admin')) {
      return NextResponse.json(
        { error: 'Admin access required', code: 'FORBIDDEN' },
        { status: 403 }
      );
    }

    const { id } = await context.params;

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    const nutritionId = parseInt(id);

    const existingNutrition = await db
      .select()
      .from(productNutrition)
      .where(eq(productNutrition.id, nutritionId))
      .limit(1);

    if (existingNutrition.length === 0) {
      return NextResponse.json(
        { error: 'Nutrition record not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const allowedFields = ['servingSize', 'calories', 'protein', 'carbs', 'fat', 'fiber', 'sugar'];
    const updates: Record<string, unknown> = {};

    for (const field of allowedFields) {
      if (field in body) {
        if (field === 'servingSize') {
          if (typeof body[field] === 'string') {
            updates[field] = body[field].trim();
          } else if (body[field] !== null && body[field] !== undefined) {
            return NextResponse.json(
              { error: 'servingSize must be a string', code: 'INVALID_FIELD_TYPE' },
              { status: 400 }
            );
          }
        } else if (field === 'calories') {
          if (typeof body[field] === 'number' && Number.isInteger(body[field])) {
            updates[field] = body[field];
          } else if (body[field] !== null && body[field] !== undefined) {
            return NextResponse.json(
              { error: 'calories must be an integer', code: 'INVALID_FIELD_TYPE' },
              { status: 400 }
            );
          }
        } else {
          if (typeof body[field] === 'number') {
            updates[field] = body[field];
          } else if (body[field] !== null && body[field] !== undefined) {
            return NextResponse.json(
              { error: `${field} must be a number`, code: 'INVALID_FIELD_TYPE' },
              { status: 400 }
            );
          }
        }
      }
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: 'No valid fields to update', code: 'NO_UPDATES' },
        { status: 400 }
      );
    }

    const updated = await db
      .update(productNutrition)
      .set(updates)
      .where(eq(productNutrition.id, nutritionId))
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
    const session = await auth.api.getSession({ headers: request.headers });
    
    if (!session) {
      return NextResponse.json(
        { error: 'Authentication required', code: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    if (!session.user.email?.includes('admin')) {
      return NextResponse.json(
        { error: 'Admin access required', code: 'FORBIDDEN' },
        { status: 403 }
      );
    }

    const { id } = await context.params;

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    const nutritionId = parseInt(id);

    const existingNutrition = await db
      .select()
      .from(productNutrition)
      .where(eq(productNutrition.id, nutritionId))
      .limit(1);

    if (existingNutrition.length === 0) {
      return NextResponse.json(
        { error: 'Nutrition record not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    const deleted = await db
      .delete(productNutrition)
      .where(eq(productNutrition.id, nutritionId))
      .returning();

    return NextResponse.json(
      {
        message: 'Nutrition record deleted successfully',
        deleted: deleted[0]
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