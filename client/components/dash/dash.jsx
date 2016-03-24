import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import Nav from '../nav/nav';
import Answer from '../dash/answer';
import Question from '../dash/question';
import Profile from '../dash/profile';

import './dash.scss';

class DisplaysAll extends Component {
	render (){
		const {
			dash
		} = this.props;

		return (
			<div className='display-all-container'>
				<Nav />
				<div className='page'>
					<Profile />
					{(dash.view.showPrompt
		        ? <div className='row001'>
								<Question />
								<Answer />
							</div>    
		        : <div className='row001'>Click "Start!" to get prompt</div>
					)}
				</div>
			</div>
		);
	}
}

export default connect(
		(state) => ({ dash: state.dash }),
		// { selectDisplay }
)(DisplaysAll);
