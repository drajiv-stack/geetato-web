import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { quizAnswers } from '@/db/schema';
import { eq, desc, and } from 'drizzle-orm';
import { getCurrentUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json({ 
        error: 'Authentication required',
        code: 'AUTH_REQUIRED'
      }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const quizType = searchParams.get('quizType');

    let query = db.select()
      .from(quizAnswers)
      .where(eq(quizAnswers.userId, user.id))
      .orderBy(desc(quizAnswers.createdAt));

    if (quizType) {
      query = db.select()
        .from(quizAnswers)
        .where(
          and(
            eq(quizAnswers.userId, user.id),
            eq(quizAnswers.quizType, quizType)
          )
        )
        .orderBy(desc(quizAnswers.createdAt));
    }

    const results = await query;

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json({ 
        error: 'Authentication required',
        code: 'AUTH_REQUIRED'
      }, { status: 401 });
    }

    const body = await request.json();

    if ('userId' in body || 'user_id' in body) {
      return NextResponse.json({ 
        error: "User ID cannot be provided in request body",
        code: "USER_ID_NOT_ALLOWED" 
      }, { status: 400 });
    }

    const { quizType, answers, results } = body;

    if (!quizType) {
      return NextResponse.json({ 
        error: "Quiz type is required",
        code: "MISSING_QUIZ_TYPE" 
      }, { status: 400 });
    }

    if (!answers) {
      return NextResponse.json({ 
        error: "Answers are required",
        code: "MISSING_ANSWERS" 
      }, { status: 400 });
    }

    if (!results) {
      return NextResponse.json({ 
        error: "Results are required",
        code: "MISSING_RESULTS" 
      }, { status: 400 });
    }

    if (typeof answers !== 'object' || answers === null || Array.isArray(answers)) {
      return NextResponse.json({ 
        error: "Answers must be a valid JSON object",
        code: "INVALID_ANSWERS_FORMAT" 
      }, { status: 400 });
    }

    if (typeof results !== 'object' || results === null || Array.isArray(results)) {
      return NextResponse.json({ 
        error: "Results must be a valid JSON object",
        code: "INVALID_RESULTS_FORMAT" 
      }, { status: 400 });
    }

    const newQuizAnswer = await db.insert(quizAnswers)
      .values({
        userId: user.id,
        quizType: quizType.trim(),
        answers: JSON.stringify(answers),
        results: JSON.stringify(results),
        createdAt: new Date()
      })
      .returning();

    const createdQuizAnswer = {
      ...newQuizAnswer[0],
      answers: JSON.parse(newQuizAnswer[0].answers as string),
      results: JSON.parse(newQuizAnswer[0].results as string)
    };

    return NextResponse.json(createdQuizAnswer, { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
    }, { status: 500 });
  }
}