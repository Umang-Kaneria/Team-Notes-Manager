import React, { useState, useEffect } from 'react';
import './NoteForm.css';

function NoteForm({ onSubmit, editingNote, onCancel }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setDescription(editingNote.description);
    } else {
      setTitle('');
      setDescription('');
    }
    setError('');
  }, [editingNote]);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setError('Title and description are required');
      return;
    }
    if (description.length > 500) {
      setError('Description cannot exceed 500 characters');
      return;
    }
    onSubmit({
      id: editingNote?.id,
      title,
      description,
    });
    setTitle('');
    setDescription('');
    setError('');
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <h2>{editingNote ? 'Edit Note' : 'Add Note'}</h2>
      <div>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>
      <div>
        <textarea
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">
        {editingNote ? 'Update' : 'Add'}
      </button>
      {editingNote && (
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      )}
    </form>
  );
}

export default NoteForm;
