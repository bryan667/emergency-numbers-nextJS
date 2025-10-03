import { NextRequest, NextResponse } from 'next/server';
import ContactService from '@/contact/ContactService';
import { connectDB } from '@/db/mongo/connectDB';

export const GET = async (req: NextRequest) => {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const city = searchParams.get('city');
    const state = searchParams.get('state');
    const region = searchParams.get('region');

    const contactService = new ContactService();
    const contacts = await contactService.getAllPossibleContacts({
      city,
      state,
      region,
    });

    return NextResponse.json(contacts);
  } catch (e) {
    return NextResponse.json(
      { error: 'failed to get all possible contacts' },
      { status: 400 },
    );
  }
};
