import React from "react";
import { Link } from "react-router-dom";
import Moment from 'react-moment'
import './FerryList.css'
const FerryList = props => {
    return (
        <div className="ferry-data">

            {props.ncferries.map(ncferry => {
                return (
                    <div
                        className="ferry-tr"
                        key={ncferry.properties['Vessel Name']}

                    >
                        <div className="ferry-items">
                            <h5>{ncferry.properties['Vessel Name']}</h5>
                        </div>
                        <div className="ferry-items">
                            {ncferry.properties.SOG === "0 knots" ? " is docked" : " is underway"}
                        </div>
                        <div className="ferry-items">
                            <p>as of:
                                <Moment format=" h:mm a, MM/DD/YY">
                                    {ncferry.properties.Time}
                                </Moment>
                            </p>
                        </div>

                        <div className="ferry-items">
                            <button className="recipe_buttons ">
                                <Link
                                    to={{
                                        pathname: `/ferry/${ncferry.properties['Vessel Name']}`,
                                        state: { ncferry: ncferry.properties['Vessel Name'] }
                                    }}
                                >
                                    View Ferry
                  </Link>
                            </button>
                        </div>
                    </div>
                );
            })}

        </div>
    );
};

export default FerryList;
