import getPlaces from '../../helpers/nearbySearch';

export default function handler(req, res) {
  const chainNames = ['Starbucks', 'Peet\'s Coffee', 'Dunkin\'', 'McDonald\'s', 'Subway', 'Denny\'s', 'Yum Yum Donuts', 'Blue Bottle Coffee', 'The Coffee Bean & Tea Leaf', 'LavAzza'];
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
