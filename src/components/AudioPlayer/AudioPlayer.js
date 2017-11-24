import React, { Component } from 'react';

class AudioPlayer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <audio source src={this.props.previewUrl} autoplay='true' type='audio/mpeg'>Preview</audio>
    )
  }
}

export default AudioPlayer;
