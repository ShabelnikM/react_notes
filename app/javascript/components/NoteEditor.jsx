import React from 'react';
import axios from 'axios';
import AlertMessage from './AlertMessage';

export default class NoteEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      error_status: false,
      errors: ''
    }
    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleNoteAdd = this.handleNoteAdd.bind(this)
  }

  handleTextChange (event) {
    this.setState({ text: event.target.value });
  }

  handleNoteAdd () {
    axios({
      method: 'post',
      url: '/notes',
      data: {
        note: {
          text: this.state.text,
          color: 'yellow'
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
        <div style={{'display': 'flex', 'flex-direction': 'row', 'justify-content': 'right'}}>
          { this.state.error_status &&
            <AlertMessage type="warning" errors={this.state.errors}/>
          }
          <button className="add-button" onClick={this.handleNoteAdd}>Add</button>
        </div>
      </div>
    )
  }
}