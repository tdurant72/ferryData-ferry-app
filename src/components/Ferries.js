import React from 'react'
import { Link } from 'react-router-dom'
const Ferries = (props) => {
    return (
        <div className="container">
            <div className="row">
                {props.ferries.map((ferry) => {
                    return (
                        <div className="col-md-3" key={ferry.VesselID} style={{ marginBottom: "1rem" }}>
                            <div className="recipes__box">
                                <h3>{ferry.VesselName}</h3>
                                <p>{ferry.VesselID}</p>
                                {/* <img className="recipe__box-img" src={recipe.image_url} alt={recipe.title} />
                                <div className="recipe__text">
                                    <h5 className="recipes__title">{recipe.title.length < 20 ? `${recipe.title}` : `${recipe.title.substring(0, 25)}...`}
                                    </h5>
                                    <p className="recipes__subtitle">Publisher:
                                        <span>{recipe.publisher}</span>
                                    </p>
                                </div> */}
                                <button
                                    className="recipe_buttons">
                                    <Link to={{
                                        pathname: `/ferry/${ferry.VesselID}`,
                                        state: { ferry: ferry.VesselID }
                                    }}>View Ferry</Link>
                                </button>

                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Ferries;