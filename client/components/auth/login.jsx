import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
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
	render() {
		return (
			<div className='login-container'>
				<Nav />
			    <div className='page'>
		    		<div className='pageTitle'>
		    			Login
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
		    </div>
	    )
	}
	handleChangeEmail (event) {
	  this.setState({
	    data: {
	      email: event.target.value,
	      password: this.state.data.password
	    }
	  });
	  console.log(this.state);
	}
	handleChangePassword (event) {
	  this.setState({
	    data: {
	      email: this.state.data.email,
	      password: event.target.value
	    }
	  });
	  console.log(this.state);
	}
	loginUser () {
		this.props.loginUser(this.state.data);
	}

}

export default connect(
  (state) => ({ session: state.session }),
  { loginUser }
)(Login);
