import React, { Component } from 'react';

class AudioPlayer extends Component {

  render() {
    if (this.props.previewUrl === null) {
      return[];
    }

    return (
      <audio
        id='myAudio'
        src={this.props.previewUrl}
        autoPlay='true'
        type='audio/mpeg'
        onEnded={this.props.onEnd}
        >Preview</audio>
    )
  }
}

export default AudioPlayer;
