import React, { Component } from 'react';


class Terminals extends React.Component {
    state = { terminals: [] }
    componentDidMount() {
        this.renderterminals()
    }

    renderTerminals() {
        let map = this.state.map;
        let terminals = this.state.terminals;
        // const pins = this.state.pins;

        var terminalIcon =
            '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/></svg>';

        this.state.terminals.forEach(terminal => {
            let terminalLocation = new window.Microsoft.Maps.Location(
                terminal.item.lat,
                terminal.item.long
            );
            //let pin = [];
            let terminalPin = new window.Microsoft.Maps.Pushpin(terminalLocation, {
                title: terminal.item.title,
                id: terminal.item.title,
                icon: terminalIcon,
                visible: true,
                anchor: new window.Microsoft.Maps.Point(0, 10)
            });
            terminalPin.metadata = {
                id: terminal.item.title,
                title: terminal.item.title
            };
            terminalPin.setOptions({ visible: true });
            //this.setState({ pins, pin });
            var infobox = new window.Microsoft.Maps.Infobox(terminalLocation, {
                maxHeight: 350,
                minHeight: 300,
                maxWidth: 450,
                title: terminal.item.title,
                description: terminal.item.description,
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
                    }
                ]
            });
            infobox.setMap(this.state.map);

            window.Microsoft.Maps.Events.addHandler(terminalPin, "click", function () {
                console.log(infobox);
                map.setView({ center: terminalLocation, zoom: 15 });
                infobox.setOptions({ visible: true });
            });
            //   this.state.pinData.push(pin);
            this.state.map.entities.push(terminalPin);
        });
        this.setState({ terminals });

    }
}
export default Terminals