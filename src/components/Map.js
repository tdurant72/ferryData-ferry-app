import React, { Component } from "react";

import axios from "axios";

const API_KEY = "80e61cf4-541b-4651-8228-6376d80567f7";

class Map extends Component {
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

    render() {
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
export default Map