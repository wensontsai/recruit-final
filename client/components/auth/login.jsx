import React, { Component, PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';

import { loginUser } from '../../actions/sessions';

import './auth.scss';

import Nav from '../nav/nav';

class Login extends Component {
	constructor (props) {
	  super (props);
	  this.state = {
	    data: {
	      email: '',
	      password: ''
	    }
	  };
	}
	render () {
		const {
		  sessions
		} = this.props;
		
		return (
				<div className='login-container'>
					<Nav />
					{(/(^|;)\s*token=/.test(document.cookie)
					  ? this.redirectToCandidates()
					  : <div className='page'>
				    		<div className='pageTitle'>
				    			Login
				    		</div>
				    		<div className='subTitle'>
				    		Please login to view Admin Dashboard.
				    		</div>
				    		<div className='form'>
				    			<div className='form-elements'>
					    			<div>
					    				<input
					    					className='input'
					    					type='text'
					    					placeholder='email'
					    					value={this.state.data.email}
					    					onChange={ this.handleChangeEmail.bind(this) }
					    				/>
					    			</div>
					    			<div>
					    				<input
					    					className='input'
					    					type='password'
					    					placeholder='password'
					    					value={this.state.data.password}
					    					onChange={ this.handleChangePassword.bind(this) }
					    				/>
					    			</div>
					    			<div>
					    				<button className='btn btn-sm login-user'
					    				  onClick={() => this.loginUser()}
					    				  >Login
					    				</button>
					    			</div>
				    			</div>
				    		</div>
				    	</div>
					)}  	    
		    </div>
	    )
	}
	redirectToCandidates () {
		browserHistory.push('/candidates');
	}
	handleChangeEmail (event) {
	  this.setState({
	    data: {
	      email: event.target.value,
	      password: this.state.data.password
	    }
	  });
	}
	handleChangePassword (event) {
	  this.setState({
	    data: {
	      email: this.state.data.email,
	      password: event.target.value
	    }
	  });
	}
	loginUser () {
		this.props.loginUser(this.state.data);
	}

}

export default connect(
  (state) => ({ sessions: state.sessions }),
  { loginUser }
)(Login);
