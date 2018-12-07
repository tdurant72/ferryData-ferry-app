import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './components/Form'
import Ferries from './components/Ferries'
import axios from 'axios'

const API_KEY = "80e61cf4-541b-4651-8228-6376d80567f7";
const proxy = "https://cors-anywhere.herokuapp.com/";


class App extends Component {

  state = {
    ferries: [],
    VesselIDs: [],
    ferryData: null,
    ferryLocations: []
  }

  getFerry = async (e) => {
    const ferryName = e.target.elements.ferryName.value;
    e.preventDefault();

    const indivdual_api_call = await fetch(`${proxy}http://www.wsdot.wa.gov/Ferries/API/Vessels/rest/vesselaccommodations/${ferryName}?apiaccesscode=${API_KEY}`)
    const ferryData = await indivdual_api_call.json();
    console.log(ferryData);
    this.setState({
      ferryData: ferryData,

    })
    console.log(this.state.ferryData);
  }


  // }
  // getAllFerries = async () => {
  //   const api_call = await fetch(`${proxy}http://www.wsdot.wa.gov/Ferries/API/Vessels/rest/vessellocations?apiaccesscode=${API_KEY}`)

  //   const ferries = await api_call.json();
  //   console.log(ferries)

  //   this.setState({
  //     ferries: ferries,
  //     //VesselID: data.ferries[0].VesselID
  //   }, () => {
  //     this.renderMap();
  //     console.log("getFerries called");
  //   })

  // }
  getAllFerries = async () => {
    axios.get(proxy + "http://www.wsdot.wa.gov/Ferries/API/Vessels/rest/vessellocations?apiaccesscode=" + API_KEY)
      .then(response => {
        console.log(response.data)
        this.setState({
          ferries: response.data
        }, this.renderMap())
      })

      .catch(error => {
        console.log(error)
      })
  }
  componentDidMount = async () => {
    this.getAllFerries();
    // this.renderMap()
  }

  renderMap = () => {
    loadScript("https://www.bing.com/api/maps/mapcontrol?key=AsYvNI-GHrtArcRybTU256h6zvO5I3G9zzdC0kFwiXkdoA81Ux9RRPSjxm_o_Aqi&callback=loadMapScenario")
    window.loadMapScenario = this.loadMapScenario
  }

  loadMapScenario = () => {
    const map = new window.Microsoft.Maps.Map(document.getElementById('map'), {
      center: new window.Microsoft.Maps.Location(47.982295, -122.536867),
      mapTypeId: window.Microsoft.Maps.MapTypeId.road,
      zoom: 9
    })
    const boatIcon =
      '<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="20" height="20" viewBox="0 0 24 24"><path d="M6,6H18V9.96L12,8L6,9.96M3.94,19H4C5.6,19 7,18.12 8,17C9,18.12 10.4,19 12,19C13.6,19 15,18.12 16,17C17,18.12 18.4,19 20,19H20.05L21.95,12.31C22.03,12.06 22,11.78 21.89,11.54C21.76,11.3 21.55,11.12 21.29,11.04L20,10.62V6C20,4.89 19.1,4 18,4H15V1H9V4H6A2,2 0 0,0 4,6V10.62L2.71,11.04C2.45,11.12 2.24,11.3 2.11,11.54C2,11.78 1.97,12.06 2.05,12.31M20,21C18.61,21 17.22,20.53 16,19.67C13.56,21.38 10.44,21.38 8,19.67C6.78,20.53 5.39,21 4,21H2V23H4C5.37,23 6.74,22.65 8,22C10.5,23.3 13.5,23.3 16,22C17.26,22.65 18.62,23 20,23H22V21H20Z" /></svg>';

    this.state.ferries.map(ferry => {
      var pinLocation = new window.Microsoft.Maps.Location(ferry.Latitude, ferry.Longitude);
      var pin = new window.Microsoft.Maps.Pushpin(pinLocation, {
        // text: ferry.VesselId,
        // title: ferry.VesselName,
        icon: boatIcon,
        anchor: new window.Microsoft.Maps.Point(10, 10)
      });
      var infobox = new window.Microsoft.Maps.Infobox(pinLocation, {
        maxHeight: 350,
        minHeight: 300,
        maxWidth: 450,
        title: ferry.VesselName,
        description: '<strong>' + "Departing Teminal: " + '</strong>' + '<br>' + ferry.DepartingTerminalName + '<br>' + '<strong>' + "Arriving Terminal: " + '</strong>' + '<br>' + ferry.ArrivingTerminalName,
        showCloseButton: false,
        autoAlignment: true,
        visible: false,
        actions: [
          {
            label: "More",
            eventHandler: function () {
              console.log("more clicked");
            }
          },
          {
            label: "Close",
            eventHandler: function () {
              map.setView({ zoom: 9 });
              infobox.setOptions({ visible: false });
            }
          },
        ]
      });
      infobox.setMap(map);

      window.Microsoft.Maps.Events.addHandler(pin, 'click', function () {
        console.log(infobox);
        map.setView({ center: pinLocation, zoom: 12 })
        infobox.setOptions({ visible: true });
      })


      map.entities.push(pin);
      //console.log(pin)
    })

  }

  handleListItemClick = ferry => {
    console.log(ferry, " Ferry Clicked")
  }

  render() {
    const singleFerry = this.state.ferryData;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Recipe Search</h1>
        </header>
        <Form
          getFerry={this.getFerry}
        />
        <div id="content-wrapper">

          <Ferries ferries={this.state.ferries} handleListItemClick={this.handleListItemClick} />
          <div id="map" className="map"></div>
        </div>

      </div>
    );
  }
}
function loadScript(url) {
  var index = window.document.getElementsByTagName("script")[0]
  var script = window.document.createElement("script")
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)
}
export default App;
