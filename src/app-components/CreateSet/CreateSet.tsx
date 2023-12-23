import React, { useState } from 'react';
import Editor from "../RichEditor/Editor"

export const CreateSet = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [flashcards, setFlashcards] = useState([{ term: '', description: '' }, { term: '', description: '' }]);

  const handleEditorChange = (index, field, value) => {
    setFlashcards(flashcards.map((flashcard, i) => i === index ? { ...flashcard, [field]: value } : flashcard));
  };

  const handleSubmit = () => {
    const data = {
      title,
      description,
      flashcards
    };
    console.log(data);
  };

  return (
    <div>
      <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
      <input type="text" value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
      {flashcards.map((flashcard, index) => (
        <div key={index}>
          <Editor value={flashcard.term} onChange={value => handleEditorChange(index, 'term', value)} />
          <Editor value={flashcard.description} onChange={value => handleEditorChange(index, 'description', value)} />
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}