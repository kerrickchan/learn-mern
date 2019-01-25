import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {addEducationAction} from '../../actions/profileActions'
import EducationForm from './EducationForm';

class AddEducation extends Component {
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

    submitForm = (eduData) => {
        this.props.addEducationAction(eduData, this.props.history);
    }

    render() {
        return (
            <div className="add-education">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to="/dashboard" className="btn btn-light">
                                Go Back
                            </Link>
                            <h1 className="display-4 text-center">Add Education</h1>
                            <p className="lead text-center">Add any school, bootcamp, etc</p>
                            <small className="d-block pb-3">* = required fields</small>
                            <EducationForm onSubmit={this.submitForm} ref={(educationForm) => {this.form = educationForm;}}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

AddEducation.propTypes = {
    addEducationAction: PropTypes.func.isRequired,
    profile: PropTypes.object,
    errors: PropTypes.object
}

const mapStateToProps = (state) => {
    return {
        profile: state.profile,
        errors: state.errors
    }
}

export default connect(mapStateToProps, {addEducationAction})(AddEducation);