import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

// import { selectDisplay } from '../../actions/displays';

import Nav from '../nav/nav';
import AddCandidate from './addCandidate';

import './candidates.scss';

class Candidates extends Component {
  render (){
    const {
        
    } = this.props;

    return (
        <div className='display-all-container'>
            <Nav />
            <div className='page'>
              <AddCandidate />
              <div className='candidates-list'>
                candidates view
              </div>
            </div>
        </div>
    );
  }
}

export default connect(
  (state) => ({ displays: state.displays }),
  // { selectDisplay }
)(Candidates);