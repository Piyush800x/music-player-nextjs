'use client'
import React, { ReactHTMLElement, useRef } from 'react';
import AudioPlayer, {RHAP_UI } from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { useEffect, useState } from 'react';
import { IoPlayCircleOutline, IoPlaySkipBackOutline, IoPlaySkipForwardOutline } from "react-icons/io5";
import { TiMediaPauseOutline } from "react-icons/ti";
import { GrChapterNext, GrChapterPrevious  } from "react-icons/gr";
import { PiSpeakerHifi } from "react-icons/pi";

export interface Track {
  id: string;
}

interface MusicPlayerProps {
  track: Track;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({track}) => {
  const [playing, setPlaying] = useState(false);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>('');
  const [trackUrl, setTrackURL] = useState<String>('')
  const audioRef = useRef<AudioPlayer>(null);
  const [showSelect, setShowSelect] = useState(false);
  console.log(track)

  useEffect(() => {
    // Fetch the track URL from the API
    const fetchTrackUrl = async () => {
      console.log(`track: ${track}`);
      try {
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

    const getMediaDevices = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        const deviceInfos = await navigator.mediaDevices.enumerateDevices();
        const audioOutputDevices = deviceInfos.filter((device) => device.kind === 'audiooutput');
        console.log(`Audio devices: ${audioOutputDevices}`);
        setDevices(audioOutputDevices);
        if (audioOutputDevices.length > 0) {
          setSelectedDeviceId(audioOutputDevices[0].deviceId);
        }
      } catch (error) {
        console.error('Error accessing media devices:', error);
      }
    };

    fetchTrackUrl();
    getMediaDevices();
  }, [track]);

  const handleDeviceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newDeviceId = event.target.value;
    setSelectedDeviceId(newDeviceId);
    if (audioRef.current?.audio.current) {
      audioRef.current.audio.current.setSinkId(newDeviceId).catch((error) => {
        console.error('Error setting audio output device:', error);
      });
    }
    setShowSelect(false)
  };

  return (
    <div className='flex flex-col items-center w-full bg-black'>
      {/* <select onChange={handleDeviceChange} value={selectedDeviceId}>
        {devices.map((device) => (
          <option key={device.deviceId} value={device.deviceId}>
            {device.label}
          </option>
        ))}
      </select> */}
      <AudioPlayer
        ref={audioRef}
        src={`${trackUrl}`}
        onPlay={(e) => {setPlaying(true) 
          console.log('onPlay')
        }}
        onPause={(e) => {setPlaying(false)
          console.log('onPause')
        }}
        hasDefaultKeyBindings={true}
        className='w-full bg-black text-black rounded-xl shadow-2xl'
        customIcons={{
          play: <>{playing ? (
            <TiMediaPauseOutline width={100} height={100}/>
          ) : (<IoPlayCircleOutline width={100} height={100} className='flex text-blue-400'/>)}</>,
          forward: <IoPlaySkipForwardOutline className=''/>,
          rewind: <IoPlaySkipBackOutline/>,
          pause: <TiMediaPauseOutline width={100} height={100} className='flex text-blue-400'/>,
          next: <GrChapterNext width={100} height={100}/>,
          previous: <GrChapterPrevious width={100} height={100} />
        }}

        volume={0.5}
        // customAdditionalControls={[]}
        // customVolumeControls={[]}
        // customProgressBarSection={[
        //   <div key="progress" className="custom-progress-bar flex-1" />,
        // ]}
        customControlsSection={[
          <div className='flex items-center mt-2'>
            <button onClick={() => setShowSelect(!showSelect)} className="text-white">
              <PiSpeakerHifi className='text-black' size={30} />
            </button>
            {showSelect && (
              <select onChange={handleDeviceChange} value={selectedDeviceId}>
                {devices.map((device) => (
                  <option key={device.deviceId} value={device.deviceId}>
                    {device.label}
                  </option>
                ))}
              </select>
            )}
          </div>,
          RHAP_UI.ADDITIONAL_CONTROLS,
          RHAP_UI.MAIN_CONTROLS,
          RHAP_UI.VOLUME_CONTROLS,
        ]}
      />
    </div>
  );
};

export default MusicPlayer;
