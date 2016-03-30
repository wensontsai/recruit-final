import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { queryExam } from '../../actions/dash';

import Nav from '../nav/nav';

class Prompts extends Component {
  constructor (props) {
    super(props);
    this.state = {
      queryAllAnswers: props.queryExam,
      data: {
        userId: props.params.userId || ''   
      }
    }
  }
  componentDidMount () {
    this.queryAllAnswers(this.state.data);
  }
  render (){
    const {
        
    } = this.props;

    return (
        <div className='results-all-container'>
            <Nav />
            <div className='page'>
            time to get this cats report card!
            <br />
            ::::::::::::::::::
            <br />
              {this.state.data.userId}
            <br />
            <br />
            ^^^^^^^^^^^^^^^^^^
            </div>
        </div>
    );
  }
  queryAllAnswers (data){
    this.state.queryAllAnswers(this.state.data);
  }
}

export default connect(
  (state) => ({ displays: state.displays }),
  // { selectDisplay }
)(Prompts);