import React from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

export interface Track {
  track: string;
}

interface S3Object {
  key: string;
  LastModified: string;
  Size: number;
}

const MusicPlayer: React.FC<Track> = ({ track }) => {

  const fetchFiles = async () => {
    const res = await fetch('api/s3')
    const data = await res.json()
    console.log(data)
  }

  fetchFiles()
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
