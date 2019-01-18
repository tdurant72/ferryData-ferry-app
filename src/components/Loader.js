import React from "react";

function Loader(props) {
    return (
        <div>
            <h2>{props.fetchingMessage}</h2>
            {props.isLoading ? (
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/d/de/Ajax-loader.gif"
                    alt="Loading"
                />
            ) : null}

        </div>
    );
}

export default Loader;