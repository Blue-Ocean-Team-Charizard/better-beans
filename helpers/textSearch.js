import APIKey from '../config/config';

export default function getQueryResults(query) {
  // console.log(`coffee in ${query}`);
  return fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=coffee in ${query}&key=${APIKey.APIKey}`)
    .then((res) => res.json());
}
