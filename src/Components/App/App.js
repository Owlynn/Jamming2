import './App.css';
import React from 'react';
import SearchBar from '../../Components/SearchBar/SearchBar.js'
import SearchResults from '../../Components/SearchResults/SearchResults.js'
import PlayList from '../../Components/PlayList/PlayList.js'
import Spotify from '../../util/Spotify.js';

class App extends React.Component{
  //CONSTRUCTOR
  constructor(props){
    super(props);
    this.state= {
      searchResults : [],
      playlistName : 'My Playlist',   
      playlistTracks : []
    }

  //BINDING
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  //METHODS
  addTrack(track){
    let tracks = this.state.playlistTracks;
    
    // si la track est déjà présente dans le tableau, ne rien retourner.
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    // si la track n'est pas encore présente, la rajouter au tableau de track dans le state.
    tracks.push(track);
    this.setState({
      playlistTracks : tracks
    })
  }

  removeTrack(track){
    let tracks = this.state.playlistTracks;
    // renvoie un tableau en filtrant la track sélectionnée en fonction de son id et la stocke dans la variable tracks.
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id)
    // modifie la liste des tracks dans le state.
    this.setState({
      playlistTracks:tracks
    })
  }

  search(term){
    // récupère le token de l'utilisateur et retourne un objet avec les infos de la track (nom artiste album etc)
    Spotify.search(term)
    // met à jour le state avec le résultat de la recherche
    .then(searchResults => {this.setState({ searchResults : searchResults})});
  }

  updatePlaylistName(name){
    // permet à l'utilisateur de changer le nom de sa playlist
    this.setState({
      playlistName:name
    })
  }

  savePlaylist(){
    //permet d'enregistrer la playlist sur le compte de l'utilisateur
    const trackURIs = this.state.playlistTracks.map(track => track.uri);

    console.log(Spotify);
    console.log(Spotify.savePlaylist);

    Spotify.savePlaylist(this.state.playlistName,trackURIs).then(()=> this.setState({
      playlistName: 'New Playlist',
      playlistTracks:[]
    }))
  }

  //RENDER

  render(){
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar
          onSearch = {this.search}/>
          <div className="App-playlist">
            <SearchResults 
            searchResults = {this.state.searchResults}
            onAdd = {this.addTrack}
            onSearch = {this.search}
            />
            <PlayList 
            playlistName = {this.state.playlistName}
            playlistTracks = {this.state.playlistTracks}
            onRemove = {this.removeTrack}
            onNameChange = {this.updatePlaylistName}
            onSave = {this.savePlaylist}/>
          </div>
        </div>
      </div>
    );
  } 
}

export default App;
