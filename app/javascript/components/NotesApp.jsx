import React from 'react';
import axios from 'axios';
import NoteEditor from './NoteEditor.jsx';
import FolderForm from './FolderForm.jsx';
import NotesGrid from './NotesGrid.jsx';
import FoldersBar from './FoldersBar.jsx';

export default class NotesApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: props.notes,
      folders: props.folders
    };
    this.handleNoteAdd = this.handleNoteAdd.bind(this);
    this.handleFolderAdd = this.handleFolderAdd.bind(this);
    this.handleNoteDelete = this.handleNoteDelete.bind(this);
    this.handleFolderDelete = this.handleFolderDelete.bind(this);
  }

  handleNoteAdd (newNote) {
    let newNotes = [...this.state.notes, newNote];
    this.setState({ notes: newNotes });
  }

  handleFolderAdd (newFolder) {
    let newFolders = [...this.state.folders, newFolder];
    this.setState({ folders: newFolders });
  }

  handleNoteDelete (note) {
    let noteId = note.id;
    axios({
      method: 'delete',
      url: '/notes',
      params: {
        id: noteId
      },
      headers: {
        'X-CSRF-Token': document.querySelector("meta[name=csrf-token]").content
      }
    })
    .then((response) => {
      this.setState({ notes: response.data });
    });
  }

  handleFolderDelete (folder) {
    let folderId = folder.id;
    axios({
      method: 'delete',
      url: '/folders',
      params: {
        id: folderId
      },
      headers: {
        'X-CSRF-Token': document.querySelector("meta[name=csrf-token]").content
      }
    })
      .then((response) => {
        this.setState({ folders: response.data });
      });
  }

  render () {
    return (
      <div className="notes-app">
        <h2 className="app-header">NotesApp</h2>
        <NoteEditor onNoteAdd={this.handleNoteAdd} />
        <NotesGrid notes={this.state.notes} onDelete={ this.handleNoteDelete } />
        <div className="folders-bar">
          <FolderForm onFolderAdd={this.handleFolderAdd} />
          <FoldersBar folders={this.state.folders} onDelete={ this.handleFolderDelete } />
        </div>
      </div>
    );
  }
}