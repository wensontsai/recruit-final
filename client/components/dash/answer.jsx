import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

// import { selectDisplay } from '../../actions/displays';

import './dash.scss';

class Answer extends Component {
    render (){
      const { 
          displays,
          selectDisplay 
      } = this.props;

      return (
        <div className='answer-view'>
          <div>
            Answer area
          </div>
          <textarea className='' />
          <div className='submit-answer'>
            <button className='btn btn-sm'>Submit Answer</button>
          </div>
        </div>
      );
    }
}

export default connect(
  (state) => ({ displays: state.displays }),
  // { selectDisplay }
)(Answer);
