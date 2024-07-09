'use client'

import React from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { useEffect, useState } from 'react';

export interface Track {
  id: string;
}

interface MusicPlayerProps {
  track: Track;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({track}) => {
  const [trackUrl, setTrackURL] = useState<String>('')
  console.log(track)

  useEffect(() => {
    // Fetch the track URL from the API
    const fetchTrackUrl = async () => {
      console.log(`track: ${track}`);
      try {
        // Problem here, need to send the track to the api call, it stays undefined
        const response = await fetch(`/api/s3`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(track),
        });
        console.log(response);
        const data = await response.json();
        setTrackURL(data.url);
      } catch (error) {
        console.error('Error fetching track URL:', error);
      }
    };

    fetchTrackUrl();
  }, [track]);

  return (
    <AudioPlayer
      src={`${trackUrl}`}
      onPlay={e => console.log('onPlay')}
      hasDefaultKeyBindings={true}
      className='shadow-2xl rounded-xl'
      // other props here
    />
  );
};

export default MusicPlayer;
