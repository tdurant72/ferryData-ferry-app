import React from "react";

const h2Style = { maxWidth: '50%', margin: '0 auto' }
function Loader(props) {
    //console.log(props)
    return (

        <div>
            <h2 style={h2Style}>{props.fetchingMessage}</h2>
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