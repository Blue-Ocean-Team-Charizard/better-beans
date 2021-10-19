import APIKey from '../config/config';

export default function getQueryResults(query) {
  // console.log('inside getPlaces');
  // console.log(typeof coords);
  return fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${APIKey}`)
    .then((res) => res.json());
}
