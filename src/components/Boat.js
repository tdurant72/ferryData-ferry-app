import React, { Component } from "react";


class Boat extends Component {
    constructor(props) {
        super(props)
        this.renderBoatPin = this.renderBoatPin.bind(this)

    }
    componentDidMount() {
        if (this.props.map !== null) {
            //console.log(this.props)
            this.renderBoatPin()
        } else {
            setTimeout(() => {
                this.componentDidMount()
            }, 100)
        }

    }


    componentDidUpdate(prevProps, prevState) {
        // const newProps = this.props;
        if (this.props.timeStamp !== prevProps.timeStamp) {


            this.renderBoatPin();
            //this.loadMapScenario();
        }

    }
    renderBoatPin(props) {
        let COG = this.props.COG;
        let bearing = parseInt(COG, 10);
        const boatIcon =
            '<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg id="ncferry" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg"  width="19" height="19" viewBox="0 0 12 22.38" transform="rotate(' + bearing + ')"><defs><style>.cls-1{fill:#eaeaea;}.cls-2{fill:#002445;}.cls-3{fill:#004544;stroke:#002445;stroke-miterlimit:10;}</style></defs><title>ferry</title><path class="cls-1" d="M12.21,18.76,12,18.9l-.21-.14L7,21V6.69a2.69,2.69,0,0,1,1-2l4-3.48,4,3.48a2.69,2.69,0,0,1,1,2V21Z" transform="translate(-6 -0.05)"/><path class="cls-2" d="M12,2.51l3.39,2.92A1.68,1.68,0,0,1,16,6.69V19.4l-2.85-1.31-1-.48-.11.08-.11-.08-1,.48L8,19.4V6.69a1.68,1.68,0,0,1,.61-1.26L12,2.51M12,.05a.53.53,0,0,0-.36.13L7.31,3.92A3.63,3.63,0,0,0,6,6.69V22.05a.47.47,0,0,0,.21.38l5.48-2.53a.53.53,0,0,0,.62,0l5.48,2.53a.47.47,0,0,0,.21-.38V6.69a3.63,3.63,0,0,0-1.31-2.77L12.36.18A.53.53,0,0,0,12,.05Z" transform="translate(-6 -0.05)"/><path class="cls-3" d="M12,23.89" transform="translate(-6 -0.05)"/></svg>';



        let Latitude = parseFloat(this.props.Latitude);
        let Longitude = parseFloat(this.props.Longitude);
        let VesselName = this.props.VesselName;
        let SOG = this.props.SOG;
        let boatId = this.props.boatId;
        let summary = this.props.summary;
        let boatLocation = new window.Microsoft.Maps.Location(Latitude, Longitude);
        this.boatPin = new window.Microsoft.Maps.Pushpin(boatLocation, {
            title: VesselName,
            id: boatId,
            icon: boatIcon,
            visible: true,
            typeName: 'ncferry',
            anchor: new window.Microsoft.Maps.Point(0, 0)
        });
        this.boatPin.metadata = {
            id: boatId,
            title: VesselName,
            description: summary,
            type: 'boat'
        };
        const boatPin = this.boatPin;
        this.props.onChangeMarker(boatId, COG, Latitude, Longitude, VesselName, SOG, boatIcon, boatPin, boatLocation, summary)

    }
    render() {
        return null
    }
}

export default Boat
