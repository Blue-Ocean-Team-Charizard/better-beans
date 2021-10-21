import { Component } from 'react';
import router from 'next/router';

let map;
let infoWindow;
class Map extends Component {
  constructor(props) {
    super(props);

    this.initMap = this.initMap.bind(this);
    this.addMarkers = this.addMarkers.bind(this);
    this.changeCenter = this.changeCenter.bind(this);
  }

  componentDidMount() {
    if(this.props.google) {
      this.initMap();
      this.addMarkers();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.google !== this.props.google) {
      this.initMap();
      this.addMarkers();
    }
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
    const { coords } = this.props;
      map = new this.props.google.maps.Map(document.getElementById('map'), {
        center: coords,
        zoom: 14,
        mapTypeControl: false,
        streetViewControl: false,
        mapId: '7245511982127ecd',
      });
  }

  addMarkers() {
    const { selectShop, shopList, google } = this.props;
      shopList.forEach((shop) => {
        const info = `
        <div id='info-${shop.place_id}' class="info-window">
        <h3 class='iw-name'>${shop.name}</h3>
        ${shop.opening_hours ? shop.opening_hours.open_now ?
          '<div class="iw-open">Open <span class="dot"/></div>' :
          '<div class="iw-closed">Closed <span class="dot"/></div>'
            : ''}
        <div class='iw-vicinity'>${shop.vicinity}</div>
        </div>`;
        const marker = new google.maps.Marker({
          position: shop.geometry.location,
          title: 'cafe',
          visible: true,
          map,
          icon: '/cafeMarker.svg',
        });
        marker.addListener('click', () => {
          if(infoWindow) {
            infoWindow.close();
          }
          infoWindow = new google.maps.InfoWindow({
            content: info,
          });
          infoWindow.open({
            anchor: marker,
            map,
            content: info,
            shouldFocus: false,
          });
        google.maps.event.addListener(infoWindow, 'domready', () => {
          document.getElementById(`info-${shop.place_id}`).addEventListener('click', () => {
            selectShop(shop);
            router.push(`/shop/${shop.place_id}`);
          });
        });

        map.addListener('click', () => {
          infoWindow.close();
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
