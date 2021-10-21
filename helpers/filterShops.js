import chains from './chains.js';
export default function(shopList) {
  return shopList.filter((place) => {
    const regex = new RegExp(chains.chains.join('|'), 'i')
    return !regex.test(place.name)
    });
}