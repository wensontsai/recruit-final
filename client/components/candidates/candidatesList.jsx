import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { queryAllCandidates } from '../../actions/candidates';

import './candidates.scss';

class List extends Component {
  constructor (props) {
    super (props);
    this.state = {
      candidates: {
        candidatesAll: [ 
          { __v: 0,
            admin: 'Y',
            email: 'tes@tes.com',
            lastName: 'testyzer',
            firstName: 'test',
            _id: '56f54820c2825dd988bffe3d' },
          { __v: 0,
            admin: 'N',
            email: 'le@le.com',
            lastName: 'lee',
            firstName: 'jason',
            _id: '56f5482bc2825dd988bffe3e'
          }
        ],
      },
      queryAllCandidates: props.queryAllCandidates
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
          <div className='field' >ADMIN</div>
          <div className='field' >INITIATE EXAM</div>
          <div className='field' >CHECK ANSWERS</div>
        </div>
        {this.state.candidates.candidatesAll.map(function(record){
          return (
            <div className='row' key={record._id}>
              <div className='field' >{record.firstName}</div>
              <div className='field' >{record.lastName}</div>
              <div className='field' >{record.email}</div>
              <div className='field' >{record.admin}</div>
              <div className='field' >
                <button className='btn btn-sm start-exam'
                  onClick={() => this.sendEmail ()}
                  >Send Email
                </button>
              </div>
              <div className='field' >
                <button className='btn btn-sm start-exam'
                  onClick={() => this.viewResults ()}
                  >View Results
                </button>
              </div>
            </div>
          )
        }, this )}
      </div>
    );
  }

  sendEmail () {

  }

  viewResults () {
    
  }

}

export default connect(
  (state) => ({ candidates: state.candidates }),
  { queryAllCandidates }
)(List);
