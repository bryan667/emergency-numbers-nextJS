import { NextRequest, NextResponse } from 'next/server';
import GeolocationService from '@/geolocation/GeolocationService';
import { connectDB } from '@/db/mongo/connectDB';

export const GET = async (req: NextRequest) => {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);

    if (!searchParams.get('lat') || !searchParams.get('lng')) {
      return NextResponse.json(
        { error: 'both lat and lng is required' },
        { status: 400 },
      );
    }

    const lat = Number(searchParams.get('lat'));
    const lng = Number(searchParams.get('lng'));

    const geolocationService = new GeolocationService();
    const results = await geolocationService.getPlaceDetails(lat, lng);
    return NextResponse.json(results);
  } catch (e) {
    return NextResponse.json(
      { error: `failed geolocation - ${e}` },
      { status: 400 },
    );
  }
};
