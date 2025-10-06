import axios from 'axios';
import cache from '@/lib/cache';

export default class GeolocationService {
  constructor() {}

  async getPlaceDetails(lat: number, lng: number) {
    try {
      const roundedLat = lat.toFixed(4);
      const roundedLng = lng.toFixed(4);
      const cacheKey = `geolocation:${roundedLat}:${roundedLng}`;
      const cachedData = cache.get(cacheKey);
      if (cachedData) {
        console.log('Cache works on Vercel');
        return cachedData;
      }
      console.log('Cache was not used');
      const nominatimUrl = `https://nominatim.openstreetmap.org/reverse?format=geojson&lat=${roundedLat}&lon=${roundedLng}`;
      const response = await axios.get(nominatimUrl, {
        headers: {
          'User-Agent': 'emergency-numbers-next-js(janbryanmartirez@gmail.com)',
        },
      });
      await cache.set(cacheKey, response.data);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch location');
    }
  }
}
