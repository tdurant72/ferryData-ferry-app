import React, { Component } from 'react';
//import ports from '../data/ports'
import Terminal from './Teminal'

const Terminals = props => {

    let terminals = props;

    return (
        <div>
            {props.terminals.length > 0}
            {props.terminals.map((terminal, index) => (
                <Terminal
                    key={`${terminal.properties.title}`}
                    terminalName={`${terminal.properties.title}`}
                    terminalAddress={`${terminal.properties.address}`}
                    terminalPhone={`${terminal.properties.phone}`}
                    terminalCoordinates={`${terminal.geometry.coordinates}`}
                    terminalPushpin={props.terminalPushpin}
                    terminalLocation={props.terminalLocation}
                    handleTerminalPinUpdate={props.handleTerminalPinUpdate}
                />

            ))}
        </div>
    )
}

export default Terminals