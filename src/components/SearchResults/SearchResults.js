import React, { Component } from 'react';
import './SearchResults.css';
import TrackList from '../TrackList/TrackList';

class SearchResults extends Component {
  constructor(props) {
    super(props)
    console.log(this.props.searchResults);
  }

  render() {
    return (
      <div className='SearchResults'>
        <h2>Results</h2>
        <TrackList tracks={this.props.searchResults} />
      </div>
    );
  }
}

export default SearchResults;
