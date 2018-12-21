import React from "react";
import { Link } from "react-router-dom";

const Ferries = props => {
  return (
    <div className="container">
      <div className="row">
        {props.ncferries.map(ncferry => {
          return (
            <div
              className="col-md-3"
              key={ncferry.properties['Vessel Name']}
              style={{ marginBottom: "1rem" }}
            >
              <div className="recipes__box">
                <h4>{ncferry.properties['Vessel Name']}</h4>
                {/* <p> At time: {ncferry.properties.Time}</p> */}
                <p>Summary: {ncferry.properties.summary}</p>
                {/* <p>Latitude: {ncferry.properties.Latitude}</p>
                <p>Longitude: {ncferry.properties.Longitude}</p> */}
                {/* <img className="recipe__box-img" src={recipe.image_url} alt={recipe.title} />
                                <div className="recipe__text">
                                    <h5 className="recipes__title">{recipe.title.length < 20 ? `${recipe.title}` : `${recipe.title.substring(0, 25)}...`}
                                    </h5>
                                    <p className="recipes__subtitle">Publisher:
                                        <span>{recipe.publisher}</span>
                                    </p>
                                </div> */}
                <button className="recipe_buttons">
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
    </div>
  );
};

export default Ferries;
