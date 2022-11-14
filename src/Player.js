/* eslint-disable react-hooks/exhaustive-deps */
import videojs from 'video.js';
import { useRef, useEffect } from 'react';
import 'video.js/dist/video-js.css';
import 'videojs-contrib-quality-levels';
import 'videojs-http-source-selector';

const Player = (props) => {
    const videoRef = useRef(null);
    const playerRef = useRef(null);
    const { options, onReady } = props;
    useEffect(() => {

        // Make sure Video.js player is only initialized once
        if (!playerRef.current) {
            const videoElement = videoRef.current;

            if (!videoElement) return;
            const player = playerRef.current = videojs(videoElement, options, () => {
                videojs.log('player is ready');
                onReady && onReady(player);
            });
            player.httpSourceSelector({
                default: 'auto',
            });

            player.on("loadstart", function (e) {
                // console.log(player.tech())
                
                // player.tech().vhs.xhr.beforeRequest = function(options) {
                    // console.log(options)
                    // required for detecting only the key requests
                    // if(options.uri.includes('key://key.key')) {
                        // console.log('changed')
                        // options.uri = 'https://adultmembersites.com/api/encoding'
                    // }
                    // if (!options.uri.startsWith(keyPrefix)) { return; }
                    // options.headers = options.headers || {};
                    // optopns.headers["Custom-Header"] = "value";
                    // options.uri = urlTpl.replace("{key}", options.uri.substring(keyPrefix.length));
                // };
            });

            // You could update an existing player in the `else` block here
            // on prop change, for example:
        } else {
            // const player = playerRef.current;

            // player.autoplay(options.autoplay);
            // player.src(options.sources);
        }
    }, [options, videoRef]);

    return (
        <div data-vjs-player>
            <video ref={videoRef} className='video-js vjs-big-play-centered' />
        </div>
    );
}

export default Player