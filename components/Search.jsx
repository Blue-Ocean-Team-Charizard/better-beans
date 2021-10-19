import React from 'react';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocation: '',
    };

    this.searchCurrentLocation = this.searchCurrentLocation.bind(this);
  }

  componentDidMount() {
    this.searchCurrentLocation();
  }

  searchCurrentLocation() {
    if(navigator.geolocation) {
      function success(pos) {
        const crd = pos.coords;

        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        // this.setState({ currentLocation: crd });
        // 34.05223, -118.24368
        fetch(`api/search?location=${crd.latitude},${crd.longitude}`)
          .then((data) => console.log(data))
          .catch((err) => console.log(err))
      }

      function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }

      navigator.geolocation.getCurrentPosition(success, error);

    } else {
      console.log('location is not enabled')
    }
  }

  render() {
    return (
      <div className="search">
        <input type="text" id="search" placeholder="Search location" />
        <button type="submit">GO</button>
        <button onClick={this.searchCurrentLocation}>search my location</button>
      </div>
    );
  }
}
