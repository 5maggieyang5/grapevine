import React, {Component} from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';

class TradeMap extends Component {

  state = {
    markers: this.props.markers,
    center_latitude: this.props.center_latitude,
    center_longitude: this.props.center_longitude,
    viewport: {
      width: 1694,
      height: 1000,
      latitude: this.props.center_latitude,
      longitude: this.props.center_longitude,
      zoom: 11.6
    }
  };

  render() {
    return (
      <ReactMapGL
        style={{textAlign: 'left', width: '100%', height: '100%'}}
        {...this.state.viewport}
        onViewportChange={(viewport) => this.setState({viewport})}
        mapboxApiAccessToken="pk.eyJ1Ijoiamt5b3VuZ3MiLCJhIjoiY2ptbnpoOG9xMHpoejNrbnlxYjcwbjE2aCJ9.nQQU3n63lrlEQw6N1Odtxg"
        mapStyle='mapbox://styles/jkyoungs/cjmo2omvntesa2rn6ob81w1wl'
      >
        <div>
          <Marker latitude={this.state.center_latitude} longitude={this.state.center_longitude} offsetLeft={-30} offsetTop={-60} >
            <img src='/bluemapmarker.svg' style={{height:"60px", width:"60px"}} alt='map-marker' />
          </Marker>
          <Popup latitude={this.state.center_latitude} longitude={this.state.center_longitude} closeButton={false} anchor="top" >
            <div>Center</div>
          </Popup>
        </div>
        {this.state.markers.map(marker => (
          <div>
            <Marker latitude={marker.latitude} longitude={marker.longitude} offsetLeft={-25} offsetTop={-50} >
              <img src='/mapmarker.svg' style={{height:"50px", width:"50px"}} alt='map-marker' />
            </Marker>
            <Popup latitude={marker.latitude} longitude={marker.longitude} closeButton={false} anchor="top" >
              <div>{marker.username}</div>
            </Popup>
          </div>
        ))}
      </ReactMapGL>
    );
  }
}

export default TradeMap;
