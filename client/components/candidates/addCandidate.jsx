import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { addCandidate } from '../../actions/candidates';

import './candidates.scss';

class AddCandidateView extends Component {
  constructor (props) {
    super (props);
    // this.hideStatusView = this.hideStatusView.bind(this);
    this.state = {
      data: {
        firstName: this.props.firstName || '',
        lastName: this.props.lastName || '',
        email: this.props.email || '',
        admin: this.props.admin || ''
      },
      showStatus: this.props.showStatus || 'true'
    };
  }

  render () {
    return (
      <div className='candidate-add-view'>
        <div className='column'>
          <div className='field'>
            <div>First Name:</div>
            <input
              type='text'
              value={this.state.data.firstName}
              onChange={ this.handleChangeFirstName.bind(this) }
            />
          </div>
          <div className='field'>
            <div>Last Name:</div>
            <input
              type='text'
              value={this.state.data.lastName}
              onChange={ this.handleChangeLastName.bind(this) }
            />
          </div>
        </div>

        <div className='column'>
          <div className='field'>
            <div>Email:</div>
            <input
              type='text'
              value={this.state.data.email}
              onChange={ this.handleChangeEmail.bind(this) }
            />
          </div>
          <div className='field admin-panel'>
            <div>Admin:</div>
              <div className='selection-section'>
                <div className='selection'>
                  <input
                    name='radio-admin-yes'
                    type='radio'
                    name='radio-admin-group'
                    onClick={ this.handleChangeAdmin.bind(this, 'Y') }
                  />
                  <label htmlFor='radio-admin-yes'>Yes</label>
                </div>
                <div className='selection'>
                  <input
                    name='radio-admin-no'
                    type='radio'
                    name='radio-admin-group'
                    onClick={ this.handleChangeAdmin.bind(this, 'N') }
                  />
                  <label htmlFor='radio-admin-no'>No</label>
                </div>
              </div>
          </div>
        </div>
        <div className='column-submit'>
          <div className='add-candidate'>
            <button className='btn btn-sm add-candidate'
              onClick={() => this.addCandidate(this.hideStatusView.bind(this))}
              >Add Candidate
            </button>
          </div>
          {(this.state.showStatus
            ? <div className='action-status'>
                <ReactCSSTransitionGroup transitionName='example' transitionEnterTimeout={500} transitionLeaveTimeout={300} >
                    {this.props.candidates.actionStatus}
                </ReactCSSTransitionGroup>
              </div>
            : ''
          )}
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
  handleChangeAdmin (status, event) {
    this.setState({
      data: {
        firstName: this.state.data.firstName,
        lastName: this.state.data.lastName,
        email: this.state.data.email,
        admin: status
      }
    });
  }
  addCandidate (hideFunc) {
    this.props.addCandidate(this.state.data);
    this.setState({ data:{} });

    // Reset radio button selections
    const allRadioButtons = document.getElementsByTagName('input');
    for (let i = 0; i < allRadioButtons.length; i++)
    {
      if (allRadioButtons[i].type == 'radio')
      {
        allRadioButtons[i].checked = false;
      }
    }

    // notifications
    setTimeout(function() { hideFunc() }, 5000);
  }
  hideStatusView () {
    this.setState({
      showStatus: false
    });
    console.log(this);
  }

}

export default connect(
  (state) => ({ candidates: state.candidates }),
  { addCandidate }
)(AddCandidateView);
