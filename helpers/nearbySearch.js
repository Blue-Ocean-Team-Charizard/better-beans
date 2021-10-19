import APIKey from '../config/config';

export default function getPlaces(coords) {
  // console.log('inside getPlaces');
  // console.log(typeof coords);
  return fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=coffee&location=${coords}&rankby=distance&key=${APIKey}`)
    .then((res) => res.json());
}
