import express from 'express';
import cors from 'cors';
import pool from './db.js';

const app = express();
app.use(cors());
app.use(express.json());



// GET /notes
app.get('/notes', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM notes ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
});

// POST /notes
app.post('/notes', async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description required' });
  }
  try {
    const result = await pool.query(
      'INSERT INTO notes (title, description, updated_at) VALUES ($1, $2, CURRENT_TIMESTAMP) RETURNING *',
      [title, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create note' });
  }
});

// PUT /notes/:id
app.put('/notes/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description required' });
  }
  try {
    const result = await pool.query(
      'UPDATE notes SET title = $1, description = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *',
      [title, description, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Note not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update note' });
  }
});

// DELETE /notes/:id
app.delete('/notes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM notes WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Note not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete note' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
