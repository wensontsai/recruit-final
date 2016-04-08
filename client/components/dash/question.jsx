import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import './dash.scss';

class Question extends Component {
  constructor (props) {
    super (props);
  }

  render (){
    return (
        <div className='question-view'>
          <div className='header'>
            Question prompt:
          </div>
            <div className='question-prompt'>
              "{ this.props.dash.data.currentPrompt }"
            </div>
        </div>
    );
  }
}

export default connect(
  (state) => ({ dash: state.dash })
)(Question);
