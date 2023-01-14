import React from "react";
import './TrackList.css';
import Track from '../Track/Track.js'
import PreviewPlayer from '../../Components/PreviewPlayer/PreviewPlayer'


class TrackList extends React.Component{
    render(){
        return(
            <div className="TrackList">
                {this.props.tracks.map(track => {
                    return (<div>
                        
                        <Track 
                        key = {track.id}
                        track = {track}
                        onAdd = {this.props.onAdd}
                        onRemove={this.props.onRemove}
                        isRemoval = {this.props.isRemoval}
                        />
                        <PreviewPlayer
                        url = {track.id}/>
                        
                    </div>
                    )
                })}
            </div>
        )
    }
}

export default TrackList;