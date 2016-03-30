import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { queryCandidateAnswers } from '../../actions/results';

import Nav from '../nav/nav';
import ProfileResults from '../results/profileResults';
import AnswerResults from '../results/answerResults';

import './results.scss';

class Results extends Component {
  constructor (props) {
    super(props);
    this.state = {
      queryCandidateAnswers: props.queryCandidateAnswers,
      data: {
        userId: props.params.userId || ''
      }
    }
  }
  componentDidMount () {
    this.queryCandidateAnswers(this.state.data);
  }
  render () {
    const {
      results
    } = this.props;

    return (
        <div className='displays-all-container'>
            <Nav />
            <div className='page'>
              <ProfileResults />
              <AnswerResults />
            </div>
        </div>
    );
  }
  queryCandidateAnswers (data) {
    this.state.queryCandidateAnswers(this.state.data);
  }
}

export default connect(
  (state) => ({ results: state.results }),
  { queryCandidateAnswers }
)(Results);