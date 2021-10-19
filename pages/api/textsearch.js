import getQueryResults from '../../helpers/textSearch';
import chains from '../../helpers/chains';

export default function handler(req, res) {
  console.log(req.query.query)
  getQueryResults(req.query.query)
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
