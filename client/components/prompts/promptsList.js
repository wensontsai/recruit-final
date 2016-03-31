import React, { Component, PropTypes } from 'react';
// import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';

import { queryAllPromptsList } from '../../actions/prompts';

import './prompts.scss';

class promptsList extends Component {
  constructor (props) {
    super (props);
    this.state = {
      prompts: props.prompts,
      queryAllPromptsList: props.queryAlPromptsList,
    };
  }

  componentDidMount () {
    this.props.queryAllPromptsList();
  }

  render () {
    return (
      <div className='prompts-list-view'>
        <div className='row header'>
          <div className='field' >QUESTIONS:</div>
        </div>
        {this.props.prompts.prompts.promptsAll.map(function(record) {
          return (
            <div className='row' key={record._id}>
              <div className='field' >{record.question}</div>
            </div>
          )
        }, this )}
      </div>
    );
  }

}

export default connect(
  (state) => ({ prompts: state.prompts }),
  { queryAllPromptsList }
)(promptsList);
