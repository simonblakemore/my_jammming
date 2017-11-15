import React, { Component } from 'react';
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends Component {
  render() {
      this.props.tracks.map(track => console.log(track.name))
    return (
      <div className="TrackList">
        {this.props.tracks.map(track => {
            return (
              <Track key={track.name} track={track} />
            );
          })
        }
      </div>
    );
  }
}

export default TrackList;
