import React from 'react';
import ShopItem from './ShopEntry';

const data = [
  {
    id: '1',
    name: 'Sightglass Coffee',
    review: '3.5',
    opening_hours: 'Close now',
    location: 'Downtown',
  },
  {
    id: '2',
    name: '1Sightglass Coffee',
    review: '3.5',
    opening_hours: 'Close now',
    location: 'Downtown',
  },
  {
    id: '3',
    name: '2Sightglass Coffee',
    review: '3.5',
    opening_hours: 'Close now',
    location: 'Downtown',
  },
  {
    id: '4',
    name: '3Sightglass Coffee',
    review: '3.5',
    opening_hours: 'Close now',
    location: 'Downtown',
  },
];

class ShopList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="container">
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button className="nav-link active" id="map-tab" data-bs-toggle="tab" data-bs-target="#map" type="button" role="tab" aria-controls="map" aria-selected="true">Map</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link" id="shops-tab" data-bs-toggle="tab" data-bs-target="#shops" type="button" role="tab" aria-controls="shops" aria-selected="false">Shop List</button>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div className="tab-pane fade show active" id="map" role="tabpanel" aria-labelledby="home-tab">This is a map</div>
          <div className="tab-pane fade" id="shops" role="tabpanel" aria-labelledby="profile-tab">
            {data.map((shop) => <ShopItem shop={shop} key={shop.id} />)}
          </div>
        </div>
      </div>
    );
  }
}

export default ShopList;
