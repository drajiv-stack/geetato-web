import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { quizAnswers } from '@/db/schema';
import { eq, and, desc } from 'drizzle-orm';
import { auth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    // Authenticate user using better-auth
    const session = await auth.api.getSession({ headers: request.headers });
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Authentication required', code: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const { searchParams } = new URL(request.url);
    const quizType = searchParams.get('quizType');

    // Build query with user scope
    let query = db
      .select()
      .from(quizAnswers)
      .where(eq(quizAnswers.userId, userId))
      .orderBy(desc(quizAnswers.createdAt))
      .limit(1);

    // Add quiz type filter if provided
    if (quizType) {
      query = db
        .select()
        .from(quizAnswers)
        .where(
          and(
            eq(quizAnswers.userId, userId),
            eq(quizAnswers.quizType, quizType)
          )
        )
        .orderBy(desc(quizAnswers.createdAt))
        .limit(1);
    }

    const results = await query;

    if (results.length === 0) {
      return NextResponse.json(
        { error: 'No quiz results found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    return NextResponse.json(results[0], { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    );
  }
}