import Meta from '../../../components/Meta';
import Shop from '../../../components/Shop';
import { SearchContext } from '../../../components/SearchContext';

export default function Shops(props) {
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
          <Shop googleData={context.selectedShop} id={props.id} />
        )}
      </SearchContext.Consumer>
    </div>
  );
}

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
    id,
  };

  return ({
    props: shop,
  }
  );
};

// would call db query to get all reviews
// const dummyReviews = [
//   {
//     id: '1',
//     first_name: 'Hello',
//     title: 'dummy',
//     body: 'great cofeee',
//     rating: 1,
//   },
//   {
//     id: '2',
//     first_name: 'World',
//     title: 'dummy',
//     body: 'great cofeee',
//     rating: 2,
//   },
// ];
