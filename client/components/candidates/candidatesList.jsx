import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { queryAllCandidates, sendEmail } from '../../actions/candidates';

import './candidates.scss';

class List extends Component {
  constructor (props) {
    super (props);
    this.state = {
      candidates: props.candidates,
      sendEmail: props.sendEmail,
      queryAllCandidates: props.queryAllCandidates,
    };
  }

  componentDidMount () {
    this.props.queryAllCandidates();
  }

  render () {
    return (
      <div className='candidates-list-view'>
        <div className='row header'>
          <div className='field' >FIRST NAME</div>
          <div className='field' >LAST NAME</div>
          <div className='field' >EMAIL</div>
          <div className='field admin' >ADMIN</div>
          <div className='field initiate-btn' >INITIATE EXAM</div>
          <div className='field results-btn' >CHECK ANSWERS</div>
        </div>
        {this.props.candidates.candidates.candidatesAll.map(function(record) {
          return (
            <div className='row' key={record._id}>
              <div className='field' >{record.firstName}</div>
              <div className='field' >{record.lastName}</div>
              <div className='field' >{record.email}</div>
              <div className='field admin' >{record.admin}</div>
              <div className='field initiate-btn' >
                {(record.currentExam
                  ? <div>
                      Exam Currently Initiated
                    </div>
                  : <button className='btn btn-sm send-email'
                      onClick={() => this.sendEmail (record._id)}
                      >Send Email
                    </button>
                )}
              </div>
              <div className='field results-btn' >
                {(record.completed === 'Y'
                  ? <Link to={`/results/${record._id}`}
                      key={`${record._id}`}
                    >
                      <button className='btn btn-sm view-results'
                        >View Results
                      </button>
                    </Link>
                  : <div>
                      Not Completed Yet
                    </div>
                )}
                
              </div>
            </div>
          )
        }, this )}
      </div>
    );
  }

  sendEmail (userId) {
    this.props.sendEmail(userId);
  }

}

export default connect(
  (state) => ({ candidates: state.candidates }),
  { queryAllCandidates, sendEmail }
)(List);
