import './App.css';
import SearchBar from '../../Components/SearchBar/SearchBar.js'
import SearchResults from '../../Components/SearchResults/SearchResults.js'
import PlayList from '../../Components/PlayList/PlayList.js'
import React from 'react';

class App extends React.Component{
  //CONSTRUCTOR
  constructor(props){
    super(props);
    this.state= {
      searchResults : [
        {name:'Nom', artist : 'Artiste',album : 'Album',id : '123'},
        {name:'Nom2', artist : 'Artiste2',album : 'Album2',id : '1232'},
        {name:'Nom3', artist : 'Artiste3',album : 'Album3',id : '1233'}
      ],
      playlistName : 'lala',
      playlistTracks : [
      {name:'Nom', artist : 'Artiste',album : 'Album',id : '1234'},
      {name:'Nom2', artist : 'Artiste2',album : 'Album2',id : '12325'},
      {name:'Nom3', artist : 'Artiste3',album : 'Album3',id : '12336'}
      ]
    }

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }
  //METHODS
  addTrack(track){
    let tracks = this.state.playlistTracks;
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }else{
      tracks.push(track);
      this.setState({
        playlistTracks : tracks
      })
    }
  }

  removeTrack(track){
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id)

    this.setState({
      playlistTracks:tracks,
    })
  }

  search(term){
    console.log(term);
  }

  updatePlaylistName(name){
    this.setState({
      playlistName:name
    })
  }

  savePlaylist(){
    let trackURIs = this.state.playlistTracks.map(track => track.uri)
  }
  //RENDER

  render(){
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar/>
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
            />
          </div>
        </div>
      </div>
    );
  } 
}

export default App;
