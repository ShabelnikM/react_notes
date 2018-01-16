import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import AlertMessage from './AlertMessage';

export default class NoteEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      color: 'yellow',
      error_status: false,
      errors: ''
    }
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleNoteAdd = this.handleNoteAdd.bind(this);
    this.handleMessageClick = this.handleMessageClick.bind(this);
  }

  handleTextChange (event) {
    this.setState({ text: event.target.value });
  }

  handleColorChange (event) {
    this.setState({ color: event.target.value });
  }

  handleNoteAdd () {
    axios({
      method: 'post',
      url: '/notes',
      data: {
        note: {
          text: this.state.text,
          color: this.state.color
        }
      },
      headers: {
        'X-CSRF-Token': document.querySelector("meta[name=csrf-token]").content
      }
    })
    .then((response) => {
      this.props.onNoteAdd(response.data);
      this.setState({ text: '' });
    })
    .catch((error) => {
      this.setState({
        text: '',
        error_status: true,
        errors: error.response.data
      });
    });
  }

  handleMessageClick () {
    this.setState({
      error_status: false,
      errors: ''
    });
  }

  render () {
    return (
      <div className="note-editor">
        <textarea
          placeholder="Enter your note here..."
          rows={5}
          className="textarea"
          value={this.state.text}
          onChange={this.handleTextChange}
        />
        <div className="color-picker">
          Select your note color:
          <input
            type="color"
            value={this.state.color}
            onChange={this.handleColorChange}
          />
        </div>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'right'}}>
          { this.state.error_status &&
            <AlertMessage type="warning" errors={this.state.errors} onClick={this.handleMessageClick}/>
          }
          <button className="add-button" onClick={this.handleNoteAdd}>Add</button>
        </div>
      </div>
    )
  }
}

NoteEditor.propTypes = {
  onNoteAdd: PropTypes.func
}