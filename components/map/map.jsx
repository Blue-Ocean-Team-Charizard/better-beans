import React, { Component } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import keys from '../../config/config';
import data from './mockData';
// import Image from 'next/image';

let map;
class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: data,
    };
    this.loader = new Loader({
      apiKey: keys.google,
      version: 'weekly',
      libraries: ['drawing', 'geometry', 'places'],
    });
    this.initMap = this.initMap.bind(this);
    this.addMarkers = this.addMarkers.bind(this);
    this.changeCenter = this.changeCenter.bind(this);
  }

  componentDidMount() {
    this.initMap();
    this.addMarkers();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.coords !== this.props.coords) {
      this.changeCenter();
    }
    if (prevProps.shopList !== this.props.shopList) {
      this.addMarkers();
    }
  }

  changeCenter() {
    map.panTo(this.props.coords);
  }

  initMap() {
    this.loader.load().then(() => {
      map = new google.maps.Map(document.getElementById('map'), {
        center: this.props.coords,
        zoom: 14,
        mapTypeControl: false,
        streetViewControl: false,
      });
    });
  }

  changeCenter(coords) {
    map.panTo(coords);
  }

  addMarkers() {
    this.loader.load().then(() => {
      this.props.shopList.forEach((shop) => {
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
          icon: '/cafeMarker.svg',
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
      <div id="map" />
    );
  }
}

export default Map;
