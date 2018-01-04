import React from 'react';
import _ from 'lodash';

export default class AlertMessage extends React.Component {
  render () {
    let classes = 'alert-message' + ' ' + this.props.type;
    let errors =  this.props.errors;
    let formattedErrors = [];

    _.forEach(errors, function(value, key) {
      formattedErrors.push({
        title: key,
        message: value.join(', ')
      });
    });

    return (
      <div className='alert-container'>
        { formattedErrors.map((error) =>
          <p key={error.title + error.message} className={classes}> {error.title} - {error.message}</p>)
        }
      </div>
    );
  }
}