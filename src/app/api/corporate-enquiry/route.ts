import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { corporateEnquiries } from '@/db/schema';
import { eq, desc, and } from 'drizzle-orm';
import { auth } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      companyName, 
      contactPerson, 
      email, 
      phone, 
      enquiryType, 
      quantityEstimate, 
      message,
      userId 
    } = body;

    // Validate required fields
    if (!companyName) {
      return NextResponse.json({ 
        error: "Company name is required",
        code: "MISSING_COMPANY_NAME" 
      }, { status: 400 });
    }

    if (!contactPerson) {
      return NextResponse.json({ 
        error: "Contact person is required",
        code: "MISSING_CONTACT_PERSON" 
      }, { status: 400 });
    }

    if (!email) {
      return NextResponse.json({ 
        error: "Email is required",
        code: "MISSING_EMAIL" 
      }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ 
        error: "Invalid email format",
        code: "INVALID_EMAIL" 
      }, { status: 400 });
    }

    if (!phone) {
      return NextResponse.json({ 
        error: "Phone number is required",
        code: "MISSING_PHONE" 
      }, { status: 400 });
    }

    if (!enquiryType) {
      return NextResponse.json({ 
        error: "Enquiry type is required",
        code: "MISSING_ENQUIRY_TYPE" 
      }, { status: 400 });
    }

    if (!message) {
      return NextResponse.json({ 
        error: "Message is required",
        code: "MISSING_MESSAGE" 
      }, { status: 400 });
    }

    // Prepare insert data
    const insertData: any = {
      companyName: companyName.trim(),
      contactPerson: contactPerson.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      enquiryType: enquiryType.trim(),
      message: message.trim(),
      status: 'new',
      createdAt: new Date()
    };

    // Add optional fields
    if (quantityEstimate) {
      insertData.quantityEstimate = quantityEstimate.trim();
    }

    if (userId) {
      insertData.userId = userId;
    }

    // Create new enquiry
    const newEnquiry = await db.insert(corporateEnquiries)
      .values(insertData)
      .returning();

    return NextResponse.json(newEnquiry[0], { status: 201 });

  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth.api.getSession({ headers: request.headers });
    
    if (!session) {
      return NextResponse.json({ 
        error: 'Authentication required',
        code: 'AUTHENTICATION_REQUIRED' 
      }, { status: 401 });
    }

    // Check if user is admin
    const userEmail = session.user?.email;
    if (!userEmail || !userEmail.includes('admin')) {
      return NextResponse.json({ 
        error: 'Admin access required',
        code: 'ADMIN_ACCESS_REQUIRED' 
      }, { status: 403 });
    }

    const searchParams = request.nextUrl.searchParams;
    
    // Pagination parameters
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '10'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    
    // Filter parameters
    const statusFilter = searchParams.get('status');
    const enquiryTypeFilter = searchParams.get('enquiryType');

    // Build query
    let query = db.select().from(corporateEnquiries);

    // Apply filters
    const conditions = [];
    if (statusFilter) {
      conditions.push(eq(corporateEnquiries.status, statusFilter));
    }
    if (enquiryTypeFilter) {
      conditions.push(eq(corporateEnquiries.enquiryType, enquiryTypeFilter));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    // Apply ordering and pagination
    const results = await query
      .orderBy(desc(corporateEnquiries.createdAt))
      .limit(limit)
      .offset(offset);

    return NextResponse.json(results, { status: 200 });

  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
  }
}