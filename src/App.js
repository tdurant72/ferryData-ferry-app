import React, { Component } from "react";
import "./App.css";
import FerryTable from "./components/FerryTable";
import Loader from "./components/Loader"
import Map from './components/Map'
import axios from "axios";
import ports from './data/ports'


class App extends Component {
  state = {
    ferries: [],
    ncferries: [],
    pins: [],
    ncPins: [],
    // pin: this.filteredFerries,
    ncPinData: [],
    terminals: [],
    filterPin: this.props.pins,
    ferryData: null,
    filteredFerries: [],
    map: null,
    search: "",
    isLoading: true,
    timeStamp: null,
    fetchingMessage: 'Data Loading',
    failMessage: 'Data failed to load, try again later.'
  };

  getNCFerries = async () => {
    axios
      .get(

        "https://gisd14.dot.nc.net/GeoRss/FerryGeoJson.ashx"
      )
      .then(response => {

        let timeStamp = Date.now();
        this.setState(() => ({ ncferries: response.data.features, ncPinData: [], terminals: ports, terminalPins: ports, timeStamp, filteredFerries: response.data.features }))
        console.log(response.data)
      }).then((resonse) => {
        this.setState(() => ({ isLoading: false, }))
      })

      .catch(error => {
        console.log(error);
      });
  };



  componentDidMount = async () => {
    this.getNCFerries()
    setInterval(this.getNCFerries, 60000)

  };


  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Ferry Tracker</h1>
        </header>

        <div id="content-wrapper">
          {
            this.state.isLoading === true ?
              <Loader
                isLoading={this.state.isLoading}
                failMessage={this.state.failMessage}
                fetchingMessage={this.state.fetchingMessage}
                arrayCheck={this.state.ncferries}
              /> :
              <Map
                //ncferries={filteredFerries}
                data={this.state}
              />
          }

          <FerryTable ncferries={this.state.ncferries} />
        </div>
      </div>
    );
  }
}

export default App;
