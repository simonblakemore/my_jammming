import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';
import AudioPlayer from '../AudioPlayer/AudioPlayer';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],

      playlistTracks: [],

      playlistName: 'New Playlist',

      previewUrl: null
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.search = this.search.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.playPreview = this.playPreview.bind(this);
    this.endOfAudio = this.endOfAudio.bind(this);
  }

  playPreview(previewUrl) {
    this.setState({previewUrl: previewUrl});
  }

  endOfAudio() {
    this.playPreview(null);
  }

  addTrack(track) {
    if(this.state.playlistTracks.every(item => item.id !== track.id)) {
      var tracks = this.state.playlistTracks;
      tracks.push(track);
      this.setState( {
        "playlistTracks": tracks
      });
    }
  }

  removeTrack(track) {
    if (track.previewUrl === this.state.previewUrl) {
      this.setState({previewUrl: null});
    }
    this.setState( {
      "playlistTracks" : this.state.playlistTracks.filter(item => item.id !== track.id)
    });
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  savePlaylist() {
    const URIs = this.state.playlistTracks.map(track => track.uri);

    Spotify.savePlaylist(this.state.playlistName, URIs);

    this.setState({
      playlistName: 'New Playlist',
      playlistTracks: []
    });
  }

  search(term) {
    if(!term) {
      return;
    }

    Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults});
    });
  }

  render() {
    return (
      <div>
        <AudioPlayer
          previewUrl={this.state.previewUrl}
          onEnd={this.endOfAudio}
        />
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
              playPreview={this.playPreview}
              currentlyPlaying={this.state.previewUrl}
            />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
              playPreview={this.playPreview}
              currentlyPlaying={this.state.previewUrl}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
