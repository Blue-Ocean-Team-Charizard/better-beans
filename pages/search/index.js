import Meta from '../../components/Meta';
import ShopList from '../../components/ShopList';
import Map from '../../components/map/Map';
import { SearchContext } from '../../components/SearchContext';

export default function SearchResults() {
  return (
    <div>
      <SearchContext.Consumer>
        {(context) => (
          <>
            <Meta />
            <h1 className="title">Better Beans Found</h1>
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item" role="presentation">
                <button className="nav-link active" id="map-tab" data-bs-toggle="tab" data-bs-target="#map-container" type="button" role="tab" aria-controls="map" aria-selected="true">Map</button>
              </li>
              <li className="nav-item" role="presentation">
                <button className="nav-link" id="shops-tab" data-bs-toggle="tab" data-bs-target="#shops" type="button" role="tab" aria-controls="shops" aria-selected="false">
                  List
                </button>
              </li>
            </ul>
            <div className="tab-content" id="myTabContent">
              <div className="tab-pane fade show active" id="map-container" role="tabpanel" aria-labelledby="home-tab">
                <Map
                  shopList={context.shopList}
                  coords={context.currentCoords}
                  selectShop={context.selectShop}
                  google={context.google}
                />
              </div>
              <div className="tab-pane fade" id="shops" role="tabpanel" aria-labelledby="profile-tab">
                <ShopList shopList={context.shopList} />
              </div>
            </div>
          </>
        )}
      </SearchContext.Consumer>
    </div>
  );
}
