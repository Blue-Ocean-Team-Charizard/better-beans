import React from 'react';
import ShopItem from './ShopEntry';

const data = [
  {
    id: '1',
    name: 'Sightglass Coffee',
    review: '3.5',
    status: 'Close now',
    location: 'Downtown',
  },
  {
    id: '2',
    name: '1Sightglass Coffee',
    review: '3.5',
    status: 'Close now',
    location: 'Downtown',
  },
  {
    id: '3',
    name: '2Sightglass Coffee',
    review: '3.5',
    status: 'Close now',
    location: 'Downtown',
  },
  {
    id: '4',
    name: '3Sightglass Coffee',
    review: '3.5',
    status: 'Close now',
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
        { data.map((shop) => <ShopItem shop={shop} key={shop.id} />) }
      </div>
    );
  }
}

export default ShopList;
