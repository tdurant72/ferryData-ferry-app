import axios from 'axios'

const proxy = "https://cors-anywhere.herokuapp.com/";

export function getTeminals() {
    axios
        .get(
            proxy + "https://gisd14.dot.nc.net/GeoRss/FerryGeoJson.ashx"
        )
        .then(response => {
            //console.log(response.data);
            //this.pins = [];
            let ncferries = response.data;
            this.setState(
                {
                    ncferries: response.data,

                },
                console.log(this.state.ncferries)
            );
        })

        .catch(error => {
            console.log(error);
        });

};



