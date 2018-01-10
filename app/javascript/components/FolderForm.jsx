import React from 'react';
import axios from 'axios';

export default class FolderForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      error_status: false
    }
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleFolderAdd = this.handleFolderAdd.bind(this)
  }

  handleTitleChange (event) {
    this.setState({ title: event.target.value });
  }

  handleFolderAdd () {
    axios({
      method: 'post',
      url: '/folders',
      data: {
        folder: {
          title: this.state.title
        }
      },
      headers: {
        'X-CSRF-Token': document.querySelector("meta[name=csrf-token]").content
      }
    })
      .then((response) => {
        this.props.onFolderAdd(response.data);
        this.setState({ title: '' });
      })
      .catch((error) => {
        this.setState({
          title: '',
          error_status: true
        });
      });
  }

  render () {
    return (
      <div className="folder-form">
        <textarea
          placeholder="Folders title..."
          rows={1}
          className="textarea"
          value={this.state.title}
          onChange={this.handleTitleChange}
        />
        <button className="add-folder-button" onClick={this.handleFolderAdd}>+</button>
      </div>
    )
  }
}