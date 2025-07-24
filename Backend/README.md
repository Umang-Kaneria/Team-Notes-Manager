# Team Notes Manager Backend

This is the backend for the Team Notes Manager app. It uses Node.js, Express, PostgreSQL, and TypeORM for database operations.

## Features
- REST API for notes (CRUD)
- PostgreSQL database
- Environment variable configuration via .env

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure your database in `.env`.
3. Start the server:
   ```bash
   npm run dev
   ```

## API Endpoints
- `GET /notes` - List all notes
- `POST /notes` - Create a new note
- `PUT /notes/:id` - Update a note
- `DELETE /notes/:id` - Delete a note
