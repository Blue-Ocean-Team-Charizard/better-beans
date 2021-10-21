// import APIKey from '../config/config';

export default function getGeocode(address) {
  return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`)
    .then((res) => res.json())
    .then((data) => data.results[0].geometry.location);
}
