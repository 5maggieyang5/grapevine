import React, {Component} from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';

class Map extends Component {

  state = {
    marker_latitude: this.props.latitude,
    marker_longitude: this.props.longitude,
    viewport: {
      width: 800,
      height: 500,
      latitude: this.props.latitude,
      longitude: this.props.longitude,
      center: [this.props.longitude,this.props.latitude],
      zoom: 12.5
    }
  };

  render() {
    console.log("mapbox rendered with props", this.props);
    return (
      <ReactMapGL
        {...this.state.viewport}
        onViewportChange={(viewport) => this.setState({viewport})}
        mapboxApiAccessToken="pk.eyJ1Ijoiamt5b3VuZ3MiLCJhIjoiY2ptbnpoOG9xMHpoejNrbnlxYjcwbjE2aCJ9.nQQU3n63lrlEQw6N1Odtxg"
        mapStyle='mapbox://styles/jkyoungs/cjmo2omvntesa2rn6ob81w1wl'
      >
        <Marker latitude={this.state.marker_latitude} longitude={this.state.marker_longitude} offsetLeft={-25} offsetTop={-50} >
          <img src='/mapmarker.svg' style={{height:"50px", width:"50px"}} alt='map-marker' />
        </Marker>
      </ReactMapGL>
    );
  }
}

export default Map;
