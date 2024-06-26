import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ComicDetail.css';

const ComicDetail = () => {
  const { id } = useParams();
  const [scenes, setScenes] = useState([]);

  useEffect(() => {
    const fetchScenes = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/comics/${id}/acceptedScenes`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch scenes');
        }
        const scenesData = await response.json();
        setScenes(scenesData);
      } catch (error) {
        console.error('Error fetching scenes:', error);
      }
    };

    fetchScenes();
  }, [id]);

  return (
    <div className="comic-detail-container">
      <h1>Comic Detail</h1>
      {scenes.length > 0 ? (
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
      ) : (
        <p>No scenes found.</p>
      )}
    </div>
  );
};

export default ComicDetail;
