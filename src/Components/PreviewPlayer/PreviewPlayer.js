import React from "react";
import './PreviewPlayer.css';


class PreviewPlayer extends React.Component{
    
    srcUrl(track){
        let src = `https://open.spotify.com/embed/track/${track}?utm_source=generator&theme=0`;
        return src;
    }
    render(){
        return (
            <div>
            <iframe title = "sample" className="player" src={this.srcUrl(this.props.url)}></iframe>
            
            </div>
        )
    }
}

export default PreviewPlayer;