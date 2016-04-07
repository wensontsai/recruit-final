import React, { Component, PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
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
            {(/(^|;)\s*token=/.test(document.cookie)
              ? <div className='page'>
                  <ProfileResults />
                  <AnswerResults />
                </div>
              :  this.redirectToLogin()
            )}
        </div>
    );
  }
  redirectToLogin () {
    browserHistory.push('/login');
  }
  queryCandidateAnswers (data) {
    this.props.queryCandidateAnswers(this.state.data);
  }
}

export default connect(
  (state) => ({ results: state.results }),
  { queryCandidateAnswers }
)(Results);