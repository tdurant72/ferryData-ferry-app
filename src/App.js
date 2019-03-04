import React, { Component } from "react";
import "./App.css";
import Loader from "./components/Loader"
import Map from './components/Map'
import axios from "axios";
import ports from './data/ports'
import views from './data/views'


class App extends Component {
  state = {
    code: null,
    ferries: [],
    ncferries: [],
    pins: [],
    ncPins: [],
    terminalPins: [],
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
        this.setState(() => ({ ncferries: response.data.features, ncPinData: [], terminals: ports, terminalPins: ports, timeStamp, filteredFerries: response.data.features, code: response.data.crs.properties.code }))

        // console.log(response.data)
      }).then((resonse) => {
        this.setState(() => ({ isLoading: false, }));
        console.log(this.state.code)
      })
      .then(
        this.setState(() => ({ isLoading: false, terminals: ports, views: views }))
      )

      .catch(error => {
        console.log(error);
        this.setState(() => ({ fetchingMessage: 'Data failed to load, the service may be temporarily unavailable. Please try again later.' }))
      });
  };



  componentDidMount = async () => {
    this.startCount()
    this.getNCFerries()
    setInterval(this.getNCFerries, 30000)

  };

  componentWillUnmount() {
    clearTimeout(this.startCount())
  }

  startCount() {
    setTimeout(() => {
      this.setState(() => ({ fetchingMessage: 'Data failed to load, the service may be temporarily unavailable. Please try again later.' }))
    }, 3000)
  }


  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Ferry Tracker</h1>
        </header>

        <div id="content-wrapper">
          {
            this.state.isLoading === true || this.state.ncferries.length === 0 ?
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

          {/* <FerryTable ncferries={this.state.ncferries} /> */}
        </div>
      </div>
    );
  }
}

export default App;
