import getPlaces from '../../helpers/nearbySearch';

export default function handler(req, res) {
  const chainNames = ['Starbucks', 'Peet\'s Coffee', 'Dunkin\'', 'McDonald\'s', 'Subway', 'Denny\'s'];
  getPlaces(req.query.location)
    .then((places) => {
      const filtered = places.results.filter((place) => (chainNames.indexOf(place.name) === -1));
      console.log(filtered);
      res.status(200).json(filtered);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
}
