import React, { Component } from 'react';
import { Link } from 'react-router';

import './auth.scss';

import Nav from '../nav/nav';

class Login extends Component {
	render() {
		return (
			<div className='login-container'>
				<Nav />
			    <div className='page'>
		    		<div className='pageTitle'>
		    			Login Page
		    		</div>
		    		<div className='form'>
		    			<div>
		    				<input className='input' type='text' placeholder='username'/>
		    			</div>
		    			<div>
		    				<input className='input' type='text' placeholder='password'/>
		    			</div>
		    			<div>
		    				<button className='button'>Login</button>
		    			</div>
		    		</div>
		    	</div>
		    </div>
	    )
	}
}

export default Login;
