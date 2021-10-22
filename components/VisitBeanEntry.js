import Link from 'next/link';
import { gql, useQuery } from '@apollo/client';
import BeanRating from './BeanRating';

const VisitBeanEntry = ({ shop }) => {
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
      shop_id: shop.shop_id,
    },
  });

  // if (loading) return 'Loading...';
  if (err) return `Error! ${err.message}!`;

  return (
    <div className="card">
      <Link href={`shop/${shop.shop_id}`}>
        <a className="" href={`shop/${shop.shop_id}`}>
          <h3 className="name">{shop.shop_name}</h3>
          <BeanRating reviews={data ? data.reviewsByShop : null} />
          {/* {shop.opening_hours
          ? shop.opening_hours.open_now ? <div className="opening_hours">Open</div>
            : <div className="opening_hours">Closed</div>
          : null}
        <div className="location">{shop.vicinity}</div> */}
        </a>
      </Link>
    </div>
  );
};

export default VisitBeanEntry;
