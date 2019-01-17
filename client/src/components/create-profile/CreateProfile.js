import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import PropTypes from 'prop-types';

import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import InputGroup from '../common/InputGroup';

import {createProfileAction} from "../../actions/profileActions";

class CreateProfile extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            displaySocialInputs: false,
            handle: "",
            status: "",
            company: "",
            website: "",
            location: "",
            skills: "",
            githubusername: "",
            bio: "",
            twitter: "",
            facebook: "",
            linkedin: "",
            youtube: "",
            instagram: "",
            errors: {}
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({errors: nextProps.errors})
        }
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault();

        const profileData = {
            handle: this.state.handle,
            status: this.state.status,
            website: this.state.website,
            location: this.state.location,
            skills: this.state.skills,
            githubusername: this.state.githubusername,
            bio: this.state.bio,
            twitter: this.state.twitter,
            facebook: this.state.facebook,
            linkedin: this.state.linkedin,
            youtube: this.state.youtube,
            instagram: this.state.instagram
        }

        this.props.createProfileAction(profileData, this.props.history);
    }

    render() {
        const {errors, displaySocialInputs} = this.state;
        
        let socialInputs;

        if (displaySocialInputs) {
            socialInputs = (
                <div>
                    <InputGroup icon="fab fa-twitter" placeholder="Twitter Profile URL" name="twitter" value={this.state.twitter} onChange={this.onChange} error={errors.twitter} />
                    <InputGroup icon="fab fa-facebook" placeholder="Facebook Profile URL" name="facebook" value={this.state.facebook} onChange={this.onChange} error={errors.facebook} />
                    <InputGroup icon="fab fa-linkedin" placeholder="Linkedin Profile URL" name="linkedin" value={this.state.linkedin} onChange={this.onChange} error={errors.linkedin} />
                    <InputGroup icon="fab fa-youtube" placeholder="Youtube Channel URL" name="youtube" value={this.state.youtube} onChange={this.onChange} error={errors.youtube} />
                    <InputGroup icon="fab fa-instagram" placeholder="Instagram Page URL" name="instagram" value={this.state.instagram} onChange={this.onChange} error={errors.instagram} />
                </div>
            );
        }

        const options = [
            {label: "Select Professional Status", value: 0},
            {label: "Developer", value: "Developer"},
            {label: "Junior Developer", value: "Junior Developer"},
            {label: "Senior Developer", value: "Senior Developer"},
            {label: "Manager", value: "Manager"},
            {label: "Student or Learning", value: "Student or Learning"},
            {label: "Instructor or Teacher", value: "Instructor or Teacher"},
            {label: "Intern", value: "Intern"},
            {label: "Other", value: "Other"},
        ]

        return (
            <div className="create-profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Create Your Profile</h1>
                            <p className="lead text-center">Let's Get some information to make your profile stand out</p>
                            <small className="d-block pb-3">* = required fields</small>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup placeholder="* Profile Handle" name="handle" value={this.state.handle} onChange={this.onChange} error={errors.handle} info="A unique handle for your profile URL. Your full name, company name, nickname" />
                                <SelectListGroup placeholder="Status" name="status" value={this.state.status} options={options} onChange={this.onChange} error={errors.status} info="Give us an idea of where you are at in your career" />
                                <TextFieldGroup placeholder="Company" name="company" value={this.state.company} onChange={this.onChange} error={errors.company} info="Could be your own company or one you work for" />
                                <TextFieldGroup placeholder="Location" name="location" value={this.state.location} onChange={this.onChange} error={errors.location} info="City or city & state suggested (eg. Boston, MA)" />
                                <TextFieldGroup placeholder="* Skills" name="skills" value={this.state.skills} onChange={this.onChange} error={errors.skills} info="Please use comma separated values (eg. HTML,CSS,Javascript,PHP)" />
                                <TextFieldGroup placeholder="Github Username" name="githubusername" value={this.state.githubusername} onChange={this.onChange} error={errors.githubusername} info="If you want your latest repos and a Github link, include your username" />
                                <TextAreaFieldGroup placeholder="Short Bio" name="bio" value={this.state.bio} onChange={this.onChange} error={errors.bio} info="Tell us a little about yourself" />
                                <div className="mb-3">
                                    <button className="btn btn-light" onClick={() => {this.setState(preState => ({displaySocialInputs: !preState.displaySocialInputs}))}}>
                                        Add Social Network Links
                                    </button>
                                    <span className="text-muted">Optional</span>
                                </div>
                                {socialInputs}
                                <input type="submit" value="Submit" className="btn btn-info btn-block mb-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

CreateProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        profile: state.profile,
        errors: state.errors
    }
}

export default connect(mapStateToProps, {createProfileAction})(withRouter(CreateProfile));