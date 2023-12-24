import React, { useState } from 'react';
import Editor from "../RichEditor/Editor"
import Dashboard from '../Dashboard/Dashboard';

export const CreateSet = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [flashcards, setFlashcards] = useState([{ term: '', description: '' }]);

  const handleEditorChange = (index, field, value) => {
    setFlashcards(flashcards.map((flashcard, i) => i === index ? { ...flashcard, [field]: value } : flashcard));
  };

  const addFlashcard = () => {
    setFlashcards([...flashcards, { term: '', description: '' }]);
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
    <Dashboard>
    <div className='create-set-wrapper'>
      <h1>Create Set</h1>
      <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
      <input type="text" value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
      {flashcards.map((flashcard, index) => (
        <div key={index}>
          <Editor value={flashcard.term} onChange={value => handleEditorChange(index, 'term', value)} placeholder={undefined} />
          <Editor value={flashcard.description} onChange={value => handleEditorChange(index, 'description', value)} placeholder={undefined} />
        </div>
      ))}
      <button onClick={addFlashcard}>Add Flashcard</button>
      <button onClick={handleSubmit}>Submit</button>
    </div>
    </Dashboard>
  )
}