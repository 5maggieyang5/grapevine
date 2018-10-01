import React, {Component} from 'react';
import ReactMapGL from 'react-map-gl';

class Map extends Component {

  state = {
    viewport: {
      width: 400,
      height: 400,
      latitude: this.props.latitude,
      longitude: this.props.longitude,
      zoom: 12
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
      />
    );
  }
}

export default Map;
