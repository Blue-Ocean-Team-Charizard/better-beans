import React, { Component } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import keys from '../../config';

let map;

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loc: undefined,
    };
    this.loader = new Loader({
      apiKey: keys.google,
      version: 'weekly',
      libraries: ['drawing', 'geometry', 'places'],
    });
  }

  initMap() {
    this.loader.load().then(() => {
      map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 35.1983, lng: -111.6513 },
        zoom: 8,
      });
    });
  }
  componentDidMount() {
    this.initMap();

  }

  render() {
    return (
      <div id="map" style={{height: '1000px', width: '1000px'}}>
        {/* {this.props.children} */}

      </div>
    )
  }
}

export default Map;
