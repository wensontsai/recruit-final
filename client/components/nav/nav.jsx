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
						<Link className='link' to='/' >RECRUIT</Link>
					</div>
					{(/(^|;)\s*token=/.test(document.cookie)
					  ? <div className='nav-links'>
								<div className='logged-in-user'>
									{ this.props.sessions.sessions.loggedInUserEmail }
								</div>
								<Link className='link' to='/candidates' >Candidates</Link>
								<Link className='link' to='/prompts' >Prompts</Link>
								<Link className='link' to='/logout' >Logout</Link>
							</div>
					  : <div className='nav-links'>
					  		<Link className='link' to='/login' >Login</Link>
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
