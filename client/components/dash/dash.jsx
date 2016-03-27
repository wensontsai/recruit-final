import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import Nav from '../nav/nav';
import Answer from '../dash/answer';
import Question from '../dash/question';
import Profile from '../dash/profile';

import './dash.scss';

class DisplaysAll extends Component {
	constructor (props) {
		super(props);
		this.state = {
			examId: props.params.examId
		}
	}
	render () {
		const {
			dash,
			name
		} = this.props;

		return (
			<div className='display-all-container'>
				<Nav />
				<div className='page'>
					<Profile />
					{this.state.examId}
					{(dash.view.examCompleted
		        ? <div className='row001'>
							</div>
		        : dash.view.showPrompt
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

)(DisplaysAll);
