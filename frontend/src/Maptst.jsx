
import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Geocode from 'react-geocode';

let mapIcon = '/mapicon.png'
const myStyle = {
  position: 'absolute',
  transform: 'translate(-50%, -50%)'
  
}


const AnyReactComponent = ({ text }) => 
<div style = {myStyle} > <img src={mapIcon} ></img>{text}</div>;



class SimpleMap extends Component {
  static defaultProps = {
    initialCenter: {
      lat: 43.652,
      lng: -79.384
    },
    zoom: 11
  };

  render() {

    let address1 = "482 Huron Street Toronto ONT" ;
    let address2 = "46 Spadina Avenue Toronto ONT" ;
    let lat1 = 0;
    Geocode.fromAddress(address1).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
         lat1 = lat;
        console.log(lat);
        return lat1
      },
      error => {
        console.error(error);
      });
    console.log(lat1)
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '60vh', width: '60%' }}>
        <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBmjhJ50vNsVYHDep3kbkSFKZoKU39ji3s"}}
        defaultCenter={this.props.initialCenter}
          defaultZoom={this.props.zoom}
          yesIWantToUseGoogleMapApiInternals

        >
          <AnyReactComponent
            lat={43.66}
            lng={-79.384}
            text={'Kreyser Avrora'}
          />

          <AnyReactComponent
            lat={43.63}
            lng={-79.38}
            defaultZoom={13}
            text={'Another Place'}
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;