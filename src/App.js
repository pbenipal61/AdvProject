import React from "react";
import "./App.css";
import Map from "./components/Map/Map";
import StationsListing from "./containers/StationsListing/StationsListing";
function App() {
  return (
    <div className="App">
      <StationsListing />
      <Map />
    </div>
  );
}

export default App;
