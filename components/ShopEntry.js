import Link from 'next/link';
import { SearchContext } from './SearchContext';
import { gql, useQuery } from '@apollo/client';
import BeanRating from './BeanRating';
import { panToMarker } from './map/Map';

export default function ShopEntry({ shop }) {
  const GET_REVIEWS = gql`
  query ReviewsByShop($shop_id: String!) {
    reviewsByShop(shop_id: $shop_id) {
      name
      body
      rating
      helpful
      reported
      shop_id
      user_id
    }
  }
`;

  const { data, loading, err } = useQuery(GET_REVIEWS, {
    variables: {
      shop_id: shop.place_id,
    },
  });

  // if (loading) return 'Loading...';
  if (err) return `Error! ${err.message}!`;

  return (
    <SearchContext.Consumer>
      {(context) => (
        <div className="card" onClick={() => context.selectShop(shop)} onMouseOver={() => panToMarker(shop)} >
          <Link href={`shop/${shop.place_id}`}>
            <a className="">
              <h3 className="name">{shop.name}</h3>
              <BeanRating reviews={data ? data.reviewsByShop : null} />
              {
                shop.opening_hours
                  ? shop.opening_hours.open_now ? <div className="opening_hours">Open</div>
                    : <div className="opening_hours">Closed</div>
                  : null
              }
              < div className="location">{shop.vicinity}</div>
            </a>
          </Link>
        </div>
      )
      }
    </SearchContext.Consumer >
  );
};

