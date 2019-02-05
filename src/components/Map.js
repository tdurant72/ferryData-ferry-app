import React, { Component } from "react";
import './Map.css'
import axios from "axios";
// import ports from '../data/ports'
import views from '../data/views'
import ViewLinks from './ViewLinks'
import Terminals from "./Terminals";
//import Ferries from './Ferries'
import Pin from './Pin'
import Ferry from "./Ferry";
import Boat from './Boat';
const API_KEY = "80e61cf4-541b-4651-8228-6376d80567f7";
const Microsoft = window.Microsoft;

//let terminalLocation;
// let pin = new window.Microsoft.Maps.Pushpin(terminalLocation);
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
            filteredFerries: [],
            views: [],
            newView: [],
            layer: null,
        }
        this.boatPins = [];
        this.terminalPins = [];
        this.renderTerminalPin = this.renderTerminalPin.bind(this)
        //this.renderFerryPin = this.renderFerryPin.bind(this)
        this.renderNCferryPins = this.renderNCferryPins.bind(this)
        this.onChangeMarker = this.onChangeMarker.bind(this)
    }

    /* init*/
    componentDidMount = async () => {
        this.setState(() => ({ views: views, ferries: this.props.data.ncferries, terminals: this.props.data.terminals }))

        this.renderMap()
        // this.getNCFerries()

        //this.setState({ terminals: ports, terminalPins: ports, views: views })


        // this.getAllTerminals().then(this.setTerminals)

        //console.log("map rendered", this.props.data.ncferries)

    };
    componentDidUpdate(prevProps, prevState) {
        if (this.props.data.ncferries !== this.state.ferries) {

            this.setState(() => ({ ferries: this.props.data.ncferries }))
            // this.renderNCferryPins();

            console.log(this.state.map.layers)

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
        if (this.state.map !== null) {

        }

        let infobox = new window.Microsoft.Maps.Infobox
        let terminalLocation = new window.Microsoft.Maps.Location(lat, lng);
        let terminalPushpin = new window.Microsoft.Maps.Pushpin(lat, lng)
        var layer = new window.Microsoft.Maps.Layer();
        let anchor = new window.Microsoft.Maps.Point(0, 0);
        let ferryLayer = new window.Microsoft.Maps.Layer();
        let terminalLayer = new window.Microsoft.Maps.Layer();
        this.setState(() => ({ map, terminalPushpin, terminalLocation, anchor, layer, ferryLayer, terminalLayer }));
        this.state.map.layers.insert(this.state.ferryLayer);
        this.state.map.layers.insert(this.state.terminalLayer);


    };
    loadRecuringData = async () => {
        let lat = this.state.views[0].geometry.coordinates[0];
        let lng = this.state.views[0].geometry.coordinates[1];
        let infobox = new window.Microsoft.Maps.Infobox
        let terminalLocation = new window.Microsoft.Maps.Location(lat, lng);
        let terminalPushpin = new window.Microsoft.Maps.Pushpin(lat, lng)
        var layer = new window.Microsoft.Maps.Layer();
        let anchor = new window.Microsoft.Maps.Point(0, 0);
        let ferryLayer = new window.Microsoft.Maps.Layer();
        let terminalLayer = new window.Microsoft.Maps.Layer();
        this.setState(() => ({ terminalPushpin, terminalLocation, anchor, layer, ferryLayer, terminalLayer }));
        this.state.map.layers.insert(this.state.ferryLayer);
        this.state.map.layers.insert(this.state.terminalLayer);
    }

    //Change map view
    onClickView = (props) => {
        let updatedView = props;

        let lat = updatedView.geometry.coordinates[0];
        let lng = updatedView.geometry.coordinates[1];
        let center = lat + "," + lng;
        //console.log(center)
        this.state.map.setView({
            center: new window.Microsoft.Maps.Location(updatedView.geometry.coordinates[0], updatedView.geometry.coordinates[1]),
            zoom: updatedView.properties.zoom
        })
    }


    renderNCferryPins(props) {
        this.setState(() => ({ ncferries: this.props.data.ncferries }))
        let map = this.state.map;

        this.props.data.ncferries.forEach(ncferry => {

            let pinNCLocation = new window.Microsoft.Maps.Location(
                ncferry.properties.Latitude,
                ncferry.properties.Longitude
            );
            let bearing = parseInt(ncferry.properties.COG, 10);
            const boatIcon =
                '<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg id="ncferry" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg"  width="19" height="19" viewBox="0 0 12 22.38" transform="rotate(' + bearing + ')"><defs><style>.cls-1{fill:#eaeaea;}.cls-2{fill:#002445;}.cls-3{fill:#004544;stroke:#002445;stroke-miterlimit:10;}</style></defs><title>ferry</title><path class="cls-1" d="M12.21,18.76,12,18.9l-.21-.14L7,21V6.69a2.69,2.69,0,0,1,1-2l4-3.48,4,3.48a2.69,2.69,0,0,1,1,2V21Z" transform="translate(-6 -0.05)"/><path class="cls-2" d="M12,2.51l3.39,2.92A1.68,1.68,0,0,1,16,6.69V19.4l-2.85-1.31-1-.48-.11.08-.11-.08-1,.48L8,19.4V6.69a1.68,1.68,0,0,1,.61-1.26L12,2.51M12,.05a.53.53,0,0,0-.36.13L7.31,3.92A3.63,3.63,0,0,0,6,6.69V22.05a.47.47,0,0,0,.21.38l5.48-2.53a.53.53,0,0,0,.62,0l5.48,2.53a.47.47,0,0,0,.21-.38V6.69a3.63,3.63,0,0,0-1.31-2.77L12.36.18A.53.53,0,0,0,12,.05Z" transform="translate(-6 -0.05)"/><path class="cls-3" d="M12,23.89" transform="translate(-6 -0.05)"/></svg>';

            //let pin = [];
            let ncPin = new window.Microsoft.Maps.Pushpin(pinNCLocation, {
                title: ncferry.properties['Vessel Name'],
                id: ncferry.properties['Vessel Name'],
                icon: boatIcon,
                typeName: 'ncferry-pin',
                anchor: new window.Microsoft.Maps.Point(8, 8)
            });


            let boat = document.getElementsByClassName("ncferry-pin")
            // ncPin.style.transform = "rotate('+bearing+')"

            //console.log(boatIcon);
            ncPin.metadata = {
                id: ncferry.properties['Vessel Name'],
                title: ncferry.properties['Vessel Name']
            };
            ncPin.setOptions({
                visible: true,
                title: ncferry.properties['Vessel Name'],
                id: ncferry.properties['Vessel Name'],
                typeName: 'ncferry',
            });


            //this.setState({ pins, pin });
            let title = ncferry.properties['Vessel Name'];
            let description = "<strong>" +
                "Current Latitude: " +
                "</strong>" +
                "<br>" +
                ncferry.properties.Latitude +
                "<br>" +
                "<strong>" +
                "Current Longitude: " +
                "</strong>" +
                "<br>" +
                ncferry.properties.Longitude +
                "<br>" +
                "<strong>" +
                "Bearing: " +
                "</strong>" +
                "<br>" +
                ncferry.properties.COG;
            ncPin.setOptions({ visible: true });
            //this.setState({ pins, pin });
            var infoboxTemplate = `<div id="infoboxText" style="background-color:White; border-style:solid; border-width:medium; border-color:#2c3e50; min-height:115px; height:150px; width: 240px; border-radius:7px;line-height: 1.2;">
            <b id="infoboxTitle" style="position: absolute; top: 10px; left: 10px; width: 220px; ">{title}</b>
            <p id="infoboxDescription" style="position: absolute; top: 30px; left: 10px; width: 220px;color:#2c3e50 ">{description}</p></div>`;
            var infobox = new window.Microsoft.Maps.Infobox(pinNCLocation, {
                htmlContent: infoboxTemplate.replace('{title}', title).replace('{description}', description),

                showCloseButton: true,
                offset: new window.Microsoft.Maps.Point(-110, 18),
                visible: false,
            });
            infobox.setMap(this.state.map);

            window.Microsoft.Maps.Events.addHandler(ncPin, "click", function () {

                map.setView({ center: pinNCLocation, zoom: 12 });
                infobox.setOptions({ visible: true });
            });

            window.Microsoft.Maps.Events.addHandler(map, "click", function () {
                infobox.setOptions({ visible: false });
            });

            window.Microsoft.Maps.Events.addHandler(infobox, 'click', function () {
                map.setView({ center: this.map.center, zoom: 8 });

            });
            //this.state.ncPinData.push(ncPin);
            this.setState({ ncPinData: [...this.state.ncPinData, ncPin] });
            //this.state.ncPinData.shift();
            //this.removeItem()

            let ferryLayer = new window.Microsoft.Maps.Layer();
            this.state.ferryLayer.add(this.state.ncPinData)
            // this.state.map.entities.push(ncPin);

            this.state.map.layers.insert(ferryLayer);
            //console.log(this.state.map.layers)

        });

        //this.renderTerminals();
    }

    //render terminal and ferry pins
    renderFerryPin(COG, Latitude, Longitude, VesselName, SOG, boatIcon) {

        //console.log(Longitude)

        let pinFLocation = new window.Microsoft.Maps.Location(Latitude, Longitude);
        let fPin = new window.Microsoft.Maps.Pushpin(pinFLocation, {
            title: VesselName,
            id: VesselName,
            icon: boatIcon,
            visible: true,
            typeName: 'ncferry',
            anchor: new window.Microsoft.Maps.Point(0, 0)
        });
        fPin.metadata = {
            id: VesselName,
            title: VesselName
        };
        this.setState({ ferries: [...this.state.ferries, fPin] })


        // let ferryLayer = new window.Microsoft.Maps.Layer();
        this.state.ferryLayer.add(this.state.ferries)
        //this.state.map.layers.ferryLayer.clear()

        //console.log(fPin.metadata.id)
        //this.state.map.entities.push(fPin);
        // this.setState(() => ({
        //     map: this.statemap.entities.concat([fPin])
        // }))

        // this.state.map.layers.insert(ferryLayer);
        //console.log(ferryLayer)
        // console.log(this.state.map.layers)

    }

    renderTerminalPin(terminalLocation, terminalName, terminalIcon, infoboxTemplate, terminalDescription) {
        //console.log(terminalLocation, terminalName, )

        let pinTLocation = new window.Microsoft.Maps.Location(terminalLocation[1], terminalLocation[0]);
        let tPin = new window.Microsoft.Maps.Pushpin(pinTLocation, {
            title: terminalName,
            id: terminalName,
            icon: terminalIcon,
            visible: true,
            typeName: 'ncterminal',
            anchor: new window.Microsoft.Maps.Point(9, 9)
        });
        tPin.metadata = {
            id: terminalName,
            title: terminalName
        };
        let infobox = new window.Microsoft.Maps.Infobox(pinTLocation, {
            htmlContent: infoboxTemplate.replace('{title}', terminalName).replace('{description}', terminalDescription),

            showCloseButton: true,
            offset: new window.Microsoft.Maps.Point(-110, 25),
            visible: false,
        });
        infobox.setMap(this.state.map);
        window.Microsoft.Maps.Events.addHandler(tPin, "click", function () {
            //this.state.map.setView({ center: pinTLocation, zoom: 10 });
            infobox.setOptions({ visible: true });
            console.log('terminal clicked', infobox)
        });
        window.Microsoft.Maps.Events.addHandler(this.state.map, "click", function () {
            infobox.setOptions({ visible: false });
        });
        let terminalLayer = new window.Microsoft.Maps.Layer();

        this.terminalPins.push(tPin)

        // this.setState(() => ({ terminalLayer: this.terminalPins }))
        // this.state.map.layers.insert(terminalLayer)

        //terminalLayer.add(tPin)
        //this.state.map.entities.push(fPin);
        //this.state.map.layers.clear(terminalLayer)
        //this.state.map.layers.insert(terminalLayer);
        this.state.map.entities.push(tPin);
    }

    onChangeMarker(COG, Latitude, Longitude, VesselName, SOG, boatIcon, boatPin) {
        let ferryLayer = new window.Microsoft.Maps.Layer();
        // this.setState({ ferries: [...this.state.ferries, boatPin] })
        // this.state.ferryLayer.add(this.state.ferries)
        // 
        //console.log(this.state.map.layers)
        let currentPrimitives = ferryLayer.getPrimitives();

        for (var i = 0; i < currentPrimitives.length; i++) {
            var entity = currentPrimitives[i];
            if (entity instanceof window.Microsoft.Maps.Pushpin) {
                ferryLayer.clear(entity);
            }
        }
        console.log(currentPrimitives)
        //
        this.state.map.layers.clear(currentPrimitives)
        this.boatPins.push(boatPin);
        ferryLayer.add(this.boatPins)

        this.state.map.layers.insert(ferryLayer)
        // this.setState(() => ({ ferryLayer: this.boatPins }))
        // this.state.map.layers.insert(ferryLayer);
        //this.state.map.entities.push(boatPin);

    }

    render() {
        return (
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
                    {this.state.terminals.map((terminal, index) => {
                        return (
                            <Pin
                                key={index}
                                map={this.state.map}
                                terminalName={terminal.properties.title}
                                terminalAddress={terminal.properties.address}
                                terminalPhone={terminal.properties.phone}
                                handleTerminalPinUpdate={this.handleTerminalPinUpdate}
                                terminalLocation={terminal.geometry.coordinates}
                                renderPins={this.renderPins}
                                triggerPinUpdate={this.renderTerminalPin}
                            />
                        )
                    })}

                    {this.state.ferries.map((ferry) => {
                        return (
                            <Boat
                                key={ferry.properties['Vessel Name']}
                                map={this.state.map}
                                COG={ferry.properties.COG}
                                Latitude={ferry.properties.Latitude}
                                Longitude={ferry.properties.Longitude}
                                VesselName={ferry.properties['Vessel Name']}
                                SOG={ferry.properties.SOG}
                                onChangeMarker={this.onChangeMarker}
                            />
                        )
                    })}
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