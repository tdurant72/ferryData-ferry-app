import React, { Component } from "react";

import axios from "axios";

const API_KEY = "80e61cf4-541b-4651-8228-6376d80567f7";

class MapComponent extends Component {
    state = {
        map: null
    }

    renderMap = () => {
        loadScript(
            "https://www.bing.com/api/maps/mapcontrol?key=AsYvNI-GHrtArcRybTU256h6zvO5I3G9zzdC0kFwiXkdoA81Ux9RRPSjxm_o_Aqi&callback=loadMapScenario"
        );
        window.loadMapScenario = this.loadMapScenario;
    };
    loadMapScenario = () => {
        const map = new window.Microsoft.Maps.Map(document.getElementById("map"), {
            //center: new window.Microsoft.Maps.Location(47.982295, -122.536867),
            center: new window.Microsoft.Maps.Location(34.879891, -76.871810),
            mapTypeId: window.Microsoft.Maps.MapTypeId.road,
            zoom: 8
        });
        this.setState({ map });

    };
    componentDidMount = async () => {
        this.renderMap()
    }

    renderNCferryPins() {
        let map = this.state.map;
        let ncPins = this.state.ncPins;
        // const pins = this.state.pins;
        //const filtered = this.state.filtered;
        this.state.map.entities.clear()
        //console.log(this.state.map.entities.data)
        const boatIcon =
            '<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="20" height="20" viewBox="0 0 24 24"><path d="M6,6H18V9.96L12,8L6,9.96M3.94,19H4C5.6,19 7,18.12 8,17C9,18.12 10.4,19 12,19C13.6,19 15,18.12 16,17C17,18.12 18.4,19 20,19H20.05L21.95,12.31C22.03,12.06 22,11.78 21.89,11.54C21.76,11.3 21.55,11.12 21.29,11.04L20,10.62V6C20,4.89 19.1,4 18,4H15V1H9V4H6A2,2 0 0,0 4,6V10.62L2.71,11.04C2.45,11.12 2.24,11.3 2.11,11.54C2,11.78 1.97,12.06 2.05,12.31M20,21C18.61,21 17.22,20.53 16,19.67C13.56,21.38 10.44,21.38 8,19.67C6.78,20.53 5.39,21 4,21H2V23H4C5.37,23 6.74,22.65 8,22C10.5,23.3 13.5,23.3 16,22C17.26,22.65 18.62,23 20,23H22V21H20Z" /></svg>';

        this.state.ncferries.forEach(ncferry => {
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
        this.setState({ ncPins });
        //this.state.ncPinData = this.state.ncPinData.splice(12, 25);

        // console.log(this.state.ncPinData);
        // if (this.state.filtered === true) {
        //   map.entities.clear();

        // }
        //this.removePinData()
        this.renderTerminals();
    }
    render() {

        const ncferries = this.props.ncferries;
        const terminals = this.props.terminals;

        // {props.ncferries.map((ncferry) =>
        //     <FerryPin 
        //         key={this.props.ncferry.properties['Vessel Name']}

        //     >
        //     <FerryInfoBox
        //         key={this.props.ncferry.properties['Vessel Name']}
        //     />
        //     </FerryPin>
        // )}
        return (
            <div id="map" className="map">

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
export default MapComponent