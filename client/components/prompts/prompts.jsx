import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import Nav from '../nav/nav';
import AddPrompt from './addPrompt';
import PromptsList from './promptsList';

import { queryAllPromptsList } from '../../actions/prompts';

class Prompts extends Component {
  componentDidMount () {
    this.props.queryAllPromptsList();
  }

  render (){
    const {
      prompts
    } = this.props;

    return (
        <div className='display-all-container'>
            <Nav />
            <div className='page'>
              <AddPrompt />
              <PromptsList />
            </div>
        </div>
    );
  }
}

export default connect(
  (state) => ({ prompts: state.prompts }),
  { queryAllPromptsList }
)(Prompts);