import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { addCandidate } from '../../actions/candidates';

import './candidates.scss';

class AddCandidateView extends Component {
  constructor (props) {
    super (props);
    this.state = {
      dash: props.dash,
      addCandidate: props.addCandidate,
      data: {
        firstName: this.props.firstName || '',
        lastName: this.props.lastName || '',
        email: this.props.email || '',
        admin: this.props.admin || ''
      }
    };
  }

  render () {
    return (
      <div className='candidate-add-view'>
        <div>
          <div>First Name:</div>
          <input
            type="text"
            value={this.state.data.firstName}
            onChange={ this.handleChangeFirstName.bind(this) }
          />
        </div>
        <div>
          <div>Last Name:</div>
          <input
            type="text"
            value={this.state.data.lastName}
            onChange={ this.handleChangeLastName.bind(this) }
          />
        </div>
        <div>
          <div>Email:</div>
          <input
            type="text"
            value={this.state.data.email}
            onChange={ this.handleChangeEmail.bind(this) }
          />
        </div>
        <div>
          <div>Admin:</div>
          <input
            type="text"
            value={this.state.data.admin}
            onChange={ this.handleChangeAdmin.bind(this) }
          />
        </div>
        <div className='add-candidate'>
          <button className='btn btn-sm add-candidate'
            onClick={() => this.addCandidate(this.props.answer)}
            >Add Candidate
          </button>
        </div>
      </div>
    );
  }
  handleChangeFirstName (event) {
    this.setState({ 
      data: {
        firstName: event.target.value,
        lastName: this.state.data.lastName,
        email: this.state.data.email,
        admin: this.state.data.admin
      }
    });
  }
  handleChangeLastName (event) {
    this.setState({ 
      data: {
        firstName: this.state.data.firstName,
        lastName: event.target.value,
        email: this.state.data.email,
        admin: this.state.data.admin
      }
    });
  }
  handleChangeEmail (event) {
    this.setState({ 
      data: {
        firstName: this.state.data.firstName,
        lastName: this.state.data.lastName,
        email: event.target.value,
        admin: this.state.data.admin
      }
    });
  }
  handleChangeAdmin (event) {
    this.setState({ 
      data: {
        firstName: this.state.data.firstName,
        lastName: this.state.data.lastName,
        email: this.state.data.email,
        admin: event.target.value
      }
    });
  }
  addCandidate () {
    console.log(this.state.data);
    this.props.addCandidate(this.state.data);
  }

}

export default connect(
  (state) => ({ candidates: state.candidates }),
  { addCandidate }
)(AddCandidateView);
