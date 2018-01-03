import React from 'react';
import NoteEditor from './NoteEditor.jsx';
import NotesGrid from './NotesGrid.jsx';

export default class NotesApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { notes: props.notes };
    this.handleNoteAdd = this.handleNoteAdd.bind(this);
    this.handleNoteDelete = this.handleNoteDelete.bind(this);
  }

  handleNoteAdd (newNote) {
    let newNotes = [...this.state.notes, newNote];
    this.setState({ notes: newNotes });
  }

  handleNoteDelete (note) {
    const noteId = note.id;
    const newNotes = this.state.notes.filter((note) => note.id !== noteId);
    this.setState({ notes: newNotes });
  }

  render () {
    return (
      <div className="notes-app">
        <h2 className="app-header">NotesApp</h2>
        <NoteEditor onNoteAdd={this.handleNoteAdd} />
        <NotesGrid notes={this.state.notes} onDelete={ this.handleNoteDelete } />
      </div>
    );
  }
}