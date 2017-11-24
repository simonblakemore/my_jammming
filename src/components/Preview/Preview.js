import React, { Component } from 'react';
import './Preview.css';
import AudioPlayer from '../AudioPlayer/AudioPlayer';

class Preview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playPreview: false,
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
      return (
        <div>
          <AudioPlayer previewUrl={this.props.previewUrl}/>
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

export default Preview;
