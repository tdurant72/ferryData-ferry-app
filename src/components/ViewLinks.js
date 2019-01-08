import React from 'react';

const linkStyle = {
    color: "#2c3e50",
    cursor: "pointer",
    fontSize: "1em",
}

class ViewLinks extends React.Component {
    // console.log(props)

    onClickHandler = (e) => {
        e.title = this.props.title;
    }
    render() {
        return (
            <span
                style={linkStyle}

                onClick={this.onClickHandler}
            >{this.props.title}</span>
        )
    }

}
export default ViewLinks;