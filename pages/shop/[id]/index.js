// import { useRouter } from 'next/router';
import Meta from '../../../components/Meta';
import Shop from '../../../components/Shop';
import { SearchContext } from '../../../components/SearchContext';

export default function Shops(props) {
  // const router = useRouter();
  // const { id } = router.query;

  return (
    <div>
      <Meta />
      {/* This is
      {' '}
      {id} */}
      {/* {console.log(shop)}; */}
      {/* {console.log('props', props)}; */}
      <SearchContext.Consumer>
        {(context) => (
          <Shop googleData={context.selectedShop} reviews={props.reviews} />
        )}
      </SearchContext.Consumer>
    </div>
  );
}

const dummyAPIdata = {
  business_status: 'OPERATIONAL',
  geometry: {
    location: {
      lat: 34.1813145,
      lng: -117.3215307,
    },
    viewport: {
      northeast: {
        lat: 34.18278707989272,
        lng: -117.3203977201073,
      },
      southwest: {
        lat: 34.18008742010728,
        lng: -117.3230973798927,
      },
    },
  },
  icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/cafe-71.png',
  icon_background_color: '#FF9E67',
  icon_mask_base_uri: 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/cafe_pinlet',
  name: 'Starbucks',
  opening_hours: {
    open_now: true,
  },
  photos: [
    {
      height: 3610,
      html_attributions: [
        '<a href="https://maps.google.com/maps/contrib/114573718035036981475">Abdulrahman Bin Masad</a>',
      ],
      photo_reference: 'Aap_uEChX1fdsCa9yNCLYRJWnJTKBn5EXAw59ZqkxfputBRrZ6nUC5LnC9wX-2wYrqorLddkjRTW99VCIluXVnUDn9xzVr3tu_mC-8c-ExWSqqcSSo68fuTDcWCZWv5TsfNHOuhauXFIzrkAEYrr5pd6Oi4xhnYYW9XuuE5XTLa8Hrd7lY4c',
      width: 2708,
    },
  ],
  place_id: 'ChIJyaz8w49Rw4ARG8x4Anz9TIM',
  plus_code: {
    compound_code: '5MJH+G9 San Bernardino, California',
    global_code: '85645MJH+G9',
  },
  price_level: 2,
  rating: 3.5,
  reference: 'ChIJyaz8w49Rw4ARG8x4Anz9TIM',
  scope: 'GOOGLE',
  types: [
    'cafe',
    'food',
    'point_of_interest',
    'store',
    'establishment',
  ],
  user_ratings_total: 56,
  vicinity: '5500 University Pkwy CSU/San Bernadino - Commons Bldg, San Bernardino',
};

// would call db query to get all reviews
const dummyReviews = [
  {
    id: '1',
    first_name: 'Hello',
    title: 'dummy',
    body: 'great cofeee',
    rating: 1,
  },
  {
    id: '2',
    first_name: 'World',
    title: 'dummy',
    body: 'great cofeee',
    rating: 2,
  },
];

export async function getServerSideProps(context) {
  const { id } = context.params;
  console.log(id);
  //cannot fetch from API route
  // const res = await fetch(`http://localhost:3000/api/shop/${id}`);

  // instead fetch from db.
  // const res = await fetch(`DB QUERY URL???`);
  // const shop = await res.json();
  // console.log(shop);
  // // if there is no info from data, create empty object for reviews

  //ACCESS GOOGLE INFO FROM SOMEWHERE???

  const shop = {
    googleData: dummyAPIdata,
    reviews: dummyReviews,
  };

  return ({
    props: shop,
  }
  );
};
