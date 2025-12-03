import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { siteSettings } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { auth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const settings = await db.select().from(siteSettings);
    return NextResponse.json(settings, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error'),
      code: 'DATABASE_ERROR'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    
    if (!session || !session.user) {
      return NextResponse.json({ 
        error: 'Authentication required',
        code: 'AUTHENTICATION_REQUIRED'
      }, { status: 401 });
    }

    if (!session.user.email || !session.user.email.includes('admin')) {
      return NextResponse.json({ 
        error: 'Admin access required',
        code: 'FORBIDDEN'
      }, { status: 403 });
    }

    const body = await request.json();
    const { settingKey, settingValue, settingType } = body;

    if (!settingKey || typeof settingKey !== 'string' || settingKey.trim() === '') {
      return NextResponse.json({ 
        error: 'settingKey is required and must be a non-empty string',
        code: 'MISSING_SETTING_KEY'
      }, { status: 400 });
    }

    if (!settingValue || typeof settingValue !== 'string' || settingValue.trim() === '') {
      return NextResponse.json({ 
        error: 'settingValue is required and must be a non-empty string',
        code: 'MISSING_SETTING_VALUE'
      }, { status: 400 });
    }

    const validTypes = ['text', 'url', 'image', 'json'];
    if (!settingType || !validTypes.includes(settingType)) {
      return NextResponse.json({ 
        error: 'settingType is required and must be one of: text, url, image, json',
        code: 'INVALID_SETTING_TYPE'
      }, { status: 400 });
    }

    const trimmedKey = settingKey.trim();
    const trimmedValue = settingValue.trim();

    const existingSetting = await db.select()
      .from(siteSettings)
      .where(eq(siteSettings.settingKey, trimmedKey))
      .limit(1);

    if (existingSetting.length > 0) {
      const updated = await db.update(siteSettings)
        .set({
          settingValue: trimmedValue,
          settingType: settingType,
          updatedAt: new Date()
        })
        .where(eq(siteSettings.settingKey, trimmedKey))
        .returning();

      return NextResponse.json(updated[0], { status: 200 });
    } else {
      const newSetting = await db.insert(siteSettings)
        .values({
          settingKey: trimmedKey,
          settingValue: trimmedValue,
          settingType: settingType,
          createdAt: new Date(),
          updatedAt: new Date()
        })
        .returning();

      return NextResponse.json(newSetting[0], { status: 201 });
    }
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error'),
      code: 'DATABASE_ERROR'
    }, { status: 500 });
  }
}