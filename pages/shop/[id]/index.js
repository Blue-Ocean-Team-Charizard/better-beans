import Meta from '../../../components/Meta';
import Shop from '../../../components/Shop';
import { SearchContext } from '../../../components/SearchContext';
// import { APIKey } from '../../../config/config';

export default function Shops({ id, shopData }) {
  return (
    <div>
      <Meta />
      {/* <SearchContext.Consumer>
        {(context) => ( */}
      <Shop googleData={{}} id={id} shopData={shopData} />
      {/* )}
      </SearchContext.Consumer> */}
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  const res = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${id}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`);
  const shopInfo = await res.json();

  return ({
    props: {
      id,
      shopData: shopInfo.result,
    },
  }
  );
}
