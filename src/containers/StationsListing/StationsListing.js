import React, { Component } from "react";
import styles from "./StationsListing.module.css";
import StationEntry from "../../components/StationEntry/StationEntry";
import axios from "axios";
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

  changeToLoginScene = () => {
    this.setState(() => ({
      currentScene: "login"
    }));
  };

  changeToChargeScene = station => {
    this.setState(() => ({
      currentScene: "charge",
      chargingStation: station
    }));
  };
  searchInputChangedHandler = event => {
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

  registerInputChangeHandler = event => {
    const title = event.target.title;
    const value = event.target.value;
    const obj = { ...this.state.user };
    obj[title] = value;
    this.setState((prevState, props) => ({
      user: {
        ...obj
      }
    }));
  };
  registerHandler = async event => {
    const userObj = this.state.user;
    const keys = Object.keys(userObj);
    const filteredKeys = keys.filter(key => userObj[key]);

    if (filteredKeys.length !== 4) {
      return;
    }

    if (userObj.password === userObj.confirmPassword) {
      //   console.log(userObj);
      const url = "http://18.216.165.155:3000/v1/register";
      const userData = await axios.post(url, userObj);
      console.log(userData.data);
      this.setState((prevState, props) => ({
        user: {
          ...userData.data
        },
        currentScene: "search"
      }));

      //   console.log(this.state);
    } else {
      return;
    }
  };

  loginHandler = async event => {
    const url = "http://18.216.165.155:3000/v1/login";
    const userObj = this.state.user;
    const keys = Object.keys(userObj);
    const filteredKeys = keys.filter(key => userObj[key]);
    if (filteredKeys.length < 2) {
      return;
    }
    const userData = await axios.post(url, userObj);
    console.log(userData.data);
    this.setState((prevState, props) => ({
      user: {
        ...userData.data
      },
      currentScene: "search"
    }));

    console.log(this.state);
  };

  logoutHandler = async event => {
    this.setState((prevState, props) => ({
      user: {},
      currentScene: "search"
    }));
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
          onChange={this.searchInputChangedHandler}
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
          <div>Full Name: </div>{" "}
          <input
            type="text"
            title="name"
            onChange={this.registerInputChangeHandler}
          ></input>
        </div>
        <div className={styles.registerModule}>
          <div>Email: </div>{" "}
          <input
            type="text"
            title="email"
            onChange={this.registerInputChangeHandler}
          ></input>
        </div>
        <div className={styles.registerModule}>
          <div>Password: </div>{" "}
          <input
            type="password"
            title="password"
            onChange={this.registerInputChangeHandler}
          ></input>
        </div>
        <div>
          <div className={styles.registerModule}>
            <div>Confirm Password: </div>
            <input
              type="password"
              title="confirmPassword"
              onChange={this.registerInputChangeHandler}
            ></input>
          </div>
        </div>

        <button
          className={styles.registerButton}
          onClick={this.registerHandler}
        >
          Register
        </button>
      </div>
    );
    const loginScene = (
      <div className={styles.registerScene}>
        <div className={styles.registerModule}>
          <div>Email: </div>{" "}
          <input
            type="text"
            title="email"
            onChange={this.registerInputChangeHandler}
          ></input>
        </div>
        <div className={styles.registerModule}>
          <div>Password: </div>{" "}
          <input
            type="password"
            title="password"
            onChange={this.registerInputChangeHandler}
          ></input>
        </div>

        <button className={styles.registerButton} onClick={this.loginHandler}>
          Login
        </button>
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

      case "login":
        scene = loginScene;
        break;
      default:
        scene = <div></div>;
        break;
    }

    const loggedInStatus = this.state.user.token ? (
      <button onClick={this.logoutHandler}>Logout</button>
    ) : (
      <div className={styles.authButtons}>
        <button
          className={styles.authButton}
          onClick={this.changeToRegisterScene}
        >
          Register
        </button>
        <button className={styles.authButton} onClick={this.changeToLoginScene}>
          Login
        </button>
      </div>
    );
    return (
      <div className={styles.main}>
        <div>{loggedInStatus}</div>
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
