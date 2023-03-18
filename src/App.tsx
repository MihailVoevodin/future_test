import {BooksList} from 'Components/BooksList/BooksList';
import React from 'react';
import './App.css';
import {Search} from 'Components/Search/Search';

function App() {
  return (
    <div className="App">
        <h1 className='title'>Search for books</h1>
        <Search />
        <BooksList />
    </div>
  );
}

export default App;
