import React from 'react';
import axios from 'axios';
import NotesGrid from './NotesGrid.jsx';

export default class FolderGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: props.notes
    };
    this.handleNoteDelete = this.handleNoteDelete.bind(this);
  }

  handleNoteDelete (note) {
    let noteId = note.id;
    let folderId = this.props.folder_id;
    axios({
      method: 'delete',
      url: `${folderId}/notes/${noteId}`,
      headers: {
        'X-CSRF-Token': document.querySelector("meta[name=csrf-token]").content
      }
    })
    .then((response) => {
      this.setState({ notes: response.data });
    });
  }

  render () {
    return (
      <div className="notes-app">
        <h2 className="app-header">NotesApp</h2>
        <NotesGrid notes={this.state.notes} onDelete={ this.handleNoteDelete } />
      </div>
    );
  }
}