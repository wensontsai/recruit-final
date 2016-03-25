import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { startExam, queryAllPrompts } from '../../actions/dash';

import './candidates.scss';

class Profile extends Component {
  constructor (props) {
    super (props);
    this.state = {
      dash: props.dash,
      startExam: props.startExam,
      queryAllPrompts: props.queryAllPrompts,
    };
  }

  componentDidMount() {
    // get all Candidates list
  }

  render () {
    return (
      <div className='profile-view'>
        Name:
        <input type="text"/><br />
        Email:
        <input type="text"/><br />
        <div>
          <button>Add Candidate</button>
        </div>
      </div>
    );
  }

  addCandidate () {
    this.props.startExam(this.props.dash);
    this.props.queryAllPrompts();
  }


}

export default connect(
  (state) => ({ dash: state.dash }),
  { startExam, queryAllPrompts }
)(Profile);
