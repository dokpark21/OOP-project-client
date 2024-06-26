import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateComic = () => {
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  const handleCreateComic = async () => {
    const userId = localStorage.getItem('userId'); // Assuming userId is stored in localStorage after login
    console.log('userId:', userId);
    if (!title) {
      alert('Please enter a title for the comic.');
      return;
    }

    try {
      const response = await fetch(
        'http://localhost:8080/api/comics/createComic',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Add your token here
          },
          body: JSON.stringify({ title, userId }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to create comic');
      }

      const comic = await response.json();
      navigate(`/${comic.id}/createScene`); // Created comic's scene creation page
    } catch (error) {
      console.error('Error creating comic:', error);
      alert('Error creating comic. Please try again.');
    }
  };

  return (
    <div className="create-comic-container">
      <h1>Create Your Own Comic</h1>
      <input
        type="text"
        placeholder="Enter comic title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={handleCreateComic}>Create Comic</button>
    </div>
  );
};

export default CreateComic;
