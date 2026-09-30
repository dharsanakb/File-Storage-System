# File Storage System

A web application for storing and managing personal files. Users register an account, log in, and manage their own files through a browser interface: upload, view, rename, download, and delete. Built with Node.js, Express, EJS, and SQLite.

## Features

- User registration and login with bcrypt password hashing
- Session-based authentication using express-session
- File upload through a browser form (express-fileupload)
- Per-user file listing
- Open files in the browser, download, rename, and delete
- SQLite database with automatic table creation on startup
- Server-rendered views using EJS templates

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express 4 |
| Templating | EJS |
| Database | SQLite (sqlite3) |
| Authentication | express-session, bcrypt |
| File Handling | express-fileupload |
| Development | nodemon |

## Project Structure

```
File_Storage/
├── index.js                     Application entry point
├── package.json
├── config/
│   └── database.js              SQLite connection and table creation
├── controllers/
│   ├── userController.js        Registration, login, logout
│   └── fileController.js        Upload, list, view, rename, download, delete
├── models/
│   ├── userModel.js             User queries
│   └── fileModel.js             File queries
├── routes/
│   ├── index.js                 File routes
│   └── user.js                  Authentication routes
├── views/
│   ├── index.ejs                File dashboard
│   ├── login.ejs                Landing page
│   ├── login1.ejs               Login form
│   └── register.ejs             Registration form
├── public/
│   ├── styles.css
│   └── background.jpg
├── database/
│   └── sqlite.db                SQLite database file
└── uploads/                     Uploaded files are stored here
```

## Getting Started

### Prerequisites

- Node.js 16 or later
- npm

### Installation

```bash
git clone <repository-url>
cd File_Storage
npm install
```

### Running the Application

Development mode with automatic restart:

```bash
npm run server
```

Standard mode:

```bash
node index.js
```

The application runs at `http://localhost:8000`.

On first run, the `users` and `files` tables are created automatically. The `database/` and `uploads/` directories must exist before starting the server.

## Usage

1. Open `http://localhost:8000/user/register` and create an account.
2. Log in at `/user/login1`.
3. From the dashboard, upload a file using the form at the bottom of the page.
4. Use the buttons next to each file to open, rename, download, or delete it.
5. Log out using the button in the top navigation bar.

## Routes

### Authentication

| Method | Route | Description |
|---|---|---|
| GET | `/user` | Redirects to the registration page |
| GET | `/user/login` | Landing page with login and register options |
| GET | `/user/register` | Registration form |
| POST | `/user/register` | Create a new account |
| GET | `/user/login1` | Login form |
| POST | `/user/login1` | Authenticate and start a session |
| GET | `/user/logout` | Destroy the session |

### Files

| Method | Route | Description |
|---|---|---|
| GET | `/` | List the logged-in user's files |
| POST | `/upload` | Upload a file |
| GET | `/file/:id` | Open a file in the browser |
| POST | `/file/:id/rename` | Rename a file |
| GET | `/files/:id/download` | Download a file |
| POST | `/file/:id/delete` | Delete a file record |

Unauthenticated requests to `/` and `/upload` are redirected to the login page.

## Database Schema

**users**

| Column | Type | Constraints |
|---|---|---|
| id | INTEGER | Primary key |
| username | TEXT | Unique |
| password | TEXT | bcrypt hash |

**files**

| Column | Type | Description |
|---|---|---|
| id | INTEGER | Primary key |
| user_id | INTEGER | Owner of the file |
| file_name | TEXT | Display name |
| file_path | TEXT | Location on disk |

## Configuration

| Setting | Location | Default |
|---|---|---|
| Server port | `index.js` | `8000` |
| Session secret | `index.js` | `your-secret-key` (replace before deployment) |
| Database path | `config/database.js` | `database/sqlite.db` |
| Upload directory | `controllers/fileController.js` | `uploads/` |
