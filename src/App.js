import React, { Component } from "react";

import "./App.css";
//import Form from "./components/Form";
import Ferries from "./components/Ferries";
import FerryTable from "./components/FerryTable";
import FerryList from "./components/FerryList";
import Pin from "./components/Pin";
import Loader from "./components/Loader"
import Map from './components/Map'

import axios from "axios";
import ports from './data/ports'
import views from './data/views'

const API_KEY = "80e61cf4-541b-4651-8228-6376d80567f7";
const proxy = "https://cors-anywhere.herokuapp.com/";
const Microsoft = window.Microsoft;



class App extends Component {
  state = {
    ferries: [],
    ncferries: [],
    pins: [],
    ncPins: [],
    terminalPins: [],
    ncPinData: [],
    filterPin: this.props.pins,
    ferryData: null,
    filteredFerries: [],
    map: null,
    search: "",
    isLoading: true,
    views: [],
    terminals: [],
    fetchingMessage: 'Data Loading',
    failMessage: 'Data failed to load, try again later.'
  };

  getNCFerries = async () => {
    axios
      .get(

        "https://gisd14.dot.nc.net/GeoRss/FerryGeoJson.ashx"
      )
      .then(response => {
        let ncFerries = response.data;
        this.setState(() => ({ ncferries: response.data.features, ncPinData: [] }))
      })
      .then(
        this.setState(() => ({ isLoading: false, terminals: ports, views: views }))
      )

      .catch(error => {
        console.log(error);
      });
  };



  componentDidMount = async () => {
    this.getNCFerries()
    setInterval(this.getNCFerries, 60000)

  };
  componentDidUpdate = async () => {
    //setInterval(this.getNCFerries, 60000)//turn on before live
    //console.log("recall done")
  };


  filterFerries(search) {
    let filter = search
      ? this.state.ncferries.filter(f =>
        f.properties['Vessel Name'].toLowerCase().includes(search)
      )
      : this.state.ncferries;
    this.state.ncPinData.forEach(p => {
      p.metadata.title.toLowerCase().includes(search)
        ? p.setOptions({ visible: true })
        : p.setOptions({ visible: false });
    });

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
        {/* <input
          type="text"
          placeholder="Find a ferry"
          value={this.state.search}
          onChange={e => {
            this.filterFerries(e.target.value);
          }}
        /> */}

        <div id="content-wrapper">

          {/* <FerryList ncferries={filteredFerries} /> */}
          {/* <Terminals terminals={this.state.terminals}/> */}
          {/* <div id="map" className="map"

          /> */}
          {
            this.state.isLoading === true ?
              <Loader
                isLoading={this.state.isLoading}
                failMessage={this.state.failMessage}
                fetchingMessage={this.state.fetchingMessage}
              /> :
              <Map
                ncferries={filteredFerries}
                data={this.state}
              />
          }


          <FerryTable ncferries={filteredFerries} />
        </div>
      </div>
    );
  }
}

export default App;
