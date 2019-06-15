import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {logoutUserAction} from '../../actions/authActions';
import {clearCurrentProfileAction} from '../../actions/profileActions';

class Navbar extends React.Component {
    onLogoutClick(e) {
        e.preventDefault();
        this.props.logoutUserAction();
        this.props.clearCurrentProfileAction();
    }

    render() {
        const {isAuthenticated, user, loading} = this.props.auth;

        const authLinks = (
            <ul>
                <li>
                    <Link to="/posts">Posts</Link>
                </li>
                <li>
                    <Link to="/profiles">Profiles</Link>
                </li>
                <li>
                    <button onClick={this.onLogoutClick.bind(this)}>
                        <img className="rounded-circle" src={user.avatar} alt={user.name} title="You must have a Gravatar connected to your email to display an image" style={{width: "25px", height: "25px"}} />
                        <span className="hide-sm">Logout</span>
                    </button>
                </li>
            </ul>
        )

        const guestLinks = (
            <ul>
                <li>
                    <Link to="/register">Sign Up</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
            </ul>
        )

        return (
            <nav className='navbar bg-dark'>
              <h1>
                <Link to='/'>
                  <i className='fas fa-code' /> DevConnector
                </Link>
              </h1>
              {!loading && (
                <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
              )}
            </nav>
        )
    }
}

Navbar.propTypes = {
    auth: PropTypes.object.isRequired,
    logoutUserAction: PropTypes.func.isRequired,
    clearCurrentProfileAction: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, {logoutUserAction, clearCurrentProfileAction})(Navbar);