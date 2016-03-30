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
			queryExam: props.queryExam,
			data: {
			  examId: props.params.examId || ''   
			}
		}
	}
	componentDidMount () {
		this.queryExam(this.state.data);
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
	        			: <div className='row001'></div>	
					)}
				</div>
			</div>
		);
	}

	queryExam (data){
		console.log(this.state.data);
		this.state.queryExam(this.state.data);
	}
}

export default connect(
	(state) => ({ dash: state.dash }),
	{ queryExam }
)(DisplaysAll);
