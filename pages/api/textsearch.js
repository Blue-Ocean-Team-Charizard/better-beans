import getPlaces from '../../helpers/nearbySearch';
import getGeocode from '../../helpers/getGeocode';
import filterShops from '../../helpers/filterShops';

export default function handler(req, res) {
  const response = {};
  getGeocode(req.query.query)
    .then((coords) => {
      response.coords = coords;
      return getPlaces(`${coords.lat},${coords.lng}`);
    })
    .then((places) => {
      const filtered = filterShops(places.results);
      response.places = filtered;
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Error getting places');
    });
}
