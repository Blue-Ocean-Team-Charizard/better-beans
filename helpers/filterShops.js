import chains from './chains';

export default function (shopList) {
  return shopList.filter((place) => {
    const regex = new RegExp(chains.chains.join('|'), 'i');
    return !regex.test(place.name);
  });
}
