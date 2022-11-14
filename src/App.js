import React from 'react'
import Player from './Player'
import videojs from 'video.js';

import './App.css';
// videojs.options.hls.overrideNative = true;
// videojs.options.html5.nativeAudioTracks = false;
// videojs.options.html5.nativeVideoTracks = false;

const App = () => {
  const playerRef = React.useRef(null);
  const queryString = window.location.search;
  const parameters = new URLSearchParams(queryString);
  const src = parameters.get('url') || 'https://d2axq88cin1crz.cloudfront.net/videos/GfMPTl3bgsoxWIddUULgFKNa7OoUU1FD/outputs/hls/GfMPTl3bgsoxWIddUULgFKNa7OoUU1FD.m3u8';
  // console.log(src)
  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    html5: {  
      nativeAudioTracks: false,
      nativeVideoTracks: false,
      overrideNative: true,
      vhs: {
        debug: false,
        overrideNative: true
      }
  },
    
    sources: [{
      src,
      type: 'application/x-mpegURL'
    }]
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on('waiting', () => {
      videojs.log('player is waiting');
    });

    player.on('dispose', () => {
      videojs.log('player will dispose');
    });
  };

  return (
    <div className='player-wrapper'>
      <Player options={videoJsOptions} onReady={handlePlayerReady} />
    </div>
  );
}

export default App;



