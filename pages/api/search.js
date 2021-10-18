export default function handler(req, res) {
  console.log(req.query.location);
  res.status(200).json({ location: req.query.location });
}
