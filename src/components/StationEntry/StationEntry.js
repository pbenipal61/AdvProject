import React from "react";
import styles from "./StationEntry.module.css";
const StationEntry = props => {
  return (
    <div className={styles.main} onClick={props.onClick}>
      <div
        className={styles.address}
      >{`${props.station.address}, ${props.station.city}`}</div>
      <div className={styles.speedAndType}>
        <div
          className={styles.type}
        >{`Connector Type: ${props.station.connectorType}`}</div>
        <div className={styles.speed}>
          {props.station.speed.min === props.station.speed.max
            ? `Power: ${props.station.speed.max}kW`
            : `Power: ${props.station.speed.min}-${props.station.speed.max}kW`}
        </div>
      </div>
      <div>{`Price: ${props.station.price}`}</div>
    </div>
  );
};

export default StationEntry;
