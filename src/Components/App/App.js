import './App.css';
import SearchBar from '../../Components/SearchBar/SearchBar.js'
import SearchResults from '../../Components/SearchResults/SearchResults.js'
import PlayList from '../../Components/PlayList/PlayList.js'

function App() {
  return (
    <div>
  <h1>Ja<span className="highlight">mmm</span>ing</h1>
  <div className="App">
    <SearchBar/>
    <div className="App-playlist">
      <SearchResults/>
      <PlayList/>
    </div>
  </div>
</div>
  );
}

export default App;
