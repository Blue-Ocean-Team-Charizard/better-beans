import getPlaces from '../../helpers/nearbySearch';

export default function handler(req, res) {
  getPlaces(req.query.location)
    .then((places) => {
      console.log(places);
      res.status(200).json(places);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
}
