import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import ProfileForm from './ProfileForm';
import {createProfileAction} from "../../actions/profileActions";

class CreateProfile extends Component {
    constructor(props){
        super(props);

        this.form = React.createRef();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            if (nextProps.errors === "Unauthorized") {
                this.history.push("/login");
            } else {
                this.form.setState({errors: nextProps.errors});
            }
        }
    }

    submitForm = (profileData) => {
        this.props.createProfileAction(profileData, this.props.history);
    }

    render() {
        return (
            <div className="create-profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Create Profile</h1>
                            <p className="lead text-center">Let's get some information to make your profile stand out</p>
                            <small className="d-block pb-3">* = required fields</small>
                            <ProfileForm onSubmit={this.submitForm} ref={(profileForm)=>{this.form=profileForm;}} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

CreateProfile.propTypes = {
    createProfileAction: PropTypes.func.isRequired,
    profile: PropTypes.object,
    errors: PropTypes.object
}

const mapStateToProps = (state) => {
    return {
        profile: state.profile,
        errors: state.errors
    }
}


export default connect(mapStateToProps, {createProfileAction})(CreateProfile);