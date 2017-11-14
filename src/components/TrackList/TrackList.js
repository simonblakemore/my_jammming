import React, { Component } from 'react';
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends Component {
  render() {
    return (
      <div class="TrackList">
        <Track />
      </div>
    );
  }
}

export default TrackList;
