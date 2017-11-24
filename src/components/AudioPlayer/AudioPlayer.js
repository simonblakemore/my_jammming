import React, { Component } from 'react';
import './AudioPlayer.css';

class AudioPlayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playPreview: false,
      isPlaying: false
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    let x = this.state.playPreview ? false : true;

    this.setState({
      playPreview: x
    })
  }


  render() {
    console.log(this.props.previewUrl);

    if (this.props.previewUrl === null) {
      return (
        <p className="noPreview">&#9658; No Preview Available</p>
      );
    }

    if (this.state.playPreview === true) {
      this.state.isPlaying = false;
      return (
        <div>
          <audio source src={this.props.previewUrl} autoplay='true' type='audio/mpeg'>Preview</audio>
          <button onClick={this.handleClick}>Stop Preview</button>
        </div>
      );
    }

    return (
      <div>
      <button onClick={this.handleClick}>Play Preview</button>
      </div>
    )
  }
}

export default AudioPlayer;
