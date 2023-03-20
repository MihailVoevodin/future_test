import {Book} from 'Components/Book/Book';
import {BooksList} from 'Components/BooksList/BooksList';
import {Filters} from 'Components/Filters/Filters';
import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import {Search} from 'Components/Search/Search';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <header>
                    <h1 className='title'>Search for books</h1>
                    <Search />
                    <Filters />
                </header>
                <main>
                    <Routes>
                        <Route path='/' element={<BooksList />} />
                        <Route path='/book/:id' element={<Book />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}

export default App;
