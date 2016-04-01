import React, { Component, PropTypes } from 'react';
// import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import merge from 'lodash.merge';

import { queryAllPromptsList, editPrompt, deletePrompt } from '../../actions/prompts';

import './prompts.scss';

class promptsList extends Component {
  constructor (props) {
    super (props);
    this.state = {
      prompts: props.prompts,
      deletePrompt: props.deletePrompt,
      queryAllPromptsList: props.queryAlPromptsList,
      editPrompt: true,
      data: {
        editPrompt: ''
      }
    };
  }

  componentDidMount () {
    this.queryAllPromptsList();
  }

  render () {
    return (
      <div className='prompts-list-view'>
        <div className='row header'>
          <div className='react-wrapper'>
            <div className='field' >QUESTIONS</div>
            <div className='field edit-prompt' >EDIT</div>
            <div className='field delete-prompt' >DELETE</div>
          </div>
        </div>
        {this.props.prompts.prompts.promptsAll.map(function(record) {
          return (
            <div className='row' key={record._id}>
            {(this.state.editPrompt
              ? <div>
                  <input
                    type='text'
                    value={record.question[record._id]}
                    onChange={ this.handleEditPrompt.bind(this, record_id ) }
                  />
                </div>
              : <div className='react-wrapper'>
                  <div className='field question' >"{record.question}"</div>
                  <div className='field edit-prompt' >
                    <button className='btn btn-sm'
                      onClick={() => this.editPrompt (record._id)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
            )}

              
              <div className='field delete-prompt'>
                <button className='btn btn-sm'
                  onClick={() => this.deletePrompt (record._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          )
        }, this )}
      </div>
    );
  }
  queryAllPromptsList () {
    this.props.queryAllPromptsList();
    // console.log(this.state.prompts);
    // this.state.prompts.prompts.promptsAll.map(function(record) {
    //   console.log('fuck');
    //   return merge({}, this.state, {
    //     editPrompt: {
    //       [record._id]: null
    //     }
    //   });
    // });
    // console.log(this.state.editPrompt);
  }
  handleEditPrompt () {
    this.setState({ 
      data: {
        editPrompt: event.target.value,
      }
    });
  }
  editPrompt (promptId) {
    let data = {
      promptId: promptId
    }
    this.props.editPrompt (data);
  }
  deletePrompt (promptId) {
    let data = {
      promptId: promptId
    }
    this.props.deletePrompt (data);
  }

}

export default connect(
  (state) => ({ prompts: state.prompts }),
  { queryAllPromptsList, editPrompt, deletePrompt }
)(promptsList);
