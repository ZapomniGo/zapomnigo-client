import React, { useState } from 'react';
import Editor from "../RichEditor/Editor"
import Dashboard from '../Dashboard/Dashboard';
import { WithContext as ReactTags } from 'react-tag-input';

export const CreateSet = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [flashcards, setFlashcards] = useState([{ term: '', description: '' }]);
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState(''); // Add this line

  const suggestions = [
    { id: 'Math', text: 'Math' },
    { id: 'Science', text: 'Science' },
    { id: 'History', text: 'History' },
  ];

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    if (suggestions.find(suggestion => suggestion.id === tag.id)) {
      setTags([tag]);
      setInputValue(tag.text); // Keep the input value after selecting a tag
    }
  };

  const handleInputChange = (value) => {
    setInputValue(value); // Add this line
  };

  const handleInstitutionDelete = (i) => {
    setInstitutions(institutions.filter((institution, index) => index !== i));
  };
  
  const handleInstitutionAddition = (institution) => {
    if (institutionSuggestions.find(suggestion => suggestion.id === institution.id)) {
      setInstitutions([institution]);
    }
  };

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
      flashcards,
      tags
    };
    console.log(data);
  };

  const [institutions, setInstitutions] = useState([]);

  const institutionSuggestions = [
    { id: 'Institution1Institution1Institution1', text: 'Institution1Institution1Institution1' },
    { id: 'Institution2', text: 'Institution2' },
  ];

  return (
    <Dashboard>
      <div className='create-set-wrapper'>
        <h1>Create a new set</h1>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter a title"  className='title'/>
        <div className='other-info'>
          <div className='description'>
            <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description"  />
          </div>
          <div className='tags'>
            <ReactTags
              tags={tags}
              suggestions={suggestions}
              handleDelete={handleDelete}
              handleAddition={handleAddition}
              placeholder="Add category"
            />
            <ReactTags
              tags={institutions}
              suggestions={institutionSuggestions}
              handleDelete={handleInstitutionDelete}
              handleAddition={handleInstitutionAddition}
              placeholder="Add institution"
            />
          </div>
        </div>
        {flashcards.map((flashcard, index) => (
          <div key={index} className='flashcard'>
            <Editor value={flashcard.term} onChange={value => handleEditorChange(index, 'term', value)} placeholder={undefined} />
            <Editor value={flashcard.description} onChange={value => handleEditorChange(index, 'description', value)} placeholder={undefined} />
          </div>
        ))}
        <button onClick={addFlashcard} className='add-card'>Add card</button>
        <button onClick={handleSubmit} className='submit'>Submit</button>
        {tags.map((tag, index) => (
          <span key={index} className='tag'>
            {tag.text}
            <button onClick={() => handleDelete(index)}>X</button>
          </span>
        ))}
        {institutions.map((institution, index) => (
          <span key={index} className='institution'>
            {institution.text}
            <button onClick={() => handleInstitutionDelete(index)}>Delete</button>
          </span>
        ))}
      </div>
    </Dashboard>
  )
}