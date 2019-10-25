import React from "react";
import styles from "./StationEntry.module.css";
const StationEntry = props => {
  return (
    <div>
      <div className={styles.address}>{props.address}</div>
      <div></div>
    </div>
  );
};

export default StationEntry;
