import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { userPreferences } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { auth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    // Authentication check
    const session = await auth.api.getSession({ headers: request.headers });
    
    if (!session || !session.user) {
      return NextResponse.json({ 
        error: 'Authentication required',
        code: 'UNAUTHORIZED' 
      }, { status: 401 });
    }

    const userId = session.user.id;

    // Fetch user preferences
    const preferences = await db.select()
      .from(userPreferences)
      .where(eq(userPreferences.userId, userId))
      .limit(1);

    if (preferences.length === 0) {
      return NextResponse.json({ 
        error: 'Preferences not found',
        code: 'PREFERENCES_NOT_FOUND' 
      }, { status: 404 });
    }

    return NextResponse.json(preferences[0], { status: 200 });
  } catch (error) {
    console.error('GET preferences error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Authentication check
    const session = await auth.api.getSession({ headers: request.headers });
    
    if (!session || !session.user) {
      return NextResponse.json({ 
        error: 'Authentication required',
        code: 'UNAUTHORIZED' 
      }, { status: 401 });
    }

    const userId = session.user.id;

    // Parse request body
    const body = await request.json();
    const { dietaryPreferences, healthGoals, allergies, favoriteCategories } = body;

    // Validate that at least one field is provided
    if (
      dietaryPreferences === undefined && 
      healthGoals === undefined && 
      allergies === undefined && 
      favoriteCategories === undefined
    ) {
      return NextResponse.json({ 
        error: 'At least one preference field must be provided',
        code: 'NO_FIELDS_PROVIDED' 
      }, { status: 400 });
    }

    // Validate that arrays are actually arrays if provided
    if (dietaryPreferences !== undefined && !Array.isArray(dietaryPreferences)) {
      return NextResponse.json({ 
        error: 'dietaryPreferences must be an array',
        code: 'INVALID_DIETARY_PREFERENCES' 
      }, { status: 400 });
    }

    if (healthGoals !== undefined && !Array.isArray(healthGoals)) {
      return NextResponse.json({ 
        error: 'healthGoals must be an array',
        code: 'INVALID_HEALTH_GOALS' 
      }, { status: 400 });
    }

    if (allergies !== undefined && !Array.isArray(allergies)) {
      return NextResponse.json({ 
        error: 'allergies must be an array',
        code: 'INVALID_ALLERGIES' 
      }, { status: 400 });
    }

    if (favoriteCategories !== undefined && !Array.isArray(favoriteCategories)) {
      return NextResponse.json({ 
        error: 'favoriteCategories must be an array',
        code: 'INVALID_FAVORITE_CATEGORIES' 
      }, { status: 400 });
    }

    // Check if preferences already exist for this user
    const existingPreferences = await db.select()
      .from(userPreferences)
      .where(eq(userPreferences.userId, userId))
      .limit(1);

    const currentTimestamp = new Date();

    if (existingPreferences.length > 0) {
      // Update existing preferences
      const updateData: {
        dietaryPreferences?: unknown;
        healthGoals?: unknown;
        allergies?: unknown;
        favoriteCategories?: unknown;
        updatedAt: Date;
      } = {
        updatedAt: currentTimestamp
      };

      // Only update fields that are provided
      if (dietaryPreferences !== undefined) {
        updateData.dietaryPreferences = dietaryPreferences;
      }
      if (healthGoals !== undefined) {
        updateData.healthGoals = healthGoals;
      }
      if (allergies !== undefined) {
        updateData.allergies = allergies;
      }
      if (favoriteCategories !== undefined) {
        updateData.favoriteCategories = favoriteCategories;
      }

      const updated = await db.update(userPreferences)
        .set(updateData)
        .where(eq(userPreferences.userId, userId))
        .returning();

      return NextResponse.json(updated[0], { status: 200 });
    } else {
      // Create new preferences
      const newPreferences = await db.insert(userPreferences)
        .values({
          userId: userId,
          dietaryPreferences: dietaryPreferences ?? [],
          healthGoals: healthGoals ?? [],
          allergies: allergies ?? [],
          favoriteCategories: favoriteCategories ?? [],
          createdAt: currentTimestamp,
          updatedAt: currentTimestamp
        })
        .returning();

      return NextResponse.json(newPreferences[0], { status: 200 });
    }
  } catch (error) {
    console.error('POST preferences error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
  }
}