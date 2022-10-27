import React from "react";
import './PlayList.css';
import Tracklist from '../TrackList/TrackList.js'

class PlayList extends React.Component{
    render(){
        return(
            <div className="Playlist">
                <input defaultValue={'New Playlist'}/>
                <Tracklist 
                tracks = {this.props.playlistTracks}
                onRemove = {this.props.onRemove}
                isRemoval = {true}/>
                <button className="Playlist-save">SAVE TO SPOTIFY</button>
            </div>
        )
    }
}

export default PlayList;