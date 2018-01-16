import React from 'react';
import Masonry from 'masonry-layout';
import PropTypes from 'prop-types';

import Note from './Note.jsx';

export default class NotesGrid extends React.Component {

  componentDidMount () {
    let grid = this.refs.grid;
    this.msnry = new Masonry( grid, {
      itemSelector: '.note',
      columnWidth: 200,
      gutter: 10
    });
  }

  componentDidUpdate (prevProps) {
    if (this.props.notes.length !== prevProps.notes.length) {
      this.msnry.reloadItems();
      this.msnry.layout();
    }
  }

  render () {
    const onNoteDelete = this.props.onDelete;

    return (
      <div className="notes-grid" ref="grid">
        {
          this.props.notes.map((note) =>
            <Note
              key={note.id}
              color={note.color}
              onDelete={onNoteDelete.bind(null, note)}>
              {note.text}
            </Note>
          )
        }
      </div>
    );
  }
}

NotesGrid.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      color: PropTypes.string,
      text: PropTypes.string
    }),
  ),
  onDelete: PropTypes.func
}