'use client';
import { useState, useEffect } from 'react';
import { getAddress, getContacts } from '@/utils/fetchers';

export default function Navigator() {
  const [currentLocation, setLocation] = useState<{ [key: string]: any }>({});
  const [contacts, setContacts] = useState<{ [key: string]: any }>({});
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }

    navigator.geolocation?.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const address = await getAddress({ lat: latitude, lng: longitude });
        setLocation(address);
        const { city, state, region } = address;

        const contacts = await getContacts({ city, state, region });
        setContacts(contacts);
      },
      (err) => setError(err.message),
      { enableHighAccuracy: true },
    );
  }, []);

  return (
    <div className="flex">
      {error && <div>{error}</div>}
      <div>
        <label>Contacts:</label>
        {contacts && <pre>{JSON.stringify(contacts, null, 2)}</pre>}
      </div>
      <div>
        <label>Current location:</label>
        {currentLocation && (
          <pre>{JSON.stringify(currentLocation, null, 2)}</pre>
        )}
      </div>
    </div>
  );
}
