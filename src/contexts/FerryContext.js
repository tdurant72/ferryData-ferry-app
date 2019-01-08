import React from "react"
import axios from 'axios'

export const FerryContext = React.createContext();

export class FerryProvider extends React.Component {
    state = {
        ferries: [],
        ncferries: [],
        VesselIDs: [],
        pins: [],
        ncPins: [],
        ncPinData: [],
        filterPin: this.props.pins,
        ferryData: null,
        filteredFerries: [],
        filtered: false,
        ferryLocations: [],
        map: null,
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
                this.renderNCferryPins()
            })

            .catch(error => {
                console.log(error);
            });
    };

    /*
        renderNCferryPins() {
    
    
            // this.state.map.entities.clear()
    
            const boatIcon =
                '<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="20" height="20" viewBox="0 0 24 24"><path d="M6,6H18V9.96L12,8L6,9.96M3.94,19H4C5.6,19 7,18.12 8,17C9,18.12 10.4,19 12,19C13.6,19 15,18.12 16,17C17,18.12 18.4,19 20,19H20.05L21.95,12.31C22.03,12.06 22,11.78 21.89,11.54C21.76,11.3 21.55,11.12 21.29,11.04L20,10.62V6C20,4.89 19.1,4 18,4H15V1H9V4H6A2,2 0 0,0 4,6V10.62L2.71,11.04C2.45,11.12 2.24,11.3 2.11,11.54C2,11.78 1.97,12.06 2.05,12.31M20,21C18.61,21 17.22,20.53 16,19.67C13.56,21.38 10.44,21.38 8,19.67C6.78,20.53 5.39,21 4,21H2V23H4C5.37,23 6.74,22.65 8,22C10.5,23.3 13.5,23.3 16,22C17.26,22.65 18.62,23 20,23H22V21H20Z" /></svg>';
    
            {
                this.state.ncferries.map(ncferry => {
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
    
                        this.state.map.setView({ center: pinNCLocation, zoom: 12 });
                        infobox.setOptions({ visible: true });
                    });
    
                    window.Microsoft.Maps.Events.addHandler(infobox, 'click', function () {
                        this.state.map.setView({ center: this.map.center, zoom: 8 });
    
                    });
    
                    this.setState({ ncPinData: [...this.state.ncPinData, ncPin] });
    
                    this.state.map.entities.push(ncPin);
                })
            }
            this.setState({
                map: this.state.map,
                ncPins: this.state.ncPins,
                ncferries: this.state.ncferries
            })
        }
    */


    // filterFerries(search) {
    //     //let pin = this.state.pin;
    //     let filter = search
    //         ? ncferries.filter(f =>
    //             f.properties['Vessel Name'].toLowerCase().includes(search)
    //         )
    //         : ncferries;
    //     ncPinData.forEach(p => {
    //         p.metadata.title.toLowerCase().includes(search)
    //             ? p.setOptions({ visible: true })
    //             : p.setOptions({ visible: false });
    //         //console.log(this.state.map.entities);
    //     });

    //     this.setState({ filtered: this.ncferries, search: search });
    // }



    render() {
        return (
            <FerryContext.Provider
                value={{
                    ...this.state,
                    getNCFerries: this.getNCFerries,
                    // renderNCferryPins: this.renderNCferryPins,
                    // filterFerries: this.filterFerries,
                }}
            >
                {this.props.children}
            </FerryContext.Provider>
        )
    }
}