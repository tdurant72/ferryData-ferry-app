import axios from 'axios'
export function getTerminals() {
    axios
        .get(
            "https://www.ncdot.gov/Style%20Library/Bing%20Maps/transit-ferry-routes/transit-ferry-routes.xml"
        )
        .then(response => {
            //console.log(response.data);
            //this.pins = [];
            let terminals = response.data;
            console.log(terminals);
        })

        .catch(error => {
            console.log(error);
        });
};
export default getTerminals