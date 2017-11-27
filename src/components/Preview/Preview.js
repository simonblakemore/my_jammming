import React, { Component } from 'react';
import './Preview.css';

class Preview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showPlayPreview: true
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (this.state.showPlayPreview === true) {
      this.props.playPreview(this.props.previewUrl);
      this.setState({showPlayPreview: false});
    } else {
      this.props.playPreview(null);
      this.setState({showPlayPreview: true});
    }
}


  render() {
    if (this.state.showPlayPreview === false && this.props.previewUrl !== this.props.currentlyPlaying) {
      this.setState({showPlayPreview: true});
    }

    if (this.state.showPlayPreview === true && this.props.previewUrl === this.props.currentlyPlaying) {
      this.setState({showPlayPreview: false});
    }

    if (this.props.previewUrl === null) {
      return (
        <div className='Preview'>
          <a className='No-preview'><i className="material-icons">do_not_disturb_on</i> No Preview Available</a>
        </div>
      );
    }

    if (this.state.showPlayPreview === false) {
      return (
        <div className='Preview'>
          <a className='Preview-action' onClick={this.handleClick}><i className="material-icons">stop</i> Stop Preview</a>
        </div>
      );
    }

    return (
      <div className='Preview'>
        <a className='Preview-action' onClick={this.handleClick}><i className="material-icons">play_arrow</i> Play Preview</a>
      </div>

    )
  }
}

export default Preview;
