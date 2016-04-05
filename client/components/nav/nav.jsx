import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import './nav.scss';

class Nav extends Component {
	render () {
		const {
		  sessions
		} = this.props;

		return (
				<div className='nav'>
					<div className='nav-title'>
						<Link className='link' to='/' >Recruit</Link>
					</div>
					{(this.props.sessions.sessions.loggedInUserId
					  ? <div className='nav-links'>
								<Link className='link' to='/candidates' >Candidates</Link>
								<Link className='link' to='/prompts' >Prompts</Link>
								<Link className='link' to='/login' >Login</Link>
							</div>
					  : <div className='nav-links'>
					  	</div>
					)}
				</div>
			);
	}
}

export default connect(
  (state) => ({ sessions: state.sessions }),
  { }
)(Nav);
