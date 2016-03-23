import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

// import { selectDisplay } from '../../actions/displays';

import Nav from '../nav/nav';

class Candidates extends Component {
    render (){
        const {
            
        } = this.props;

        return (
            <div className='candidates-all-container'>
                <Nav />
                <div className='page'>
                  candidates view
                </div>
            </div>
        );
    }
}

export default connect(
  (state) => ({ displays: state.displays }),
  // { selectDisplay }
)(Candidates);