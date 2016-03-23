import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

// import { selectDisplay } from '../../actions/displays';

import Nav from '../nav/nav';
import Answer from '../dash/answer';
import Question from '../dash/question';
import Profile from '../dash/profile';

import './dash.scss';

class DisplaysAll extends Component {
        render (){
                const {
                        
                } = this.props;

                return (
                        <div className='display-all-container'>
                                <Nav />
                                <div className='page'>
                                    <Profile />
                                    <div className='row001'>
                                            <Question />
                                            <Answer />
                                    </div>
                                </div>
                        </div>
                );
        }
}

export default connect(
    (state) => ({ displays: state.displays }),
    // { selectDisplay }
)(DisplaysAll);
