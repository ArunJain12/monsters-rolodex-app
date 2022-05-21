/*
    Using Class Based Component.
*/

import React, {Component} from 'react';
import CardListComponent from './components/card-list/card-list.component';
import SearchBoxComponent from './components/search-box.js/search-box.component';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      monsters: [],
      searchValue: ''
    }
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then((users) => { this.setState(() => ({monsters: users})) });
  }

  handleSearchChange = (e) => {
    const searchValue = e.target.value;
    this.setState(() => ({ searchValue }));
  }

  render() {
    const {monsters, searchValue} = this.state;
    const {handleSearchChange} = this;
    const filteredMonsters = monsters.filter(monster => {
      return monster.name.toLowerCase().includes(searchValue.toLocaleLowerCase());
    });
    return (
      <div className="App">
        <h1 className='app-title'>MONSTERS ROLODEX</h1>
        <SearchBoxComponent 
          className='monsters-search-box'
          placeholder='search monsters'
          searchValue={searchValue} handleSearchChange={handleSearchChange} 
        />
        <CardListComponent monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
