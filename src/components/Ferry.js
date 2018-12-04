import React from 'react';

import { Link } from "react-router-dom";
import axios from 'axios'
const API_KEY = "80e61cf4-541b-4651-8228-6376d80567f7";
const proxy = "https://cors-anywhere.herokuapp.com/";

class Ferry extends React.Component {
    state = { selectedFerry: [] }

    componentDidMount = async () => {
        const VesselID = this.props.location.state.ferry;
        //this.getSelectedFerry()
        const individual_call = await fetch(`${proxy}http://www.wsdot.wa.gov/Ferries/API/Vessels/rest/vesselaccommodations/${VesselID}?apiaccesscode=${API_KEY}`)
        //.then(response => response.json())
        //.then(data => this.setState({ selectedFerry: data }))
        const data = await individual_call.json();
        this.setState({ selectedFerry: data });
        console.log(this.state.selectedFerry)
        // const res = await req.json();
        // console.log(res)
        // this.setState({
        //     selectedFerry: res.ferries
        // })
        //console.log(data)
        //console.log(VesselID)
        // }
        // getSelectedFerry = async () => {
        // const VesselID = this.props.location.state.ferry;
        // let selectedFerry = []
        // axios.get(proxy + "http://www.wsdot.wa.gov/Ferries/API/Vessels/rest/vesselaccommodations/" + VesselID + "?apiaccesscode=" + API_KEY)
        //     .then(resp => {
        //         console.log(resp.data)
        //         this.setState({
        //             selectedFerry: resp.data
        //         })
        //         console.log(this.state.selectedFerry.VesselName)
        //     })

        //     .catch(error => {
        //         console.log(error)
        //     })
    }
    render() {

        const ferry = this.state.selectedFerry;
        console.log(ferry);
        return (
            <div>
                <div className="container">

                    <div className="active-recipe">
                        {/* <img className="active-recipe__img" src={ferry.Class.DrawingImg} alt={ferry.VesselName} /> */}
                        <h3 className="active-recipe__title">{ferry.VesselName}</h3>
                        <p>{ferry.ADAInfo}</p>
                        <p className="active-recipe__website">Info
                {/* <span><a href={recipe.publisher_url}>{recipe.publisher_url}</a></span>  */}
                        </p>
                        <button className="active-recipe__button">
                            <Link to="/">Go Home</Link>
                        </button>
                    </div>

                </div>
            </div>
        );
    }
};

export default Ferry;


