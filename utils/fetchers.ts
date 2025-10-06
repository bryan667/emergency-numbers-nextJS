export async function getAddress({ lat, lng }: { lat: number; lng: number }) {
  const res = await fetch(`/api/geolocation?lat=${lat}&lng=${lng}`);
  const data = await res.json();
  const address = data?.features[0]?.properties?.address;
  return address;
}

export async function getContacts({
  city,
  state,
  region,
}: {
  city: string;
  state: string;
  region: string;
}) {
  const res = await fetch(
    `/api/contact?city=${city}&state=${state}&region=${region}`,
  );
  const data = await res.json();
  return data;
}
