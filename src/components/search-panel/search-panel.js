import React, { Component } from 'react';
import debounce from 'lodash.debounce';

import './search-panel.css';

export default class SearchPanel extends Component {
  state = {
    searchValue: '',
  };
  onSearchValueChange = (event) => {
    this.setState({
      searchValue: event.target.value,
    });
  };
  onSearch = (event) => {
    event.preventDefault();
    this.props.changeValue(this.state.searchValue);
    this.setState({
      searchValue: '',
    });
  };
  render() {
    const onSearchDebounce = debounce(this.onSearch, 4000);
    return (
      <form className="search-panel-form" onChange={onSearchDebounce}>
        <input
          className="search-panel"
          placeholder="Type to search..."
          onChange={this.onSearchValueChange}
          value={this.state.searchValue}
        />
      </form>
    );
  }
}
