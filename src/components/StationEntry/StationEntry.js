import React from "react";
import styles from "./StationEntry.module.css";
const StationEntry = props => {
  console.log(props.station);
  return (
    <div className={styles.main}>
      <div className={styles.address}>{props.station.address}</div>
      <div className={styles.speedAndType}>
        <div className={styles.type}>
          {props.station.speed.min === props.station.speed.max
            ? props.station.speed.max
            : `${props.station.speed.min} - ${props.station.speed.max}`}
        </div>
        <div className={styles.speed}></div>
      </div>
    </div>
  );
};

export default StationEntry;
