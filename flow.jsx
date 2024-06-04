import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [characters, setCharacters] = useState([]);
  const [houses, setHouses] = useState([]);
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchCharacters();
    fetchHouses();
  }, [currentPage, pageSize]);

  const fetchCharacters = async () => {
    const response = await fetch(`https://anapioficeandfire.com/api/characters?page=${currentPage}&pageSize=${pageSize}`);
    const data = await response.json();
    setCharacters(data);
  };

  const fetchHouses = async () => {
    const response = await fetch(`https://anapioficeandfire.com/api/houses?page=${currentPage}&pageSize=${pageSize}`);
    const data = await response.json();
    setHouses(data);
  };

  const handlePageSizeChange = (e) => {
    setPageSize(parseInt(e.target.value));
    setCurrentPage(1); // Reset to first page when changing page size
  };

  const handlePageChange = (direction) => {
    if (direction === 'prev') {
      setCurrentPage(currentPage - 1);
    } else if (direction === 'next') {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Game of Thrones</h1>
      </header>
      <main>
        <section className="home">
          <h2>Home</h2>
          <p>General information about the application.</p>
        </section>

        <section className="characters">
          <h2>Characters</h2>
          <select onChange={handlePageSizeChange}>
            <option value="20">20</option>
            <option value="40">40</option>
            <option value="60">60</option>
          </select>
          {characters.map((character) => (
            <div key={character.url}>
              <p>{character.name || character.aliases[0]}</p>
              <p>{character.culture}</p>
              <p>{character.gender === 'male' ? '♂️' : '♀️'}</p>
            </div>
          ))}
          <div className="pagination">
            <button onClick={() => handlePageChange('prev')} disabled={currentPage === 1}>
              Prev
            </button>
            <span>{currentPage}</span>
            <button onClick={() => handlePageChange('next')}>Next</button>
          </div>
        </section>

        <section className="houses">
          <h2>Houses</h2>
          {houses.map((house) => (
            <div key={house.url}>
              <p>{house.name}</p>
              <p>{house.titles.join(', ')}</p>
              {house.currentLord && <p>Current Lord: {house.currentLord}</p>}
              {house.swornMembers && (
                <p>
                  Sworn Members:{' '}
                  {house.swornMembers.map((member, index) => (
                    <span key={index}>{member}</span>
                  ))}
                </p>
              )}
            </div>
          ))}
          <div className="pagination">
            <button onClick={() => handlePageChange('prev')} disabled={currentPage === 1}>
              Prev
            </button>
            <span>{currentPage}</span>
            <button onClick={() => handlePageChange('next')}>Next</button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;