import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [{
        id: '001',
        name: 'name1',
        artist: 'artist1',
        album:'album1'
      },
      {
        id: '002',
        name: 'name2',
        artist: 'artist2',
        album: 'album2'
      }],

      playlistTracks: [{
        id: '003',
        name: 'PLname1',
        artist: 'PLartist1',
        album:'PLalbum1'
      },
      {
        id: '004',
        name: 'PLname2',
        artist: 'PLartist2',
        album: 'PLalbum2'
      }],

      playlistName: 'New Playlist'
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    let match = false;

    tracks.forEach(playlistTrack => {
      if(playlistTrack.id === track.id) {
        match = true;
      }
    });

    if (!match) {
      tracks.push(track);
      this.setState({playlistTracks: tracks});
    }
  }

  removeTrack(track) {
    let oldPlaylist = this.state.playlistTracks;

    const newPlaylist = oldPlaylist.filter(playlistTrack => playlistTrack.id !== track.id);

    this.setState({playlistTracks: newPlaylist});
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
