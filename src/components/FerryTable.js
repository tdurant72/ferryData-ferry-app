import './css/jquery.dataTables.css'
import React from 'react';
import Moment from 'react-moment'
import './FerryTable.css'

const FerryTable = props => {
    return (

        <div className="FerryTable">
            <table className="display" width="100%" id="t01" >
                <thead>
                    <tr>
                        <th>Ferry Name</th>
                        <th>Speed</th>
                        <th>Status</th>
                        <th>As of:</th>
                    </tr>
                </thead>
                <tbody>
                    {props.ncferries.map(ncferry => {
                        return (
                            <tr
                                className="none"
                                key={ncferry.properties['Vessel Name']}
                            >
                                <td>{ncferry.properties['Vessel Name']}</td>
                                <td>
                                    {ncferry.properties.SOG}
                                </td>
                                <td>
                                    {ncferry.properties.SOG === "0 knots" ? "docked" : " underway"}
                                </td>
                                <td>
                                    <Moment format=" h:mm a, MM/DD/YY">
                                        {ncferry.properties.Time}
                                    </Moment>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>

            </table>
        </div>
    );
}


export default FerryTable;