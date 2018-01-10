import React from 'react';
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