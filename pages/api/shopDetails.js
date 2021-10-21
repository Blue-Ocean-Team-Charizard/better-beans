import { APIKey } from '../../config/config';

export default function handler(req, res) {
  fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${req.query.id}&key=${APIKey}`)
    .then((result) => result.json())
    .then((result) => res.status(200).json(result))
    .catch((err) => {
      console.log('error getting place detail', err);
      res.status(500).send('Error getting place details');
    });
}
