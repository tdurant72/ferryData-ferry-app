import React from 'react';

const linkStyle = {
    color: "#2c3e50",
    cursor: "pointer",
    fontSize: "1em",
    borderBottom: "1px rgb(44,62,80) solid",
    padding: "10px 5px"
}

class ViewLinks extends React.Component {

    state = { updatedView: [] }
    onHandleView(event, index) {
        this.props.onClickView(this.props);
        //console.log(this.props);
    }

    render() {
        //console.log(this.props)
        return (
            <span style={linkStyle}
                onClick={this.onHandleView.bind(this, this.state.updatedView)} >
                {this.props.properties.title}
            </span>
        );
    }
}
export default ViewLinks;