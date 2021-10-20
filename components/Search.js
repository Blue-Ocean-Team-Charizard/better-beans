import React from 'react';
import Link from 'next/link';

export default class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
    };

    this.searchCurrentLocation = this.searchCurrentLocation.bind(this);
    this.geoSuccess = this.geoSuccess.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ query: e.target.value });
  }

  handleSubmit(e) {
    const { updateList } = this.props;
    const { query } = this.state;
    e.preventDefault();

    fetch(`/api/textsearch?query=${query}`)
      .then((res) => res.json())
      .then((data) => updateList(data))
      .catch((err) => console.log(err));
  }

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
      <div className="search">
        <input
          type="text"
          id="search"
          placeholder="Los Angeles"
          onChange={this.handleChange}
        />
        <Link href="/search">
          <button type="submit">GO</button>
        </Link>
        <Link href="/search">
          <button type="button" onClick={this.searchCurrentLocation}>Search Near Me</button>
        </Link>
      </div>
    );
  }
}
