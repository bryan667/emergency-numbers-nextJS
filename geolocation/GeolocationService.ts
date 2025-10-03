import axios from 'axios';
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 100 });

export default class GeolocationService {
  constructor() {}

  async getPlaceDetails(lat: number, lng: number) {
    try {
      const roundedLat = lat.toFixed(4);
      const roundedLng = lng.toFixed(4);
      const cacheKey = `geolocation:${roundedLat}:${roundedLng}`;

      const cachedData = cache.get(cacheKey);
      if (cachedData) return cachedData;

      const nominatimUrl = `https://nominatim.openstreetmap.org/reverse?format=geojson&lat=${lat}&lon=${lng}`;
      const response = await axios.get(nominatimUrl, {
        headers: {
          'User-Agent': 'emergency-numbers-next-js(janbryanmartirez@gmail.com)',
        },
      });
      await cache.set(cacheKey, response.data, 60);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch location');
    }
  }
}
