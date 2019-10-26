import React, { Component } from "react";
import "./App.css";
import Map from "./components/Map/Map";
import StationsListing from "./containers/StationsListing/StationsListing";
import axios from "axios";
class App extends Component {
  async bro() {
    const url = "http://18.216.165.155:3000/v1/stations/all";
    const data = await axios.get(url);

    const marks = data.data.stations.map(
      station => station.location.coordinates
    );
    console.log(marks);
    this.props.map.setupMarks(marks);
    this.setState((prevState, props) => ({
      unFilteredStations: data.data.stations
    }));
  }
  render() {
    return (
      <div className="App">
        <StationsListing />
        <Map />
      </div>
    );
  }
}

export default App;
