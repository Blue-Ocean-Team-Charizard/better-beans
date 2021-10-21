// import APIKey from '../config/config';

export default function getPlaces(coords) {
  // console.log('inside getPlaces');
  // console.log(typeof coords);
  return fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=coffeeshop&location=${coords}&rankby=distance&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`)
    .then((res) => res.json());
}
