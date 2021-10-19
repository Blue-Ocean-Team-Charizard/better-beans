import getPlaces from '../../helpers/nearbySearch';
import chains from '../../helpers/chains';

export default function handler(req, res) {
  getPlaces(req.query.location)
    .then((places) => {
      const filtered = places.results.filter((place) => (chains.chains.indexOf(place.name) === -1));
      // console.log(filtered);
      res.status(200).json(filtered);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Error getting places');
    });
}
