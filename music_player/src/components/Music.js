import React, { Component } from 'react'
import YouTube from 'react-youtube'

export default class Music extends Component {
  state = {
    inputID: ""
  }
  videoOnReady(event) {
    // access to player in all event handlers via event.target
    //playVideoAt(50) at 50seconds
    event.target.pauseVideo();
    console.log(event.target)
  }
  render() {
    const opts = {
      height: '390',
      width: '640',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    };
    const {videoId} = this.props
    return (
      <React.Fragment>
        <h1>Music Player</h1>
      <YouTube
        // videoId="NpU4HL2VNbs"
        videoId = {videoId}
        opts={opts}
        onReady={this.videoOnReady}
        
      />
      </React.Fragment>
    );
  }


}

