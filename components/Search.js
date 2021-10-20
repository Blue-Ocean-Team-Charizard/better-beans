import React from 'react';
import Link from 'next/link';

export default class Search extends React.Component {
  constructor(props) {
    super(props);

    this.searchCurrentLocation = this.searchCurrentLocation.bind(this);
    this.geoSuccess = this.geoSuccess.bind(this);
  }

  // componentDidMount() {
  //   this.searchCurrentLocation();
  // }

  geoSuccess(pos) {
    const { updateCoords, updateList } = this.props;
    const crd = pos.coords;

    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    // this.setState({ currentLocation: crd });
    // 34.05223,-118.24368
    updateCoords({
      lat: crd.latitude,
      lng: crd.longitude,
    });

    fetch(`/api/search?location=${crd.latitude},${crd.longitude}`)
      .then((res) => res.json())
      .then((data) => updateList(data))
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
      <div className="input-group search">
        <input type="text" id="search" className="form-control" placeholder="Search location" aria-label="Search location" />
        <button className="btn btn-outline-secondary" type ="button">GO</button>
        <button className="btn btn-outline-secondary" type ="button" onClick={this.searchCurrentLocation}>Search Near Me</button>
      </div>
    );
  }
}
