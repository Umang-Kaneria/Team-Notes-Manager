import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NoteForm from './components/NoteForm';
import NotesList from './components/NotesList';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL;

function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editingNote, setEditingNote] = useState(null);

  const fetchNotes = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get(API_URL);
      console.log('Fetched notes:', res.data, {API_URL});
      setNotes(res.data);
    } catch (err) {
      setError('Failed to fetch notes');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleAdd = async (note) => {
    setLoading(true);
    setError('');
    try {
      await axios.post(API_URL, note);
      fetchNotes();
    } catch (err) {
      setError('Failed to add note');
    }
    setLoading(false);
  };

  const handleEdit = (note) => setEditingNote(note);

  const handleUpdate = async (note) => {
    setLoading(true);
    setError('');
    try {
      await axios.put(`${API_URL}/${note.id}`, note);
      setEditingNote(null);
      fetchNotes();
    } catch (err) {
      setError('Failed to update note');
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    setError('');
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchNotes();
    } catch (err) {
      setError('Failed to delete note');
    }
    setLoading(false);
  };

  return (
    <div className="app-container">
      <h1>Team Notes Manager</h1>
      <NoteForm
        onSubmit={editingNote ? handleUpdate : handleAdd}
        editingNote={editingNote}
        onCancel={() => setEditingNote(null)}
      />
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <NotesList
        notes={notes}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;
