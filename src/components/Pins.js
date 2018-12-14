import React from "react";
import Pin from "./Pin";

const Pin = props => {
  return (
    <div className="pins">
      {this.state.filteredFerries.map(pin => {
        return <Pin key={ferry.VesselName} ferryName={ferry.VesselName} />;
      })}
    </div>
  );
};

export default Pin;
