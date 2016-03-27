import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { queryExam } from '../../actions/dash';

import Nav from '../nav/nav';
import Answer from '../dash/answer';
import Question from '../dash/question';
import Profile from '../dash/profile';

import './dash.scss';

class DisplaysAll extends Component {
	constructor (props) {
		super(props);
		this.state = {
			queryUser: props.queryUser,
			queryExam: props.queryExam,
			data: {
			  examId: props.params.examId || ''   
			}
		}
	}
	componentDidMount() {
	  // on load - query Users table, set data on candidate (userId) using examId
		this.state.queryExam(this.state.data);
	  // if an exam has begun,
	  // go get remaining time, and pass it to countdown timer
	}
	render () {
		const {
			dash
		} = this.props;

		return (
			<div className='display-all-container'>
				<Nav />
				<div className='page'>
					<Profile examId={this.state.examId}/>
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
	{ queryExam }
)(DisplaysAll);
