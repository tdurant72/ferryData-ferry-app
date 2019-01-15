import React, { Component } from 'react';
import ports from '../data/ports'


class Terminals extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            terminalPushpin: this.props.teriminalPushpin,
            terminalLocation: this.props.terminalLocation,
            map: null
        }
    }


    testFunctions(props) {
        //this.props.forEach
    }
    renderMaker(props) {
        // var terminal = Object.entries(this.props).map((value) => (value))



        setTimeout(() => {
            let terminalPushpin = this.props.terminalPushpin
            this.setState({ terminalPushpin: terminalPushpin });
            console.log(this.props.terminalPushpin)
        }, 2000)

        //console.log(this.props)

        // let terminalPin = this.props.map.Maps.Pushpin(this.props.terminalLocation, {
        //     title: this.props.properties.title,
        //     id: this.props.properties.title,
        //     //icon: terminalIcon,
        //     visible: true,
        //     anchor: this.props.anchor
        // });
        // console.log(this.props)
        //console.log(terminalPins, terminalLocation)
        //console.log(terminal[3][1].coordinates)
        //let coordinates = terminal[3][1].coordinates;
        //[3][1].coordinates
        //let terminalLocation = [coordinates[1], coordinates[0]];
    }
    setInitialData(props) {
        setTimeout(() => {
            let terminalPushpin = this.props.terminalPushpin
            this.setState({ terminalPushpin: terminalPushpin });
            console.log(this.props.terminalPushpin)
            this.renderTerminal()
        }, 2000)
    }
    renderTerminal(props) {

        let map = this.state.map;
        //let terminals = this.state.terminals;


        //let terminals = this.props;
        //this.setState({ terminals: this.props });
        //console.log(terminals)
        var terminalIcon =
            '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 23"><defs><style>.cls-1,.cls-2,.cls-3,.cls-4{fill:none;stroke-miterlimit:10;}.cls-1,.cls-4{stroke:#000;}.cls-2,.cls-3{stroke:#0071bc;}.cls-2,.cls-4{stroke-width:2px;}.cls-3,.cls-4{stroke-linecap:round;}.cls-3{stroke-width:3px;}</style></defs><title>anchorai</title><path class="cls-1" d="M11.75,14.5" transform="translate(-3.75 -0.5)"/><path class="cls-1" d="M11.75,14.5" transform="translate(-3.75 -0.5)"/><path class="cls-1" d="M11.75,18.5" transform="translate(-3.75 -0.5)"/><path class="cls-1" d="M11.75,21.5" transform="translate(-3.75 -0.5)"/><path class="cls-1" d="M11.75,18.5" transform="translate(-3.75 -0.5)"/><path class="cls-1" d="M11.75,21.5" transform="translate(-3.75 -0.5)"/><path class="cls-1" d="M11.75,21.5" transform="translate(-3.75 -0.5)"/><path class="cls-1" d="M11.75,18.5" transform="translate(-3.75 -0.5)"/><path class="cls-1" d="M11.75,18.5" transform="translate(-3.75 -0.5)"/><path class="cls-1" d="M11.75,21.5" transform="translate(-3.75 -0.5)"/><path class="cls-1" d="M11.75,21.5" transform="translate(-3.75 -0.5)"/><path class="cls-1" d="M11.75,18.5" transform="translate(-3.75 -0.5)"/><path class="cls-1" d="M11.75,18.5" transform="translate(-3.75 -0.5)"/><path class="cls-1" d="M11.75,21.5" transform="translate(-3.75 -0.5)"/><path class="cls-1" d="M11.75,21.5" transform="translate(-3.75 -0.5)"/><path class="cls-1" d="M11.75,19.5" transform="translate(-3.75 -0.5)"/><path class="cls-1" d="M11.75,19.5" transform="translate(-3.75 -0.5)"/><path class="cls-1" d="M23.5,21.5" transform="translate(-3.75 -0.5)"/><circle class="cls-2" cx="8" cy="3.5" r="2.5"/><line class="cls-3" x1="8" y1="21" x2="8" y2="7"/><path class="cls-4" d="M11.75,18" transform="translate(-3.75 -0.5)"/><path class="cls-4" d="M11.75,21" transform="translate(-3.75 -0.5)"/><path class="cls-4" d="M11.75,18" transform="translate(-3.75 -0.5)"/><path class="cls-3" d="M18.25,16c0,2.21-3.14,6-6.73,6s-6.27-3.79-6.27-6" transform="translate(-3.75 -0.5)"/><line class="cls-2" x1="4.5" y1="9" x2="11.5" y2="9"/></svg>';



        //this.props.terminals.map(terminal => {
        let teriminalPushpin = this.props.terminalPushpin;
        let lat = this.props.terminalLocation[0];
        let lng = this.props.terminalLocation[1];

        //console.log(teriminalPushpin)
        // this.props.teriminalPushpin(lat, lng, {
        //     title: this.props.properties.title,
        //     id: this.props.properties.title,
        //     icon: terminalIcon,
        //     visible: true,
        //     anchor: this.props.anchor
        // });
        teriminalPushpin.setOptions(lat, lng, {
            title: this.props.properties.title,
            id: this.props.properties.title,
            icon: terminalIcon,
            visible: true,
            anchor: this.props.anchor
        })
        teriminalPushpin.metadata = {
            id: this.props.properties.title,
            title: this.props.properties.title,
            icon: terminalIcon,
            visible: true,
            anchor: this.props.anchor
        };
        // teriminalPushpin.setOptions({ visible: true });
        //this.setState({ pins, pin });
        // var infobox = this.props.Infobox(lat, lng, {
        //     maxHeight: 350,
        //     minHeight: 300,
        //     maxWidth: 450,
        //     title: this.props.properties.title,
        //     description:
        //         "<strong>" +
        //         "Address: " +
        //         "</strong>" +
        //         "<br>" +
        //         this.props.properties.address +
        //         "<br>" +
        //         "<strong>" +
        //         "Phone Number: " +
        //         "</strong>" +
        //         "<br>" +
        //         this.props.properties.phone,
        //     showCloseButton: false,
        //     autoAlignment: true,
        //     visible: false,
        //     actions: [
        //         {
        //             label: "More",
        //             eventHandler: function () {

        //             }
        //         },
        //         {
        //             label: "Close",
        //             eventHandler: function () {
        //                 map.setView({ zoom: 9 });
        //                 infobox.setOptions({ visible: false });
        //             }
        //         }
        //     ]
        // });
        // infobox.setMap(this.state.map);

        // window.Microsoft.Maps.Events.addHandler(teriminalPushpin, "click", function () {
        //     map.setView({ center: lat, lng, zoom: 15 });
        //     infobox.setOptions({ visible: true });
        // });
        // this.state.terminalPins.push(terminalPin);
        //console.log(terminals)
        //this.state.map.entities.push(teriminalPushpin);
        //});
        //end
        //this.setState({ terminals });
        //console.log(this.state.map.entities);
    }

    componentDidMount() {

        // this.props.terminalLocation.subscribe(this.handleTerminalUpdate)
        // if (this.state.terminalLocation !== this.props.terminalLocation) {
        //     this.setState({ terminalLocation: this.props.terminalLocation });




        // }
        //console.log(this.props)
        this.setInitialData()
        //this.renderMaker();
        //console.log(this.props)
    }

    render() {
        return (
            <span >
                {this.props.properties.title}
            </span>
        );
    }
}
export default Terminals