import React from 'react';
import PropTypes from 'prop-types';

import Folder from './Folder.jsx';

export default class FoldersBar extends React.Component {

  render () {
    const onFolderDelete = this.props.onDelete;

    return (
      <div className="folders-list">
        {
          this.props.folders.map((folder) =>
            <Folder
              key={folder.id}
              classes={this.props.active == folder.id ? 'folder active' : 'folder'}
              folder_id={folder.id}
              onDelete={onFolderDelete.bind(null, folder)}>
              {folder.title}
            </Folder>
          )
        }
      </div>
    );
  }
}

FoldersBar.propTypes = {
  active: PropTypes.number,
  folders: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string
    }),
  ),
  onDelete: PropTypes.func
}