const dummyShop = {
  id: 1,
  name: 'Dummy Shop',
  vicinity: '111 Main St',
};

export default function handler(req, res) {
  res.status(200).json(dummyShop);
}