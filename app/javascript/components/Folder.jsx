import React from 'react';
import PropTypes from 'prop-types';

export default class Folder extends React.Component {
  render () {
    let classes = this.props.classes;
    let url = `/folders/${this.props.folder_id}`;
    return (
      <div className={classes}>
        <span className="delete-folder" onClick={ this.props.onDelete }> x </span>
        <a href={url} style={{textDecoration: 'none', color: 'white'}}>{ this.props.children }</a>
      </div>
    );
  }
}

Folder.propTypes = {
  classes: PropTypes.string,
  folder_id: PropTypes.number,
  onDelete: PropTypes.func
}