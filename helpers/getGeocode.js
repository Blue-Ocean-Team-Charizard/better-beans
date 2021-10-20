import APIKey from '../config/config';

export default function getGeocode(address) {
  return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${APIKey.APIKey}`)
    .then((res) => res.json());
}
