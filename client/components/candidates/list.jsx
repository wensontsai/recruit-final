import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { queryAllCandidates } from '../../actions/dash';

import './candidates.scss';

class List extends Component {
  constructor (props) {
    super (props);
    this.state = {
      candidates: props.candidates,
    };
  }

  componentDidMount () {
    this.queryAllCandidates();
  }

  render () {
    return (
      <div className='answer-view'>
        {this.props.candidates.map(function(record){
          return (
            <div>record.firstName</div>
            <div>record.lastName</div>
            <div>record.email</div>
            <div>record.admin</div>
          )
        })}
      </div>
    );
  }

}

export default connect(
  (state) => ({ candidates: state.candidates }),
  { queryAllCandidates }
)(List);
