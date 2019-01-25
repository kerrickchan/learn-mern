import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {addExperienceAction} from '../../actions/profileActions'
import ExperienceForm from './ExperienceForm';

class AddExperience extends Component {
    constructor(props) {
        super(props);
        
        this.form = React.createRef();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            if (nextProps.errors === "Unauthorized") {
                this.props.history.push("/login");
            } else {
                this.form.setState({errors: nextProps.errors});
            }
        }
    }

    submitForm = (expData) => {
        this.props.addExperienceAction(expData, this.props.history);
    }

    render() {
        return (
            <div className="add-experience">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to="/dashboard" className="btn btn-light">
                                Go Back
                            </Link>
                            <h1 className="display-4 text-center">Add Experience</h1>
                            <p className="lead text-center">Add any job or position that you have had in the past or current</p>
                            <small className="d-block pb-3">* = required fields</small>
                            <ExperienceForm onSubmit={this.submitForm} ref={(experienceForm) => {this.form = experienceForm;}}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

AddExperience.propTypes = {
    addExperienceAction: PropTypes.func.isRequired,
    profile: PropTypes.object,
    errors: PropTypes.object
}

const mapStateToProps = (state) => {
    return {
        profile: state.profile,
        errors: state.errors
    }
}

export default connect(mapStateToProps, {addExperienceAction})(AddExperience);