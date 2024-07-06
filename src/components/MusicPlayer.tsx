import React from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

export interface Track {
  track: string;
}

const MusicPlayer: React.FC<Track> = ({ track }) => {
  return (
    <AudioPlayer
      src={`${track}`}
      onPlay={e => console.log('onPlay')}
      hasDefaultKeyBindings={true}
      className='shadow-2xl rounded-xl'
      // other props here
    />
  );
};

export default MusicPlayer;
