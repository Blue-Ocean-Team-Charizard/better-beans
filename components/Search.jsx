import React from 'react';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocation: '',
    };

    this.getLocation = this.getLocation.bind(this);
  }

  componentDidMount() {
    this.getLocation();
  }

  getLocation() {
    function success(pos) {
      const crd = pos.coords;

      console.log('Your current position is:');
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      // this.setState({ currentLocation: crd });
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error);
  }

  render() {
    return (
      <div className="search">
        <input type="text" id="search" placeholder="Search location" />
        <button type="submit">GO</button>
        <button onClick={this.getLocation}>search my location</button>
      </div>
    );
  }
}
