import {useState, useEffect} from 'react';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box.js/search-box.component';
import './App.css';


const App = () => {
  const [monsters, setMonsters] = useState([]);
  const [searchFieldValue, setSearchFieldValue] = useState('');
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then((users) => setMonsters(users));
  }, []);

  useEffect(() => {
    const filteredMonsters = monsters.filter(monster => {
      return monster.name.toLowerCase().includes(searchFieldValue);
    });
    setFilteredMonsters(filteredMonsters);
  }, [monsters, searchFieldValue]);

  const handleSearchChange = (e) => {
    const searchValue = e.target.value.toLocaleLowerCase();
    setSearchFieldValue(searchValue);
  }

  return (
    <div className="App">
      <h1 className='app-title'>MONSTERS ROLODEX</h1>
      <SearchBox
        className='monsters-search-box'
        placeholder='search monsters'
        searchValue={searchFieldValue} handleSearchChange={handleSearchChange} 
      />
      <CardList monsters={filteredMonsters} />
    </div>
    );
}

export default App;
