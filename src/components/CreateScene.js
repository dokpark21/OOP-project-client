import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './CreateScene.css';

const CreateScene = () => {
  const { comicId } = useParams();
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [acceptedScenes, setAcceptedScenes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAcceptedScenes = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/comics/${comicId}/acceptedScenes`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch scenes');
        }
        const scenesData = await response.json();
        setAcceptedScenes(scenesData);
      } catch (error) {
        console.error('Error fetching accepted scenes:', error);
      }
    };

    fetchAcceptedScenes();
  }, [comicId]);

  const handleGenerateScene = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/dalle/image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: description }),
      });
      if (!response.ok) {
        throw new Error('Failed to generate image');
      }
      const imageUrl = await response.json();
      setImageUrl(imageUrl);
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };

  const handleAcceptScene = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/comics/scenes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          description,
          imageUrl,
          comicId,
          userId: localStorage.getItem('userId'),
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to accept scene');
      }
      const newScene = await response.json();
      setAcceptedScenes([...acceptedScenes, newScene]);
      setDescription('');
      setImageUrl('');
    } catch (error) {
      console.error('Error accepting scene:', error);
    }
  };

  const handleRejectScene = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/comics/scenes/${comicId}/deleteScene`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error('Failed to delete scene');
      }
      setImageUrl('');
    } catch (error) {
      console.error('Error deleting scene:', error);
    }
  };

  const handleDone = () => {
    navigate('/home');
  };

  return (
    <div className="create-scene-container">
      <h1>Create Scene</h1>
      <div className="accepted-scenes">
        {acceptedScenes.map((scene) => (
          <div key={scene.id} className="accepted-scene-item">
            <img
              src={scene.imageUrl}
              alt={scene.description}
              className="accepted-scene-thumbnail"
            />
            <p>{scene.description}</p>
          </div>
        ))}
      </div>
      <div className="create-scene-form">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your scene"
        />
        <button onClick={handleGenerateScene}>Generate Scene</button>
        {imageUrl && (
          <div className="generated-scene">
            <img src={imageUrl} alt="Generated scene" />
            <div className="scene-actions">
              <button onClick={handleAcceptScene}>Accept</button>
              <button onClick={handleRejectScene}>Reject</button>
            </div>
          </div>
        )}
      </div>
      <button className="done-button" onClick={handleDone}>
        Done
      </button>
    </div>
  );
};

export default CreateScene;
