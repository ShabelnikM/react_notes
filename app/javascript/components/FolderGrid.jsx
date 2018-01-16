import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import FoldersBar from './FoldersBar.jsx';
import NotesGrid from './NotesGrid.jsx';

export default class FolderGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      folders: props.folders,
      notes: props.notes,
      error_status: false,
      error: ''
    };
    this.handleFolderDelete = this.handleFolderDelete.bind(this);
    this.handleNoteDelete = this.handleNoteDelete.bind(this);
    this.handleMessageClick = this.handleMessageClick.bind(this);
  }

  handleFolderDelete (folder) {
    let folderId = folder.id;
    axios({
      method: 'delete',
      url: `/folders/${folderId}`,
      headers: {
        'X-CSRF-Token': document.querySelector("meta[name=csrf-token]").content
      }
    })
      .then((response) => {
        this.setState({ folders: response.data });
      });
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
        <div className="folders-bar">
          <div className="home-link">
            <a href="/">Back to Home</a>
          </div>
          <FoldersBar folders={this.state.folders} active={this.props.folder.id} onDelete={ this.handleFolderDelete }/>
        </div>
      </div>
    );
  }
}

FolderGrid.propTypes = {
  folders: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string
    }),
  ),
  notes: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      color: PropTypes.string,
      text: PropTypes.string
    }),
  )
}