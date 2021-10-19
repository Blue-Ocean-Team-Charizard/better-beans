import Meta from '../../components/Meta';
import ShopList from '../../components/ShopList';
import SearchContextProvider from '../../components/SearchContext';

export default function SearchResults() {
  return (
    <div>
      <SearchContextProvider>
        <Meta />
        <h1>Shops near me </h1>
        <ShopList />
      </SearchContextProvider>
    </div>
  );
}
