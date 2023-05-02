import { useEffect, useState } from 'react'
import './ProgressBar.css'

interface ProgressBarProps {
    isPlaying:      boolean,
    songProgress:   number,
    songDuration:   number
}
function ProgressBar({ isPlaying, songProgress, songDuration}: ProgressBarProps) {
    const [songProgressAdjusted, setSongProgressAdjusted] = useState(0)
    const [timeoutID, setTimeoutID] = useState(0)

    useEffect(() => {
        const adjustProgress = () => {
            if(isPlaying && (songProgressAdjusted < songDuration)) {
                console.log("Ticking");
                let timeoutID: number = window.setTimeout(() => setSongProgressAdjusted(songProgressAdjusted + 1), 1000);
                setTimeoutID(timeoutID);
            }
        };
        adjustProgress();
    }, [songProgressAdjusted])

    useEffect(() => {
        const setProgress = () => {
            console.log(`song progress: ${songProgress}`);
            console.log(`adjusted progress: ${songProgressAdjusted}`)
            setSongProgressAdjusted(songProgress);
            clearTimeout(timeoutID);
        };
        setProgress();
    }, [songProgress])

    const getExtra0= (totalSeconds: number) => {
        if (totalSeconds%60 < 10) {
            return "0"
        } else {
            return ""
        }
    }

    const toMinutesAndSeconds = (totalSeconds: number) => {
        const totalMinutes = Math.floor(totalSeconds / 60);
      
        const seconds = totalSeconds % 60;
        const minutes = totalMinutes % 60;
      
        return minutes.toString() + ':' + getExtra0(totalSeconds) + seconds.toString();
    }

  return (
    <div className='progress-bar'>
        <div>{toMinutesAndSeconds(songProgressAdjusted)}</div>
        <div className='duration-fill'>
            <div className='progress-fill' style={{width: songProgressAdjusted/songDuration*100+"%"}}></div>
        </div>
        <div>{toMinutesAndSeconds(songDuration)}</div>
    </div>
  )
}

export default ProgressBar