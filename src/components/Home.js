// src/components/Home.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [comics, setComics] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8080/api/comics/all', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then(async (comics) => {
        if (!comics || comics.length === 0) {
          console.error(
            'No comics found or response is not in expected format'
          );
          return;
        }
        // Fetch the first scene for each comic to use as a thumbnail
        const updatedComics = await Promise.all(
          comics.map(async (comic) => {
            const response = await fetch(
              'http://localhost:8080/api/comics/scenes',
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ comicId: comic.id }),
              }
            );
            const scenes = await response.json().catch(() => {
              console.log(comic.id);
              console.error('Failed to parse scenes response');
              return [];
            });
            comic.thumbnail = scenes.length > 0 ? scenes[0].imageUrl : null;
            return comic;
          })
        );
        setComics(updatedComics);
      })
      .catch((error) => console.error('Error fetching comics:', error));
  }, []);

  const handleCreateComic = () => {
    navigate('/create-comic');
  };

  return (
    <div className="home-container">
      <h1>Comics</h1>
      <div className="comic-list">
        {comics.map((comic) => (
          <div key={comic.id} className="comic-item">
            <h2>{comic.title}</h2>
            {comic.thumbnail && (
              <img
                src={comic.thumbnail}
                alt={comic.title}
                className="comic-thumbnail"
              />
            )}
            <p>Author: {comic.userId}</p>
          </div>
        ))}
      </div>
      <button onClick={handleCreateComic}>Create New Comic</button>
    </div>
  );
};

export default Home;
