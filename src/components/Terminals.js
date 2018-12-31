import React, { Component } from 'react';
import ports from '../data/ports'

class Terminals extends React.Component {
    state = {
        terminals: [],
        terminalPins: [],
    }

    getAllTerminals = () => {
        fetch("/data/ports.json")
            .then((res) => res.json())
            .then((data) => {
                //console.log(data);
                this.setState({ terminals: data })
            })
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

    componentDidMount() {
        this.getAllTerminals()
        this.renderterminals()
    }

}
export default Terminals