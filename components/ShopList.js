import React from 'react';
import ShopEntry from './ShopEntry';

const dataShop = [
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
        { dataShop.map((shop) => <ShopEntry shop={shop} key={shop.id} />)}
      </div>
    );
  }
}

export default ShopList;
