import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { clearNotifications } from '../../actions/notifications';

import './notifications.scss';

class Notifications extends Component {
  constructor (props) {
    super(props);
  }
  componentDidMount () {
    this.countdown(10000, this.props.clearNotifications);
  }

  render () {
    const {
      notifications
    } = this.props;

    return (
      <div
        className={'notifications-container ' + this.props.notifications.type }
      >
        {this.props.notifications.message}
      </div>
    );
  }
  countdown (interval, clearNotifications) {
    setTimeout(function() {
      clearNotifications();
    }, interval);
  }

}

export default connect(
  (state) => ({ notifications: state.notifications }),
  { clearNotifications }
)(Notifications);