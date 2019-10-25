import React, { Component } from "react";
import styles from "./StationsListing.module.css";
import StationEntry from "../../components/StationEntry/StationEntry";
const axios = require("axios");
class StationsListing extends Component {
  state = {
    stations: [],
    unFilteredStations: [],
    chargingStation: null,
    user: {}
  };
  async componentDidMount() {
    const url = "http://18.216.165.155:3000/v1/stations/all";
    const data = await axios.get(url);

    this.setState((prevState, props) => ({
      stations: data.data.stations,
      unFilteredStations: data.data.stations,
      currentScene: "search"
    }));
  }
  changeToRegisterScene = () => {
    this.setState(() => ({
      currentScene: "register"
    }));
  };

  changeToChargeScene = station => {
    this.setState(() => ({
      currentScene: "charge",
      chargingStation: station
    }));
  };
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
      <StationEntry
        station={station}
        key={station.address}
        onClick={() => this.changeToChargeScene(station)}
      />
    ));

    const searchScene = (
      <React.Fragment>
        <input
          type="text"
          className={styles.searchBar}
          onChange={this.inputChangedHandler}
          placeholder="type in city or address of the station"
        ></input>
        <div className={styles.stationsListings}>{stationEntries}</div>
      </React.Fragment>
    );

    const chargeScene = (
      <div className={styles.chargingScene}>
        <div className={styles.chargingTitle}>CHARGING</div>
        <div className={styles.chargingAddress}>
          {`ADDRESS: ${
            this.state.chargingStation != null
              ? this.state.chargingStation.address
              : ""
          }`}
        </div>

        <div className={styles.chargingConnectorType}>
          {`CONNECTOR TYPE: ${
            this.state.chargingStation != null
              ? this.state.chargingStation.connectorType
              : ""
          }`}
        </div>
        <div className={styles.chargingPower}>
          {`POWER: ${
            this.state.chargingStation != null
              ? this.state.chargingStation.speed.min ===
                this.state.chargingStation.speed.max
                ? `${this.state.chargingStation.speed.max}kW`
                : `${this.state.chargingStation.speed.min}-${this.state.chargingStation.speed.max}kW`
              : ""
          }`}
        </div>

        <div className={styles.chargingConnectorType}>
          {`CODE: ${
            this.state.chargingStation != null
              ? this.state.chargingStation.code
              : ""
          }`}
        </div>
      </div>
    );

    const registerScene = (
      <div className={styles.registerScene}>
        <div className={styles.registerModule}>
          <div>Full Name: </div> <input type="text"></input>
        </div>
        <div className={styles.registerModule}>
          <div>Email: </div> <input type="text"></input>
        </div>
        <div className={styles.registerModule}>
          <div>Password: </div> <input type="text"></input>
        </div>
        <div>
          <div className={styles.registerModule}>
            <div>Confirm Password: </div>
            <input type="text"></input>
          </div>
        </div>
      </div>
    );
    let scene = <div></div>;

    switch (this.state.currentScene) {
      case "search":
        scene = searchScene;
        break;
      case "charge":
        scene = chargeScene;
        break;

      case "register":
        scene = registerScene;
        break;
      default:
        scene = <div></div>;
        break;
    }
    return (
      <div className={styles.main}>
        <div>
          <div className={styles.authButtons}>
            <button
              className={styles.authButton}
              onClick={this.changeToRegisterScene}
            >
              Register
            </button>
            <button className={styles.authButton}>Login</button>
          </div>
        </div>
        <div className={styles.title}>ELECTROMESH</div>
        <div className={styles.tagline}>
          for all your e-vehicle charging needs
        </div>
        {scene}
      </div>
    );
  }
}

export default StationsListing;
