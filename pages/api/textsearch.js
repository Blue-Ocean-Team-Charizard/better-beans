import getQueryResults from '../../helpers/textSearch';
import getGeocode from '../../helpers/getGeocode';
import chains from '../../helpers/chains';

export default function handler(req, res) {
  getQueryResults(req.query.query)
    .then((places) => {
      const filtered = places.results.filter((place) => (chains.chains.indexOf(place.name) === -1));
      // console.log(filtered);
      res.status(200).json(filtered);
    })
    // .then((filtered) => {
    //   getGeocode(req.query.query)
    // })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Error getting places');
    });
}
