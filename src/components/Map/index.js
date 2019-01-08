import React from "react"
import { FerryContext } from "../../contexts/FerryContext"
import MapComponent from "./MapComponent"

export default props => (
    <FerryContext.Consumer>
        {({ getNCFerries }) => <Map {...props} getNCFerries={getNCFerries} />}
    </FerryContext.Consumer>
);