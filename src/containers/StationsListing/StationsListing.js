import React, { Component } from "react";
import styles from "./StationsListing.module.css";
import StationEntry from "../../components/StationEntry/StationEntry";
const axios = require("axios");
class StationsListing extends Component {
  state = { stations: [], unFilteredStations: [] };
  async componentDidMount() {
    const url = "http://18.216.165.155:3000/v1/stations/all";
    const data = await axios.get(url);

    this.setState((prevState, props) => ({
      stations: data.data.stations,
      unFilteredStations: data.data.stations
    }));
  }
  inputChangedHandler = event => {
    const filter = event.target.value;

    const filteredStations = this.state.unFilteredStations.filter(item => {
      if (
        item.address.toLowerCase().includes(filter) ||
        item.city.toLowerCase().includes(filter)
      ) {
        return true;
      }
      return false;
    });
    this.setState((state, props) => {
      return {
        stations: filteredStations
      };
    });
  };

  render() {
    const stationEntries = this.state.stations.map(station => (
      <StationEntry station={station} key={station.address} />
    ));
    return (
      <div className={styles.main}>
        <div className={styles.title}>ELECTROMESH</div>
        <div className={styles.tagline}>
          for all your e-vehicle charging needs
        </div>
        <input
          type="text"
          className={styles.searchBar}
          onChange={this.inputChangedHandler}
          placeholder="type in city or address of the station"
        ></input>
        <div className={styles.stationsListings}>{stationEntries}</div>
      </div>
    );
  }
}

export default StationsListing;
