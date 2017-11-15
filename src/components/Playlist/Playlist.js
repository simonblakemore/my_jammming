import React, { Component } from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

class Playlist extends Component {
  constructor(props) {
    super(props)

    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(event) {
    this.props.onNameChange(event.target.value)
  }

  render() {
    console.log(this.props.playlistName);
    return (
        <div className='Playlist'>
          <input
            defaultValue={this.props.playlistName}
            onChange={this.handleNameChange}
          />
          <TrackList tracks={this.props.playlistTracks}
            isRemoval={true}
            onRemove={this.props.onRemove} />
          <a className="Playlist-save">SAVE TO SPOTIFY</a>
      </div>
    );
  }
}

export default Playlist;
