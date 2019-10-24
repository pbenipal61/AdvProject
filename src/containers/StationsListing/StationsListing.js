import React, { Component } from "react";
import styles from "./StationsListing.module.css";
class StationsListing extends Component {
  render() {
    return (
      <div className={styles.main}>
        <div className={styles.title}>ELECTRICMESH</div>
        <div className={styles.tagline}>
          for all your e-vehicle charging needs
        </div>
        <input
          type="text"
          className={styles.searchBar}
          placeholder="type in city or address of the station"
        ></input>
        <div className={styles.stationsListings}></div>
      </div>
    );
  }
}

export default StationsListing;
