import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState({ title: "", content: "", timestamp: "" });
  const [pinnedNotes, setPinnedNotes] = useState([]);
  const [isEditing, setIsEditing] = useState(false); // Flag to check if editing

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentNote({ ...currentNote, [name]: value });
  };

  const saveNote = () => {
    if (currentNote.title || currentNote.content) {
      const timestamp = new Date().toLocaleString();

      if (isEditing) {
        // If editing, update the existing note
        const updatedNotes = notes.map((note) =>
          note.timestamp === currentNote.timestamp ? { ...currentNote, timestamp } : note
        );
        setNotes(updatedNotes);
        setIsEditing(false);
      } else {
        // If not editing, add new note
        setNotes([{ ...currentNote, timestamp }, ...notes]);
      }

      setCurrentNote({ title: "", content: "", timestamp: "" });
    }
  };

  const deleteNote = (index) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  const pinNote = (index) => {
    const noteToPin = notes[index];
    setNotes(notes.filter((_, i) => i !== index));
    setPinnedNotes([noteToPin, ...pinnedNotes]);
  };

  const unpinNote = (index) => {
    const noteToUnpin = pinnedNotes[index];
    setPinnedNotes(pinnedNotes.filter((_, i) => i !== index));
    setNotes([noteToUnpin, ...notes]);
  };

  const editNote = (index) => {
    const noteToEdit = notes[index];
    setCurrentNote({ ...noteToEdit });
    setIsEditing(true); // Set editing mode to true
  };

  return (
    <div className="app">
      <header className="app-header">Shareable Notes App</header>
      <main className="app-main">
        <div className="editor">
          <input
            type="text"
            name="title"
            value={currentNote.title}
            placeholder="Note Title"
            onChange={handleInputChange}
            className="note-title"
          />
          <textarea
            name="content"
            value={currentNote.content}
            placeholder="Write your note here..."
            onChange={handleInputChange}
            className="note-content"
          ></textarea>
          <button onClick={saveNote} className="save-btn">
            {isEditing ? "Update Note" : "Save Note"}
          </button>
        </div>

        <div className="notes-list">
          <h2>Pinned Notes</h2>
          {pinnedNotes.length === 0 && <p>No pinned notes available.</p>}
          {pinnedNotes.map((note, index) => (
            <div key={index} className="note pinned">
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <small className="timestamp">{note.timestamp}</small>
              <button onClick={() => unpinNote(index)} className="unpin-btn">Unpin</button>
              <button onClick={() => editNote(index)} className="edit-btn">Edit</button>
            </div>
          ))}

          <div style={{ marginBottom: "1rem" }}></div>

          <h2>All Notes</h2>
          {notes.length === 0 && <p>No notes available.</p>}
          {notes.map((note, index) => (
            <div key={index} className="note">
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <small className="timestamp">{note.timestamp}</small>
              <button onClick={() => pinNote(index)} className="pin-btn">Pin</button>
              <button onClick={() => deleteNote(index)} className="delete-btn">Delete</button>
              <button onClick={() => editNote(index)} className="edit-btn">Edit</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default App;
