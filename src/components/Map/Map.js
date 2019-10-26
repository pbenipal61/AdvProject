import React from "react";
import { Map as LeafletMap, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";
class Map extends React.Component {
  state = { marks: [] };
  async componentDidMount() {
    const url = "http://18.216.165.155:3000/v1/stations/all";
    const data = await axios.get(url);

    const marks = data.data.stations.map(
      station => station.location.coordinates
    );

    this.setState((prevState, props) => ({
      marks
    }));
  }
  setupMarks = marks => {
    this.setState((prevState, props) => ({
      marks
    }));
  };
  render() {
    console.log(this.state.marks);
    const marks = this.state.marks.map(mark => (
      <Marker key={mark} position={mark}>
        <Popup></Popup>
      </Marker>
    ));
    return (
      <LeafletMap
        center={[65.2001513, 24.3220229]}
        zoom={5}
        maxZoom={10}
        attributionControl={true}
        zoomControl={true}
        doubleClickZoom={true}
        scrollWheelZoom={true}
        dragging={true}
        animate={true}
        easeLinearity={0.35}
      >
        <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
        {marks}
      </LeafletMap>
    );
  }
}

export default Map;
