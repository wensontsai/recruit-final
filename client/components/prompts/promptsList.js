import React, { Component, PropTypes } from 'react';
// import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import merge from 'lodash.merge';

import { queryAllPromptsList, editPrompt, handleEditPrompt, saveEditPrompt, deletePrompt } from '../../actions/prompts';

import './prompts.scss';

class promptsList extends Component {
  constructor (props) {
    super (props);
    this.state = {
      data: {
        editObj: {}
      }
    }
  }

  componentDidMount () {
    this.queryAllPromptsList();
    this.populateEditObj();
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
            {(this.props.prompts.prompts.editObj[record._id].mode
              ? <div className='react-wrapper'>
                  <div className='field question'>
                    <input
                      type='text'
                      value={this.props.prompts.prompts.editObj[record._id].data}
                      onChange={ this.handleEditPrompt.bind(this, record._id) }
                    />
                  </div>
                  <div className='field edit-prompt' >
                    <button className='btn btn-sm'
                      onClick={() => this.saveEditPrompt (record._id)}
                    >
                      Save Changes
                    </button>
                  </div>
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
  }
  populateEditObj () {
    console.log(this.props.prompts);
    const prompts = this.props.prompts;
    var keys = Object.keys(this.props.prompts.prompts.editObj);
    // console.log(keys)
    // for(var key in this.props.prompts.editObj) {
    //   console.log(key);
    //   //   if(this.props.prompts.editObj.hasOwnProperty(key)) {
    //       editObj[key] = {
    //         mode: null,
    //         data: this.props.prompts.editObj[key].question
    //       };
    //     // }
    // }
    console.log(keys);
    this.setState({
      data:prompts
    });
    console.log(this.state.data);
  }
  handleEditPrompt (event, id) {
    console.log(id);
    // console.log(event);
    // this.props.handleEditPrompt(event.target.value, id);


  }
  editPrompt (promptId) {
    this.populateEditObj();
    const data = {
      id: promptId
    };
    this.props.editPrompt(data);
  }
  saveEditPrompt (promptId) {
    const data = {
      id: promptId
    };
    this.props.saveEditPrompt(data);
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
  { queryAllPromptsList, editPrompt, handleEditPrompt, saveEditPrompt, deletePrompt }
)(promptsList);
