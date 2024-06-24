import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ComicDetail.css';

const ComicDetail = () => {
  const { comicId } = useParams();
  const [scenes, setScenes] = useState([]);

  useEffect(() => {
    const fetchScenes = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/comics/${comicId}/acceptedScenes`
        );
        const scenesData = await response.json();
        setScenes(scenesData);
      } catch (error) {
        console.error('Error fetching scenes:', error);
      }
    };

    fetchScenes();
  }, [comicId]);

  return (
    <div className="comic-detail-container">
      <h1>Comic Detail</h1>
      <div className="scenes-list">
        {scenes.map((scene) => (
          <div key={scene.id} className="scene-item">
            <img
              src={scene.imageUrl}
              alt={scene.description}
              className="scene-thumbnail"
            />
            <p>{scene.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComicDetail;
