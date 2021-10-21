// import APIKey from '../config/config';

export default function getQueryResults(query) {
  // console.log(`coffee in ${query}`);
  return fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=coffee in ${query}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`)
    .then((res) => res.json());
}
