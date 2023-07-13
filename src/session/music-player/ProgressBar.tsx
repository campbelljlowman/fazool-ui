import { useEffect, useState } from 'react'
import { Progress } from '@/components/ui/progress'

interface ProgressBarProps {
    isPlaying:      boolean,
    songProgress:   number,
    songDuration:   number
}
function ProgressBar({ isPlaying, songProgress, songDuration}: ProgressBarProps) {
    const [songProgressAdjusted, setSongProgressAdjusted] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            if(isPlaying && (songProgressAdjusted < songDuration)) {
                setSongProgressAdjusted(songProgressAdjusted + 1)
            }
        }, 1000)

        return () => clearInterval(interval);
    }, [isPlaying, songProgressAdjusted, songDuration])

    useEffect(() => {
        const setProgress = () => {
            setSongProgressAdjusted(songProgress);
        };
        setProgress();
    }, [songProgress])

    const getExtra0= (totalSeconds: number) => {
        if (totalSeconds % 60 < 10) {
            return '0'
        } else {
            return ''
        }
    }

    const toMinutesAndSeconds = (totalSeconds: number) => {
        const totalMinutes = Math.floor(totalSeconds / 60);
      
        const seconds = totalSeconds % 60;
        const minutes = totalMinutes % 60;
      
        return minutes.toString() + ':' + getExtra0(totalSeconds) + seconds.toString();
    }

  return (
    <div className='flex justify-between items-center mb-4 w-5/6 font-bold'>
        <p className='mr-4'>{toMinutesAndSeconds(songProgressAdjusted)}</p>
        <Progress value={songProgressAdjusted/songDuration*100}/>
        <p className='ml-4'>{toMinutesAndSeconds(songDuration)}</p>
    </div>
  )
}

export default ProgressBar