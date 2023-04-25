import './ProgressBar.css'

interface ProgressBarProps {
    songProgress: number,
    songDuration: number
}
function ProgressBar({ songProgress, songDuration}: ProgressBarProps) {
    const toMinutesAndSeconds = (totalSeconds: number) => {
        const totalMinutes = Math.floor(totalSeconds / 60);
      
        const seconds = totalSeconds % 60;
        const minutes = totalMinutes % 60;
      
        return minutes.toString()+':'+seconds.toString();
      }

  return (
    <div className='progress-bar'>
        <div>{toMinutesAndSeconds(songProgress)}</div>
        <div className='duration-fill'>
            <div className='progress-fill' style={{width: songProgress/songDuration*100+"%"}}></div>
        </div>
        <div>{toMinutesAndSeconds(songDuration)}</div>
    </div>
  )
}

export default ProgressBar