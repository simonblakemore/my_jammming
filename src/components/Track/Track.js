import React, { Component } from 'react';
import './Track.css';

class Track extends Component {
  render() {
    return (
      <div class="Track">
        <div class="Track-information">
          <h3>Track Name</h3>
          <p>Artist | Album</p>
        </div>
        <a class="Track-action">-</a>
      </div>
    );
  }
}

export default Track;
