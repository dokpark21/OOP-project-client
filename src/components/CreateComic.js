import React, { useState } from 'react';

const CreateComic = () => {
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // API 호출하여 만화 장면 생성
    try {
      const response = await fetch(
        'http://localhost:8080/api/comics/createPost',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            description,
            comicId: 'someComicId',
            userId: 'someUserId',
          }), // 적절한 comicId와 userId를 설정
        }
      );
      if (response.ok) {
        alert('Comic scene created successfully');
      } else {
        alert('Error creating comic scene');
      }
    } catch (error) {
      console.error('Error creating comic scene:', error);
    }
  };

  return (
    <div>
      <h1>Create Your Own Comic</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Scene Description:
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <button type="submit">Create Scene</button>
      </form>
    </div>
  );
};

export default CreateComic;
