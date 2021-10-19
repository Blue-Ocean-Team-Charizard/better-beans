import React, { Component } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import keys from '../../config';
import data from './mockData';

let map;
class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: { lat: 35.1983, lng: -111.6513 },
      markers: data,
    };
    this.loader = new Loader({
      apiKey: keys.google,
      version: 'weekly',
      libraries: ['drawing', 'geometry', 'places'],
    });
    this.initMap = this.initMap.bind(this);
    this.addMarkers = this.addMarkers.bind(this);
  }

  componentDidMount() {
    this.initMap();
    this.addMarkers();
  }

  initMap() {
    this.loader.load().then(() => {
      map = new google.maps.Map(document.getElementById('map'), {
        center: this.state.center,
        zoom: 14,
      });
    });
  }

  addMarkers() {
    this.loader.load().then(() => {
      this.state.markers.forEach((shop) => {
        const info = `
        <div>${shop.name}</div>
        <div>${shop.vicinity}</div>`;
        // <div>Open Now: ${shop.opening_hours.open_now ? 'Open' : 'Closed'}</div>
        const infoWindow = new google.maps.InfoWindow({
          content: info,
        });
        const marker = new google.maps.Marker({
          position: shop.geometry.location,
          title: 'cafe',
          visible: true,
          map,
        });
        map.addListener('click', () => {
          infoWindow.close();
        });
        marker.setMap(map);
        marker.addListener('click', () => {
          infoWindow.open({
            anchor: marker,
            map,
            shouldFocus: false,
          });
        });
      });
    });
  }

  render() {
    return (
      <div id="map" style={{ height: '800px', width: '1000px' }} />
    );
  }
}

export default Map;
