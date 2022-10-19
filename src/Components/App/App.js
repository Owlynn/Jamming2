import './App.css';
import SearchBar from '../../Components/SearchBar/SearchBar.js'
import SearchResults from '../../Components/SearchResults/SearchResults.js'
import PlayList from '../../Components/PlayList/PlayList.js'
import React from 'react';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state= {
      searchResults : [
        {name:'Nom', artist : 'Artiste',album : 'Album',id : '123'},
        {name:'Nom2', artist : 'Artiste2',album : 'Album2',id : '1232'},
        {name:'Nom3', artist : 'Artiste3',album : 'Album3',id : '1233'}
      ]
    }
  }

  render(){
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar/>
          <div className="App-playlist">
            <SearchResults searchResults = {this.state.searchResults}/>
            <PlayList/>
          </div>
        </div>
      </div>
    );
  } 
}

export default App;
