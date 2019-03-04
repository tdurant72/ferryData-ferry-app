import React, { Component } from "react";
import './Map.css'
import views from '../data/views'
import ViewLinks from './ViewLinks'
import Pin from './Pin'
import Boat from './Boat';
import Table from './Table'
const API_KEY = "80e61cf4-541b-4651-8228-6376d80567f7";


class Map extends Component {
    state = {
        map: null,
        ferries: [],
        selectedView: [],
        VesselIDs: [],
        //terminals: [],
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
        timeStamp: null,
    }


    /* init*/
    componentDidMount = async () => {
        this.setState(() => ({ views: views, ferries: this.props.data.ncferries, terminals: this.props.data.terminals, filteredTerminals: this.props.data.terminals, timeStamp: this.props.data.timeStamp, filteredFerries: this.props.data.ncferries }))

        this.renderMap()
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
        }
    }

    /* render data */
    renderMap = async () => {
        loadScript(
            "https://www.bing.com/api/maps/mapcontrol?key=AsYvNI-GHrtArcRybTU256h6zvO5I3G9zzdC0kFwiXkdoA81Ux9RRPSjxm_o_Aqi&callback=loadMapScenario"
        );
        window.loadMapScenario = this.loadMapScenario;
    };
    loadMapScenario = async () => {
        let lat = this.state.views[0].geometry.coordinates[0];
        let lng = this.state.views[0].geometry.coordinates[1];


        const map = new window.Microsoft.Maps.Map
            (document.getElementById("map"), {
                center: new window.Microsoft.Maps.Location(lat, lng),
                mapTypeId: window.Microsoft.Maps.MapTypeId.road,
                zoom: this.props.data.views[0].properties.zoom
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
        //console.log(center)
        this.state.map.setView({
            center: new window.Microsoft.Maps.Location(updatedView.geometry.coordinates[0], updatedView.geometry.coordinates[1]),
            zoom: updatedView.properties.zoom
        })
    }

    //Change map view based on table link
    onClickTableView = (props) => {
        let updatedView = props;

        this.state.map.setView({
            center: new window.Microsoft.Maps.Location(updatedView.Latitude, updatedView.Longitude),
            zoom: updatedView.speed === "0 knots" ? 16 : 12
        })
    }

    //render terminal and ferry pins
    renderTerminalPin = (Latitude, Longitude, terminalName, terminalIcon, terminalPin, terminalLocation, terminalDescription) => {

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

    renderBoatPin = (boatId, COG, Latitude, Longitude, VesselName, SOG, boatIcon, boatPin, boatLocation, summary, time) => {
        this.setState({ boatPins: [...this.state.boatPins, boatPin] })
        this.state.ferryLayer.add(boatPin)
        this.state.map.entities.push(boatPin);
        //console.log("renderBoatPin called")
        let boatInfobox = new window.Microsoft.Maps.Infobox(boatLocation, {
            visible: false
        })

        boatInfobox.setMap(this.state.map)
        window.Microsoft.Maps.Events.addHandler(boatPin, "click", function () {
            boatInfobox.setOptions({
                visible: true,
                title: VesselName,
                description: summary
            })
        })
    }
    componentDidUpdate() {

        render() {
            return (
                <div id="map-content">

                    <div id="mapHolder">

                        <div id="mapTable">
                            <div id="views">
                                <h4>Terminal Area Views</h4>
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

                            <div id="legend">
                                <h4>Legend</h4>
                                <div id="legend-body">
                                    <p>Terminal / Dock</p>
                                    <img src={require('./images/terminal.png')} alt="terminal icon" />
                                    <p>Ferry Underway</p>
                                    <img src={require('./images/ferry-icon.png')} alt="ferry icon" />
                                    <p>Ferry Docked</p>
                                    <img src={require('./images/docked.png')} alt="dock icon" />
                                </div>
                            </div>
                        </div>
                        <div id="map" className="map" map={this.state.map}>
                            {this.state.terminals.map((terminal, index) => {
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

                            {this.state.ferries.map((ferry) => (
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
                                    time={ferry.properties.Time}
                                    timeStamp={`${this.state.timeStamp}`}
                                    renderBoatPin={this.renderBoatPin}
                                />
                            )
                            )}
                        </div>

                    </div>
                    <div className="FerryTable">
                        <table className="display" width="100%" id="t01" >
                            <thead>
                                <tr>
                                    <th>Ferry Name</th>
                                    <th>Speed</th>
                                    <th>Status</th>
                                    <th>As of:</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.ferries.map((boat) => (
                                    <Table
                                        key={boat.id}
                                        title={boat.properties["Vessel Name"]}
                                        Latitude={`${boat.properties.Latitude}`}
                                        Longitude={`${boat.properties.Longitude}`}
                                        speed={boat.properties.SOG}
                                        time={boat.properties.Time}
                                        onClickTableView={this.onClickTableView}
                                    />
                                )
                                )}

                            </tbody>
                        </table>
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