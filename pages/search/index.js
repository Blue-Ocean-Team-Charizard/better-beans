import Meta from '../../components/Meta';
import SearchContextProvider from '../../components/SearchContext';

export default function Home() {
  return (
    <div>
      <SearchContextProvider>
        <Meta />
        <h1>this is the search results</h1>
      </SearchContextProvider>
    </div>
  );
}
