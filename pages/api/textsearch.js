import getPlaces from '../../helpers/nearbySearch';
import getGeocode from '../../helpers/getGeocode';
import chains from '../../helpers/chains';

export default function handler(req, res) {
  const response = {};
  getGeocode(req.query.query)
    .then((coords) => {
      response.coords = coords;
      return getPlaces(`${coords.lat},${coords.lng}`);
    })
    .then((places) => {
      const filtered = places.results.filter((place) => (chains.chains.indexOf(place.name) === -1));
      // console.log(filtered);
      response.places = filtered;
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Error getting places');
    });
}
