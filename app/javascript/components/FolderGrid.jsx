import React from 'react';
import axios from 'axios';
import NotesGrid from './NotesGrid.jsx';

export default class FolderGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: props.notes,
      error_status: false,
      error: ''
    };
    this.handleNoteDelete = this.handleNoteDelete.bind(this)
    this.handleMessageClick = this.handleMessageClick.bind(this)
  }

  handleNoteDelete (note) {
    let noteId = note.id;
    let folderId = this.props.folder.id;
    axios({
      method: 'delete',
      url: `${folderId}/notes/${noteId}`,
      headers: {
        'X-CSRF-Token': document.querySelector("meta[name=csrf-token]").content
      }
    })
    .then((response) => {
      this.setState({ notes: response.data });
    })
    .catch((error) => {
      this.setState({
        error_status: true,
        error: error.response.data.error
      });
    });
  }

  handleMessageClick () {
    this.setState({
      error_status: false,
      error: ''
    });
  }

  render () {
    return (
      <div className="notes-app">
        <h2 className="app-header">Folder: {this.props.folder.title}</h2>
        { this.state.error_status &&
          <p className="alert-message warning large" onClick={this.handleMessageClick}>{this.state.error}</p>
        }
        <NotesGrid notes={this.state.notes} onDelete={this.handleNoteDelete} />
      </div>
    );
  }
}