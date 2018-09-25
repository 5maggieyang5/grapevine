
import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Geocode from 'react-geocode';
import {greatPlaceStyle} from './placeStyles.jsx';


const AnyReactComponent = ({ text }) => 
<div style = {greatPlaceStyle} >{text}</div>;


class SimpleMap extends Component {
  constructor(props){
    super(props);
    this.state = { locations:[]};
  
  }
  static defaultProps = {
    initialCenter: {
      lat: 43.652,
      lng: -79.384
    },
    zoom: 13
  };

  render() {
    let addresslist = [];
    let address1 = "482 Huron Street Toronto ONT" ;
    let address2 = "46 Spadina Avenue Toronto ONT" ;
    addresslist.push(address1);
    addresslist.push(address2);


    // Geocode.fromAddress(address1).then(
    //   response => {
    //     const { lat, lng } = response.results[0].geometry.location;
    //      this.setState({locations:
    //        [...this.state.locations, response.results[0].geometry.location]});
    //   },
    //   error => {
    //     console.error(error);
    //   });
      
    //  setTimeout( Geocode.fromAddress(address2).then(
    //     response => {
    //       const { lat, lng } = response.results[0].geometry.location;
    //       debugger;
    //       this.setState({locations: [...this.state.locations, {lat:lat,lng:lng}]});
    //     },
    //     error => {
    //       console.error(error);
    //   }),1000);
    
    console.log("got these addresses",this.state.locations)
    
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
            defaultZoom={14}
            text={'User 1'}
          />

          <AnyReactComponent
            lat={43.656}
            lng={-79.3968}
            defaultZoom={14}
            text={'User 2'}
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;