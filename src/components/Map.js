import React, { Component } from "react";
import './Map.css'
import axios from "axios";
import ports from '../data/ports'
import views from '../data/views'
import ViewLinks from './ViewLinks'
const API_KEY = "80e61cf4-541b-4651-8228-6376d80567f7";
const Microsoft = window.Microsoft;

class Map extends Component {
    state = {
        map: null,
        ferries: [],
        //ncferries: [],
        VesselIDs: [],
        ncPins: [],
        terminals: [],
        terminalPins: [],
        ncPinData: [],
        ferryData: null,
        filteredFerries: [],
        defaultView: { latitude: 34.879891, longitude: -76.871810 },
        view1: { latitude: 35.910109, longitude: -75.851852 },
        views: [],
        selectedView: null
    }
    //35.910109, -75.851852

    /* init*/
    componentDidMount = async () => {
        this.renderMap()
        // this.getNCFerries()
        //setInterval(this.getNCFerries, 30000)
        this.setState({ terminals: ports, terminalPins: ports, views: views })
        let pins = [];
        // this.getAllTerminals().then(this.setTerminals)

    };



    /* render data */
    renderMap = () => {
        loadScript(
            "https://www.bing.com/api/maps/mapcontrol?key=AsYvNI-GHrtArcRybTU256h6zvO5I3G9zzdC0kFwiXkdoA81Ux9RRPSjxm_o_Aqi&callback=loadMapScenario"
        );
        window.loadMapScenario = this.loadMapScenario;
    };
    loadMapScenario = () => {
        const map = new window.Microsoft.Maps.Map(document.getElementById("map"), {
            //center: new window.Microsoft.Maps.Location(47.982295, -122.536867),
            center: new window.Microsoft.Maps.Location(this.state.defaultView.latitude, this.state.defaultView.longitude),
            mapTypeId: window.Microsoft.Maps.MapTypeId.road,
            zoom: 8
        });
        this.setState({ map });
        //console.log(this.state.map)
        this.renderTerminals()
        this.renderNCferryPins()
    };
    loadView = (event) => {
        let selectedView = this.state.selectedView;
        //this.state.map.setView({ center: this.state.view1, zoom: 10 })
        this.setState({ selectedView })
        console.log(this.state.selectedView);
    };
    onClickHandler = (e) => {
        console.log(
            "clicked"
        );
    }

    renderLinks() {
        this.state.views.forEach(view => {
            return (<a href="#">{this.view.title}</a>)
        })
    }
    renderNCferryPins(props) {
        this.setState({
            ncferries: this.props.data.ncferries,
            filteredFerries: this.props.data.filteredFerries,
        })
        let map = this.state.map;

        const boatIcon =
            '<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="20" height="20" viewBox="0 0 24 24"><path d="M6,6H18V9.96L12,8L6,9.96M3.94,19H4C5.6,19 7,18.12 8,17C9,18.12 10.4,19 12,19C13.6,19 15,18.12 16,17C17,18.12 18.4,19 20,19H20.05L21.95,12.31C22.03,12.06 22,11.78 21.89,11.54C21.76,11.3 21.55,11.12 21.29,11.04L20,10.62V6C20,4.89 19.1,4 18,4H15V1H9V4H6A2,2 0 0,0 4,6V10.62L2.71,11.04C2.45,11.12 2.24,11.3 2.11,11.54C2,11.78 1.97,12.06 2.05,12.31M20,21C18.61,21 17.22,20.53 16,19.67C13.56,21.38 10.44,21.38 8,19.67C6.78,20.53 5.39,21 4,21H2V23H4C5.37,23 6.74,22.65 8,22C10.5,23.3 13.5,23.3 16,22C17.26,22.65 18.62,23 20,23H22V21H20Z" /></svg>';

        this.props.data.ncferries.forEach(ncferry => {

            let pinNCLocation = new window.Microsoft.Maps.Location(
                ncferry.properties.Latitude,
                ncferry.properties.Longitude
            );
            //let pin = [];
            let ncPin = new window.Microsoft.Maps.Pushpin(pinNCLocation, {
                title: ncferry.properties['Vessel Name'],
                id: ncferry.properties['Vessel Name'],
                icon: boatIcon,
                //visible: true,
                anchor: new window.Microsoft.Maps.Point(10, 10)
            });
            ncPin.metadata = {
                id: ncferry.properties.VesseName,
                title: ncferry.properties['Vessel Name']
            };
            ncPin.setOptions({ visible: true });
            //this.setState({ pins, pin });
            var infobox = new window.Microsoft.Maps.Infobox(pinNCLocation, {
                maxHeight: 350,
                minHeight: 300,
                maxWidth: 450,
                title: ncferry.properties['Vessel Name'],
                description:
                    "<strong>" +
                    "Current Latitude: " +
                    "</strong>" +
                    "<br>" +
                    ncferry.properties.Latitude +
                    "<br>" +
                    "<strong>" +
                    "Current Longitude: " +
                    "</strong>" +
                    "<br>" +
                    ncferry.properties.Longitude
                ,
                showCloseButton: true,
                autoAlignment: true,
                visible: false,
                // actions: [
                //   {
                //     label: "More",
                //     eventHandler: function () {
                //       console.log("more clicked");
                //     }
                //   },
                //   {
                //     label: "Close",
                //     eventHandler: function () {
                //       map.setView({ zoom: 9 });
                //       infobox.setOptions({ visible: false });
                //     }
                //   }
                // ]
            });
            infobox.setMap(this.state.map);

            window.Microsoft.Maps.Events.addHandler(ncPin, "click", function () {

                map.setView({ center: pinNCLocation, zoom: 12 });
                infobox.setOptions({ visible: true });
            });

            window.Microsoft.Maps.Events.addHandler(infobox, 'click', function () {
                map.setView({ center: this.map.center, zoom: 8 });

            });
            //this.state.ncPinData.push(ncPin);
            this.setState({ ncPinData: [...this.state.ncPinData, ncPin] });
            //this.state.ncPinData.shift();
            //this.removeItem()
            this.state.map.entities.push(ncPin);
        });

        this.renderTerminals();
    }

    renderTerminals() {
        let map = this.state.map;
        //let terminals = this.state.terminals;

        let terminalPins = this.state.terminalPins;

        var terminalIcon =
            '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 23"><defs><style>.cls-1,.cls-2,.cls-3,.cls-4{fill:none;stroke-miterlimit:10;}.cls-1,.cls-4{stroke:#000;}.cls-2,.cls-3{stroke:#0071bc;}.cls-2,.cls-4{stroke-width:2px;}.cls-3,.cls-4{stroke-linecap:round;}.cls-3{stroke-width:3px;}</style></defs><title>anchorai</title><path class="cls-1" d="M11.75,14.5" transform="translate(-3.75 -0.5)"/><path class="cls-1" d="M11.75,14.5" transform="translate(-3.75 -0.5)"/><path class="cls-1" d="M11.75,18.5" transform="translate(-3.75 -0.5)"/><path class="cls-1" d="M11.75,21.5" transform="translate(-3.75 -0.5)"/><path class="cls-1" d="M11.75,18.5" transform="translate(-3.75 -0.5)"/><path class="cls-1" d="M11.75,21.5" transform="translate(-3.75 -0.5)"/><path class="cls-1" d="M11.75,21.5" transform="translate(-3.75 -0.5)"/><path class="cls-1" d="M11.75,18.5" transform="translate(-3.75 -0.5)"/><path class="cls-1" d="M11.75,18.5" transform="translate(-3.75 -0.5)"/><path class="cls-1" d="M11.75,21.5" transform="translate(-3.75 -0.5)"/><path class="cls-1" d="M11.75,21.5" transform="translate(-3.75 -0.5)"/><path class="cls-1" d="M11.75,18.5" transform="translate(-3.75 -0.5)"/><path class="cls-1" d="M11.75,18.5" transform="translate(-3.75 -0.5)"/><path class="cls-1" d="M11.75,21.5" transform="translate(-3.75 -0.5)"/><path class="cls-1" d="M11.75,21.5" transform="translate(-3.75 -0.5)"/><path class="cls-1" d="M11.75,19.5" transform="translate(-3.75 -0.5)"/><path class="cls-1" d="M11.75,19.5" transform="translate(-3.75 -0.5)"/><path class="cls-1" d="M23.5,21.5" transform="translate(-3.75 -0.5)"/><circle class="cls-2" cx="8" cy="3.5" r="2.5"/><line class="cls-3" x1="8" y1="21" x2="8" y2="7"/><path class="cls-4" d="M11.75,18" transform="translate(-3.75 -0.5)"/><path class="cls-4" d="M11.75,21" transform="translate(-3.75 -0.5)"/><path class="cls-4" d="M11.75,18" transform="translate(-3.75 -0.5)"/><path class="cls-3" d="M18.25,16c0,2.21-3.14,6-6.73,6s-6.27-3.79-6.27-6" transform="translate(-3.75 -0.5)"/><line class="cls-2" x1="4.5" y1="9" x2="11.5" y2="9"/></svg>';
        //console.log(this.state.terminals)
        this.state.terminals.forEach(terminal => {
            let terminalLocation = new window.Microsoft.Maps.Location(
                terminal.geometry.coordinates[1],
                terminal.geometry.coordinates[0]
            );

            //let pin = [];
            let terminalPin = new window.Microsoft.Maps.Pushpin(terminalLocation, {
                title: terminal.properties.title,
                id: terminal.properties.title,
                icon: terminalIcon,
                visible: true,
                anchor: new window.Microsoft.Maps.Point(0, 10)
            });
            terminalPin.metadata = {
                id: terminal.properties.title,
                title: terminal.properties.title
            };
            terminalPin.setOptions({ visible: true });
            //this.setState({ pins, pin });
            var infobox = new window.Microsoft.Maps.Infobox(terminalLocation, {
                maxHeight: 350,
                minHeight: 300,
                maxWidth: 450,
                title: terminal.properties.title,
                description:
                    "<strong>" +
                    "Address: " +
                    "</strong>" +
                    "<br>" +
                    terminal.properties.address +
                    "<br>" +
                    "<strong>" +
                    "Phone Number: " +
                    "</strong>" +
                    "<br>" +
                    terminal.properties.phone,
                showCloseButton: false,
                autoAlignment: true,
                visible: false,
                actions: [
                    {
                        label: "More",
                        eventHandler: function () {

                        }
                    },
                    {
                        label: "Close",
                        eventHandler: function () {
                            map.setView({ zoom: 9 });
                            infobox.setOptions({ visible: false });
                        }
                    }
                ]
            });
            infobox.setMap(this.state.map);

            window.Microsoft.Maps.Events.addHandler(terminalPin, "click", function () {
                map.setView({ center: terminalLocation, zoom: 15 });
                infobox.setOptions({ visible: true });
            });
            // this.state.terminalPins.push(terminalPin);
            this.state.map.entities.push(terminalPin);
        });
        this.setState({ terminalPins });
        //console.log(this.state.map.entities);
    }



    render() {
        const viewLinks = this.state.views.map(view => (
            <ViewLinks
                key={view.properties.id}
                id={view.properties.id}
                title={view.properties.title}
                coordinates={view.geometry.coordinates}
                zoom={view.properties.zoom}

                onClick={this.onClickHandler}
            />
        ))
        return (
            <div id="mapHolder">
                <div id="mapTable">
                    {/* <h3><a href="#" className="test" onClick={this.loadView}>link</a></h3> */}
                    {viewLinks}
                </div>
                <div id="map" className="map">

                </div>
            </div>

        )
    }
}
//this function has to be outside of component
function loadScript(url) {
    var index = window.document.getElementsByTagName("script")[0];
    var script = window.document.createElement("script");
    script.src = url;
    script.async = true;
    script.defer = true;
    index.parentNode.insertBefore(script, index);
}
export default Map