
```markdown
# 📝 NotesSync - Collaborative Note-Taking App

Welcome to **NotesSync**, a powerful and user-friendly note-taking app designed for seamless collaboration! 🚀

## Features

- 🗒️ **Create and Manage Notes**: Easily create, edit, and delete notes.
- 📂 **Organize with Folders**: Group your notes into folders for better organization.
- 🚮 **Trash Bin**: Recover deleted notes from the trash bin.
- 📋 **Archieve Notes**: Archieve notes that you want to access later.
- 👫 **Collaborative Notes**: Share notes with other users by email and allow them to edit.
- 📜 **Shared Notes Management**: View and manage notes shared with others.

## Getting Started

### Prerequisites

- Node.js
- MongoDB Atlas Account
```

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/SujalSharma-tech/NotesSync-Frontend.git
   ```

2. Navigate to the project directory:
   ```bash
   cd NotesSync-Frontend
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file and add your MongoDB Atlas connection string and other environment variables:
   ```env
   MONGODB_URI=your_mongodb_atlas_connection_string
   PORT=4000
   ```

### Running the App

1. Start the backend server:
   ```bash
   npm run server
   ```

2. Start the frontend development server:
   ```bash
   npm start
   ```

3. Open your browser and navigate to `http://localhost:1234`.

## API Endpoints

### User

- **Register**: `POST /api/v1/user/register`
- **Login**: `POST /api/v1/user/login`
- **Logout**: `GET /api/v1/user/logout`
- **Get Profile**: `GET /api/v1/user/getmyprofile`

### Notes

- **Create Note**: `POST /api/v1/note`
- **Get My Notes**: `GET /api/v1/note/mynotes`
- **Share Note**: `POST /api/v1/note/sharenote`
- **Remove User from Shared Note**: `POST /api/v1/note/removeshare`
- **Get Notes Shared With Me**: `GET /api/v1/note/sharedwithme`

### Folders

- **Create Folder**: `POST /api/v1/folder`
- **Get My Folders**: `GET /api/v1/folder/myfolders`

## Usage

### Creating a Note

1. Navigate to the home page.
2. Click on the "Add Note" button.
3. Enter the title and content of your note.
4. Save the note.

### Sharing a Note

1. Click on share button on note to open share modal.
2. Enter the email address of the user you want to share the note with.
3. Click "Share".

### Removing a User from a Shared Note

1. Open the shared note.
2. Click the "Remove" button next to the user's email address.

## Contributing

We welcome contributions! 🎉 Please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`
3. Make your changes and commit them: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature-name`
5. Open a pull request.

## License

This project is licensed under the MIT License. 📄

---

Made with ❤️ by [Sujal](https://github.com/SujalSharma-tech)
```

