import React from 'react';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shops: [],
    };

    this.searchCurrentLocation = this.searchCurrentLocation.bind(this);
    this.geoSuccess = this.geoSuccess.bind(this);
  }

  // componentDidMount() {
  //   this.searchCurrentLocation();
  // }

  geoSuccess(pos) {
    const crd = pos.coords;

    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    // this.setState({ currentLocation: crd });
    // 34.05223,-118.24368
    fetch(`/api/search?location=${crd.latitude},${crd.longitude}`)
      .then((res) => res.json())
      .then((data) => this.setState({ shops: data }))
      .catch((err) => console.log(err));
  }

  searchCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.geoSuccess, (err) => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      });
    } else {
      console.log('location is not enabled');
    }
  }

  render() {
    return (
      <div className="search">
        <input type="text" id="search" placeholder="Search location" />
        <button type="submit">GO</button>
        <button type="button" onClick={this.searchCurrentLocation}>Search Near Me</button>
      </div>
    );
  }
}
