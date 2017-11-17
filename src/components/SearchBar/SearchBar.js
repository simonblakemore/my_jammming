import React, { Component } from 'react';
import './SearchBar.css';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: null
    };

    this.handleTermChange = this.handleTermChange.bind(this);
    this.search = this.search.bind(this);
  }

  handleTermChange(event) {
    const newTerm = event.target.value;
    this.setState({ searchTerm: newTerm });
  }

  search() {
    if (this.state.searchTerm !== null) {
      this.props.onSearch(this.state.searchTerm);
    }
  }

  render() {
    return (
      <div className='SearchBar'>
        <input
          placeholder="Enter A Song, Album or Artist"
          onChange={this.handleTermChange}
        />
        <a onClick={this.search}>SEARCH</a>
      </div>
    );
  }
}

export default SearchBar;
