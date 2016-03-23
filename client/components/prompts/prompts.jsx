import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

// import { selectDisplay } from '../../actions/displays';

import Nav from '../nav/nav';

class Prompts extends Component {
    render (){
        const {
            
        } = this.props;

        return (
            <div className='prompts-all-container'>
                <Nav />
                <div className='page'>
                  prompts views
                </div>
            </div>
        );
    }
}

export default connect(
  (state) => ({ displays: state.displays }),
  // { selectDisplay }
)(Prompts);