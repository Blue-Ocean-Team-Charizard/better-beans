import React from 'react';
import Link from 'next/link';
import router from 'next/router';

export default class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: '',
    };
    this.searchCurrentLocation = this.searchCurrentLocation.bind(this);
    this.geoSuccess = this.geoSuccess.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.initAutocomplete = this.initAutocomplete.bind(this);
  }

  componentDidMount() {
    this.initAutocomplete();
  }

  componentDidUpdate(prevProps) {
    const { google } = this.props;

    if (prevProps.google !== google) {
      this.initAutocomplete();
    }
  }

  handleChange(e) {
    this.setState({ location: e.target.value });
  }

  handleSubmit(e) {
    const { updateList, updateCoords } = this.props;
    const { location } = this.state;
    e.preventDefault();
    router.push('/search');

    fetch(`/api/textsearch?query=${location}`)
      .then((res) => res.json())
      .then((data) => {
        updateList(data.places);
        updateCoords(data.coords);
      })
      .catch((err) => console.log(err));
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      // console.log(`you clicked enter and searched for ${this.state.location}`);
      this.handleSubmit(e);
    }
  }

  geoSuccess(pos) {
    const { updateCoords, updateList } = this.props;
    const crd = pos.coords;

    // console.log('Your current position is:');
    // console.log(`Latitude : ${crd.latitude}`);
    // console.log(`Longitude: ${crd.longitude}`);
    updateCoords({
      lat: crd.latitude,
      lng: crd.longitude,
    });

    fetch(`/api/search?location=${crd.latitude},${crd.longitude}`)
      .then((res) => res.json())
      .then((data) => updateList(data))
      .catch((err) => console.log(err));
  }

  initAutocomplete() {
    const { google } = this.props;
    if (google) {
      const input = document.getElementById('search');
      const options = {
        fields: ['address_components', 'geometry', 'icon', 'name'],
        strictBounds: false,
      };
      const autocomplete = new google.maps.places.Autocomplete(input, options);
      autocomplete.setFields(['place_id', 'geometry', 'name']);
    }
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
        <input
          type="text"
          id="search"
          className="form-control"
          placeholder="Search for a location"
          aria-label="Search location"
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
        />
        <button className="btn btn-outline-secondary" type="button" onClick={this.handleSubmit}>
          GO
        </button>
        <Link href="/search">
          <button className="btn btn-outline-secondary btn-near-me" type="button" onClick={this.searchCurrentLocation}>Near Me</button>
        </Link>
      </div>
    );
  }
}
