import React, { Component } from "react";

class Search extends Component {
  state = {
    showingFerries: true,
    ferryFilter: "",
    search: ""
  };

  static defaultProps = {
    updateSearch: () => {}
  };

  inputChange(e) {
    const search = e.target.value;
    this.props.updateSearch(search);
  }
  render() {
    return (
      <div>
        <input
          placeholder="Find a Ferry"
          value={this.state.search}
          onChange={this.inputChange}
        />
        <input
          type="text"
          placeholder="Find a ferry"
          value={this.state.search}
          //onChange={this.updateSearch.bind(this)}
          onChange={e => {
            this.filterFerries(e.target.value);
          }}
        />
      </div>
    );
  }
}

export default Search;
