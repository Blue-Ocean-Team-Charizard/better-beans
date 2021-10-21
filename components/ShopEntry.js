import Link from 'next/link';
import { SearchContext } from './SearchContext';
import BeanRating from './BeanRating';

const ShopEntry = ({ shop }) => (
  // console.log(shop);
  <SearchContext.Consumer>
    {(context) => (
      <div className="card" onClick={() => context.selectShop(shop)}>
        <Link href={`shop/${shop.place_id}`}>
          <a className="">
            <h3 className="name">{shop.name}</h3>
            <BeanRating rating={shop.rating} />
            {shop.opening_hours
              ? shop.opening_hours.open_now ? <div className="opening_hours">Open</div>
                : <div className="opening_hours">Closed</div>
              : null}
            <div className="location">{shop.vicinity}</div>
          </a>
        </Link>
      </div>
    )}
  </SearchContext.Consumer>
);

export default ShopEntry;
