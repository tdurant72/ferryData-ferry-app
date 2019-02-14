import React, { Component } from "react";
import './Map.css'

import views from '../data/views'
import ViewLinks from './ViewLinks'


import Pin from './Pin'
import Ferry from "./Ferry";
import Boat from './Boat';
const API_KEY = "80e61cf4-541b-4651-8228-6376d80567f7";


class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            map: null,
            ferries: [],
            selectedView: [],
            VesselIDs: [],
            terminals: [],
            terminalLocation: null,
            terminalPushpin: null,
            anchor: null,
            infobox: null,
            terminalPinData: [],
            ncPinData: [],
            ferryLayer: null,
            terminalLayer: null,
            filteredTerminals: [],
            filteredFerries: [],
            filterString: '',
            search: "",
            views: [],
            newView: [],
            layer: null,
            renderFinished: false,
            boatPins: [],
            terminalPins: [],
            timeStamp: null
        }
        //this.boatPins = [];
        this.terminalPins = [];
        this.renderTerminalPin = this.renderTerminalPin.bind(this)
        this.onChangeMarker = this.onChangeMarker.bind(this)
        this.onTextChange = this.onTextChange.bind(this)
    }

    /* init*/
    componentDidMount = async () => {
        this.setState(() => ({ views: views, ferries: this.props.data.ncferries, terminals: this.props.data.terminals, filteredTerminals: this.props.data.terminals, timeStamp: this.props.data.timeStamp, filteredFerries: this.props.data.ncferries }))

        this.renderMap()
        console.log(this.state.filteredFerries)
        console.log(this.state.ferries)

    };
    componentDidUpdate(prevProps, prevState) {
        if (this.props.data.ncferries !== this.state.ferries) {
            this.state.map.entities.clear()
            this.state.map.layers.clear()
            this.setState(() => ({
                ferries: this.props.data.ncferries,
                timeStamp: this.props.data.timeStamp
            }))
            this.state.map.layers.insert(this.state.terminalLayer)
            //console.log(this.state.terminalLayer.getId())
            console.log(this.state.filteredFerries)
        }

    }

    /* render data */
    renderMap = () => {
        loadScript(
            "https://www.bing.com/api/maps/mapcontrol?key=AsYvNI-GHrtArcRybTU256h6zvO5I3G9zzdC0kFwiXkdoA81Ux9RRPSjxm_o_Aqi&callback=loadMapScenario"
        );
        window.loadMapScenario = this.loadMapScenario;
    };
    loadMapScenario = async () => {
        let lat = this.state.views[0].geometry.coordinates[0];
        let lng = this.state.views[0].geometry.coordinates[1];
        let center = lat + lng;

        const map = new window.Microsoft.Maps.Map
            (document.getElementById("map"), {
                center: new window.Microsoft.Maps.Location(lat, lng),
                mapTypeId: window.Microsoft.Maps.MapTypeId.road,
                zoom: this.state.views[0].properties.zoom
            });


        let terminalPushpin = new window.Microsoft.Maps.Pushpin(lat, lng)
        var layer = new window.Microsoft.Maps.Layer();
        let anchor = new window.Microsoft.Maps.Point(0, 0);
        let ferryLayer = new window.Microsoft.Maps.Layer();
        let terminalLayer = new window.Microsoft.Maps.Layer();
        terminalLayer.metadata = { id: "terminalLayer" }

        this.setState(() => ({ map, terminalPushpin, anchor, layer, ferryLayer, terminalLayer }));

    };


    //Change map view
    onClickView = (props) => {
        let updatedView = props;

        let lat = updatedView.geometry.coordinates[0];
        let lng = updatedView.geometry.coordinates[1];

        //console.log(center)
        this.state.map.setView({
            center: new window.Microsoft.Maps.Location(updatedView.geometry.coordinates[0], updatedView.geometry.coordinates[1]),
            zoom: updatedView.properties.zoom
        })
    }



    //render terminal and ferry pins


    renderTerminalPin(Latitude, Longitude, terminalName, terminalIcon, terminalPin, terminalLocation, terminalDescription) {

        this.state.terminalLayer.add(terminalPin)
        this.state.map.entities.push(terminalPin);

        let infoboxTemplate = `<div id="infoboxText" style="background-color:White; border-style:solid; border-width:medium; border-color:#2c3e50; min-height:145px; width: 240px; border-radius:7px;line-height: 1.2;">
    <b id="infoboxTitle" style="position: absolute; top: 10px; left: 10px; width: 220px; ">{title}</b>
    <p id="infoboxDescription" style="position: absolute; top: 45px; left: 10px; width: 220px;color:#2c3e50 ">{description}</p></div>`;

        let infobox = new window.Microsoft.Maps.Infobox(terminalLocation, {
            htmlContent: infoboxTemplate.replace('{title}', terminalName).replace('{description}', terminalDescription),

            showCloseButton: true,
            offset: new window.Microsoft.Maps.Point(-110, 30),
            visible: false,
        });
        infobox.setMap(this.state.map);
        window.Microsoft.Maps.Events.addHandler(terminalPin, "click", function () {
            infobox.setOptions({ visible: true });
        });

        window.Microsoft.Maps.Events.addHandler(this.state.map, "click", function () {
            infobox.setOptions({ visible: false });
        });

    }

    onChangeMarker(boatId, COG, Latitude, Longitude, VesselName, SOG, boatIcon, boatPin, boatLocation, summary) {
        this.setState({ boatPins: [...this.state.boatPins, boatPin] })
        this.state.ferryLayer.add(boatPin)
        this.state.map.entities.push(boatPin);
        //console.log("onChangeMarker called")
        let infobox = new window.Microsoft.Maps.Infobox(boatLocation, {
            visible: false
        })

        infobox.setMap(this.state.map)

        window.Microsoft.Maps.Events.addHandler(boatPin, "click", function () {
            infobox.setOptions({
                visible: true,
                title: VesselName,
                description: summary
            })
        })
    }


    onTextChange(event) {
        this.setState(() => ({ filterString: event }));

        let ferryFilter = this.state.filteredFerries
            ? this.state.filteredFerries.filter((ferry) => {
                let ferryName = ferry.properties['Vessel Name'].toLowerCase()
                return ferryName.indexOf(
                    ferryName.toLowerCase()) !== -1
            }) : this.state.ferries;
        let terminalFilter = this.state.filteredTerminals
            ? this.state.filteredTerminals.filter((terminal) => {
                let terminalName = terminal.properties.title.toLowerCase()
                return terminalName.indexOf(
                    terminalName.toLowerCase()) !== -1
            }) : this.state.terminals;
        this.state.map.entities._primitives.forEach(p => {
            console.log(this.state.map.entities._primitives)
            p.metadata.title.toLowerCase().includes(this.state.filterString)
                ? p.setOptions({ visible: true, })
                : p.setOptions({ visible: false })
        })
    }

    render() {
        // let filteredFerries = this.state.ferries.filter(ferry => {
        //     return ferry.properties['Vessel Name'].toLowerCase().indexOf(this.state.search) !== -1;
        // });
        return (
            <div id="map-content">
                <div id="search-area">
                    <h4>Search for Ferry or Terminal</h4>
                    <input
                        type="text"
                        placeholder="Type in name..."
                        value={this.state.filterString}
                        // onChange={e => {
                        //     this.filterFerries(e.target.value);
                        // }}
                        onChange={event => this.onTextChange(event.target.value)}
                    />
                </div>

                <div id="mapHolder">

                    <div id="mapTable">

                        <h4>Ferry Watch Views</h4>
                        {this.state.views.map((view, index) => {
                            return (
                                <ViewLinks
                                    key={view.properties.id}
                                    index={view.properties.id}

                                    {...view}
                                    onClickView={this.onClickView.bind(this, view)}
                                />
                            )
                        })}
                    </div>
                    <div id="map" className="map" map={this.state.map}>
                        {this.state.filteredTerminals
                            .filter(terminal => terminal.properties.title.toLowerCase().includes(this.state.filterString.toLowerCase()))
                            .map((terminal, index) => {
                                return (
                                    <Pin
                                        key={index}
                                        map={this.state.map}
                                        terminalName={terminal.properties.title}
                                        terminalAddress={terminal.properties.address}
                                        terminalPhone={terminal.properties.phone}
                                        Latitude={`${terminal.geometry.coordinates[1]}`}
                                        Longitude={`${terminal.geometry.coordinates[0]}`}
                                        renderTerminalPin={this.renderTerminalPin}
                                        siteLink={terminal.properties.Site}
                                    />
                                )
                            })}

                        {this.state.filteredFerries
                            .filter(ferry => ferry.properties['Vessel Name'].toLowerCase().includes(this.state.filterString.toLowerCase()))
                            .map((ferry) =>
                                (
                                    <Boat
                                        key={ferry.properties['Vessel Name']}
                                        map={this.state.map}
                                        boatId={ferry.id}
                                        COG={ferry.properties.COG}
                                        Latitude={ferry.properties.Latitude}
                                        Longitude={ferry.properties.Longitude}
                                        VesselName={ferry.properties['Vessel Name']}
                                        summary={ferry.properties.summary}
                                        SOG={ferry.properties.SOG}
                                        timeStamp={`${this.state.timeStamp}`}
                                        onChangeMarker={this.onChangeMarker}
                                    />

                                )
                            )}
                    </div>
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