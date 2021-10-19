import { useState } from 'react';
import Meta from '../../components/Meta';
import ShopList from '../../components/ShopList';
import Map from '../../components/map/map';
import { SearchContext } from '../../components/SearchContext';

export default function SearchResults() {
  const [showMap, setShowMap] = useState(false);

  return (
    <div>
      <SearchContext.Consumer>
        {(context) => (
          <>
            <Meta />
            <h1>Shops near me </h1>
            {showMap
              ? <Map shopList={context.shopList} /> : <ShopList shopList={context.shopList} />}
          </>
        )}
      </SearchContext.Consumer>
    </div>
  );
}
