import React from 'react';
import './NotesList.css';

function NotesList({ notes, onEdit, onDelete }) {
  if (!notes.length) return <p>No notes found.</p>;
  return (
    <div className="notes-list">
      {notes.map(note => (
        <div key={note.id} className="note-item">
          <h3>{note.title}</h3>
          <p>{note.description}</p>
          <small>
            Created: {note.created_at ? new Date(note.created_at).toLocaleString() : 'N/A'}<br />
            Updated: {note.updated_at ? new Date(note.updated_at).toLocaleString() : 'N/A'}
          </small>
          <div className="note-actions">
            <button onClick={() => onEdit(note)}>
              Edit
            </button>
            <button onClick={() => onDelete(note.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default NotesList;
