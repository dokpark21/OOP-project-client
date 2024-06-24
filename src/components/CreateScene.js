import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './CreateScene.css';

const CreateScene = () => {
  const { comicId } = useParams(); // Get the comic ID from the URL parameters
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [sceneId, setSceneId] = useState(null);
  const [acceptedScenes, setAcceptedScenes] = useState([]);

  useEffect(() => {
    const fetchAcceptedScenes = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/comics/${comicId}/acceptedScenes`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        const scenes = await response.json();
        setAcceptedScenes(scenes);
      } catch (error) {
        console.error('Error fetching accepted scenes:', error);
      }
    };

    fetchAcceptedScenes();
  }, [comicId]);

  const handleCreateScene = async () => {
    if (!description) {
      alert('Please enter a description for the scene.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/comics/scenes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          description,
          comicId,
          userId: localStorage.getItem('userId'),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create scene');
      }

      const scene = await response.json();
      setImageUrl(scene.imageUrl);
      setSceneId(scene.id); // Store the scene ID for deletion if needed
    } catch (error) {
      console.error('Error creating scene:', error);
      alert('Error creating scene. Please try again.');
    }
  };

  const handleAcceptScene = () => {
    alert('Scene accepted!');
    setDescription('');
    setImageUrl(null);
    setSceneId(null);
  };

  const handleRejectScene = async () => {
    if (sceneId) {
      try {
        const response = await fetch(
          `http://localhost:8080/api/comics/scenes/${sceneId}`,
          {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to delete scene');
        }

        alert('Scene rejected and deleted.');
        setDescription('');
        setImageUrl(null);
        setSceneId(null);
      } catch (error) {
        console.error('Error deleting scene:', error);
        alert('Error deleting scene. Please try again.');
      }
    }
  };

  return (
    <div className="create-scene-container">
      <h1>Create a Scene for Your Comic</h1>
      <div className="accepted-scenes">
        {acceptedScenes.map((scene) => (
          <div key={scene.id} className="accepted-scene">
            <img src={scene.imageUrl} alt="Accepted scene" />
            <p>{scene.description}</p>
          </div>
        ))}
      </div>
      <textarea
        placeholder="Enter scene description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <button onClick={handleCreateScene}>Create Scene</button>
      {imageUrl && (
        <div className="scene-image">
          <h2>Generated Scene Image</h2>
          <img src={imageUrl} alt="Generated scene" />
          <div className="scene-buttons">
            <button onClick={handleAcceptScene}>Accept</button>
            <button onClick={handleRejectScene}>Reject</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateScene;
