import React from 'react';

export default class Folder extends React.Component {
  render () {
    let url = '/folders/' + this.props.folder_id;
    return (
      <div className="folder">
        <span className="delete-folder" onClick={ this.props.onDelete }> x </span>
        <a href={url} style={{textDecoration: 'none', color: 'white'}}>{ this.props.children }</a>
      </div>
    );
  }
}