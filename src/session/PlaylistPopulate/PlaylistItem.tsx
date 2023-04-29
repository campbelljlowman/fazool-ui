import './PlaylistItem.css'

interface PlaylistItmeProps {
    image: string,
    name: string
}
function PlaylistItem({ image, name }: PlaylistItmeProps) {

    const populatePlaylist = () => {
        console.log("Adding playlist");
    }
    return (
        <div className='playlist-item' onClick={populatePlaylist}>
            <img className='playlist-cover' src={image} alt='playlist cover' />
            <div>{name}</div>
        </div>
    )
}

export default PlaylistItem