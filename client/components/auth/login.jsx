import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { login } from '../../actions/results';

import './auth.scss';

import Nav from '../nav/nav';

class Login extends Component {
	constructor (props) {
	  super (props);
	  // this.hideStatusView = this.hideStatusView.bind(this);
	  this.state = {
	    data: {
	      email: this.props.email || '',
	      password: this.props.password || ''
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
			    				<button className='btn btn-sm add-candidate'
			    				  onClick={() => this.login()}
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
	login () {
		this.props.login;
	}

}

export default connect(
  (state) => ({ session: state.session }),
  { }
)(Login);
