import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { queryExam, queryAllPrompts } from '../../actions/dash';

import Nav from '../nav/nav';
import Answer from '../dash/answer';
import Question from '../dash/question';
import Profile from '../dash/profile';
import Notifications from '../notifications/notifications';

import './dash.scss';

class DisplaysAll extends Component {
	constructor (props) {
		super(props);
		this.state = {
			data: {
			  examId: props.params.examId || ''  
			},
			view: {
			  showPrompt: props.dash.view.showPrompt || ''
			}
		}
	}
	componentDidMount () {
		if(localStorage.getItem('endTime')) {
			this.setState({
				view: {
					showPrompt: true
				}
			});

			this.props.queryAllPrompts();
		}

		this.queryExam(this.state.data);
	}
	render () {
		const {
			dash,
		} = this.props;

		return (
			<div className='display-all-container'>
				<Nav />
				<Notifications />
				<div className='page'>
					<Profile examId={this.props.examId}/>
					{(dash.data.completed === 'Y'
		        ? <div className='row001'>
							</div>
		        : dash.data.startTime !== null && dash.data.completed === null
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

	queryExam (data) {
		this.props.queryExam(this.state.data);
	}
}

export default connect(
	(state) => ({ dash: state.dash }),
	{ queryExam, queryAllPrompts }
)(DisplaysAll);
