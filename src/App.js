import React, { Component } from "react";

import "./App.css";
//import Form from "./components/Form";
import Ferries from "./components/Ferries";
import FerryTable from "./components/FerryTable";
import FerryList from "./components/FerryList";
import Pin from "./components/Pin";
import Terminals from "./components/Terminals"
import Map from './components/Map'
import getTerminal from "./calls/getTerminal"
// import * as NCferries from "./calls/NCferries";
import axios from "axios";
import ports from './data/ports'

const API_KEY = "80e61cf4-541b-4651-8228-6376d80567f7";
const proxy = "https://cors-anywhere.herokuapp.com/";
const Microsoft = window.Microsoft;



class App extends Component {
  state = {
    ferries: [],
    ncferries: [],
    VesselIDs: [],
    pins: [],
    ncPins: [],
    terminals: [],
    terminalPins: [],
    // pin: this.filteredFerries,
    pinData: [],
    ncPinData: [],
    filterPin: this.props.pins,
    display: "block",
    visible: true,
    showPin: true,
    pinStyle: "block",
    ferryData: null,
    filteredFerries: [],
    filtered: false,
    ferryLocations: [],
    map: null,
    shown: true,
    query: "",
    search: ""
  };

  getNCFerries = async () => {
    axios
      .get(

        "https://gisd14.dot.nc.net/GeoRss/FerryGeoJson.ashx"
      )
      .then(response => {
        //console.log(response.data);
        //this.pins = [];
        let ncFerries = response.data;
        this.setState(
          {
            ncferries: response.data.features,
          },
          //this.renderMap()
        );
        //console.log(this.state.ncferries);
        this.setState({ ncPinData: [] })
        //this.renderNCferryPins()
      })

      .catch(error => {
        console.log(error);
      });
  };



  componentDidMount = async () => {
    this.getNCFerries()
    setInterval(this.getNCFerries, 30000)

  };


  filterFerries(search) {
    //let pin = this.state.pin;
    let filter = search
      ? this.state.ncferries.filter(f =>
        f.properties['Vessel Name'].toLowerCase().includes(search)
      )
      : this.state.ncferries;
    this.state.ncPinData.forEach(p => {
      p.metadata.title.toLowerCase().includes(search)
        ? p.setOptions({ visible: true })
        : p.setOptions({ visible: false });
      //console.log(this.state.map.entities);
    });
    //console.log(pin);
    //this.state.map.entities.clear();

    this.setState({ filtered: this.ncferries, search: search });
  }


  render() {
    let filteredFerries = this.state.ncferries.filter(ncferry => {
      return ncferry.properties['Vessel Name'].toLowerCase().indexOf(this.state.search) !== -1;
    });
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Ferry Tracker</h1>
        </header>
        <div>
          <a href="#" onClick={this.view1}>Link</a>
        </div>
        <input
          type="text"
          placeholder="Find a ferry"
          value={this.state.search}
          //onChange={this.updateSearch.bind(this)}
          onChange={e => {
            this.filterFerries(e.target.value);
          }}
        />
        {/*<Form />
        <Search onChange={filterFerries} />*/}

        <div id="content-wrapper">

          {/* <FerryList ncferries={filteredFerries} /> */}
          {/* <Terminals terminals={this.state.terminals}/> */}
          {/* <div id="map" className="map"

          /> */}
          <Map
            ncferries={filteredFerries}
            data={this.state}
          />
          <FerryTable ncferries={filteredFerries} />
        </div>
      </div>
    );
  }
}
function loadScript(url) {
  var index = window.document.getElementsByTagName("script")[0];
  var script = window.document.createElement("script");
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index);
}
export default App;
