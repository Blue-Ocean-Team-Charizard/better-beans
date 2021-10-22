import getPlaces from '../../helpers/nearbySearch';
import filterShops from '../../helpers/filterShops';

export default function handler(req, res) {
  getPlaces(req.query.location)
    .then((places) => {
      const filtered = filterShops(places.results);
      res.status(200).json(filtered);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Error getting places');
    });
}
