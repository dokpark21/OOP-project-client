import React, { useEffect, useState } from 'react';

const Home = () => {
  const [comics, setComics] = useState([]);

  useEffect(() => {
    const fetchComics = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/comics/all');
        const comicsData = await response.json();

        // Fetch first scene for each comic
        const comicsWithThumbnails = await Promise.all(
          comicsData.map(async (comic) => {
            const sceneResponse = await fetch(
              `http://localhost:8080/api/comics/${comic.id}/firstScene`
            );
            const firstScene = await sceneResponse.json();
            return {
              ...comic,
              thumbnailUrl: firstScene ? firstScene.imageUrl : null,
            };
          })
        );

        setComics(comicsWithThumbnails);
      } catch (error) {
        console.error('Error fetching comics:', error);
      }
    };

    fetchComics();
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <div className="comics-list">
        {comics.map((comic) => (
          <div key={comic.id} className="comic-item">
            <h2>{comic.title}</h2>
            {comic.thumbnailUrl ? (
              <img
                src={comic.thumbnailUrl}
                alt={comic.title}
                className="thumbnail"
              />
            ) : (
              <p>No thumbnail available</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
