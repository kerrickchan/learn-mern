import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import Spinner from '../common/Spinner';

import {getCurrentProfileAction, deleteAccountAction} from '../../actions/profileActions';
import ProfileAction from './ProfileAction';

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.onDeleteClick = this.onDeleteClick.bind(this);
    }

    componentDidMount() {
        this.props.getCurrentProfileAction();
    }

    onDeleteClick(e) {
        this.props.deleteAccountAction();
    }

    render() {
        const {user} = this.props.auth;
        const {profile, loading} = this.props.profile;

        let dashboardContent;

        if(profile === null || loading) {
            dashboardContent = <Spinner />
        } else {
            // Check if logged in user has profile data
            if (Object.keys(profile).length > 0) {
                dashboardContent = (
                    <div>
                        <p className="lead text-muted">Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link></p>
                        <ProfileAction />
                        {/*TODO: exp and edu */}
                        <div style={{marginBottom: "60px"}}></div>
                        <button className="btn btn-danger" onClick={this.onDeleteClick}>Delete my account</button>
                    </div>
                )
            } else {
                // USER is logged in but has no profile
                dashboardContent = (
                    <div>
                        <p className="lead text-muted">Welcome {user.name}</p>
                        <p>You have not yet setup a profile, please add some information</p>
                        <Link to="/create-profile" className="btn btn-lg btn-info">Create Profile</Link>
                    </div>
                );
            }
        }

        return (
            <div className="dashboard">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4">Dashboard</h1>
                            {dashboardContent}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Dashboard.propTypes = {
    getCurrentProfileAction: PropTypes.func.isRequired,
    deleteAccountAction: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, {getCurrentProfileAction, deleteAccountAction})(Dashboard);