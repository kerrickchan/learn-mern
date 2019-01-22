import React, {Component} from 'react';
import PropTypes from 'prop-types';

import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import InputGroup from '../common/InputGroup';

class ProfileForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            handle: "",
            status: "",
            skills: "",
            company: "",
            location: "",
            bio: "",
            website: "",
            displaySocialInput: false,
            github: "",
            twitter: "",
            facebook: "",
            linkedin: "",
            instagram: "",
            youtube: "",
            errors: {}
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    setData(profileData){
        this.setState({...profileData})
    }

    onSubmit(e) {
        e.preventDefault();

        const profileData = {
            handle: this.state.handle,
            status: this.state.status,
            skills: this.state.skills,
            company: this.state.company,
            location: this.state.location,
            bio: this.state.bio,
            website: this.state.website,
            github: this.state.github,
            twitter: this.state.twitter,
            facebook: this.state.facebook,
            linkedin: this.state.linkedin,
            youtube: this.state.youtube,
            instagram: this.state.instagram
        }

        if(this.props.onSubmit){
            this.props.onSubmit(profileData);
        }
    }

    render() {
        const {errors, displaySocialInput} = this.state;

        const options = [
            {label: "Select Professional Status*", value: 0},
            {label: "Developer", value: "Developer"},
            {label: "Junior Developer", value: "Junior Developer"},
            {label: "Senior Developer", value: "Senior Developer"},
            {label: "Manager", value: "Manager"},
            {label: "Student or Learning", value: "Student or Learning"},
            {label: "Instructor or Teacher", value: "Instructor or Teacher"},
            {label: "Intern", value: "Intern"},
            {label: "Other", value: "Other"},
        ];

        let socialInputs;

        if (displaySocialInput) {
            socialInputs = (
                <div>
                    <InputGroup icon="fab fa-github" placeholder="Github Profile URL" name="github" value={this.state.github} onChange={this.onChange} error={errors.github} />
                    <InputGroup icon="fab fa-twitter" placeholder="Twitter Profile URL" name="twitter" value={this.state.twitter} onChange={this.onChange} error={errors.twitter} />
                    <InputGroup icon="fab fa-facebook" placeholder="Facebook Profile URL" name="facebook" value={this.state.facebook} onChange={this.onChange} error={errors.facebook} />
                    <InputGroup icon="fab fa-linkedin" placeholder="Linkedin Profile URL" name="linkedin" value={this.state.linkedin} onChange={this.onChange} error={errors.linkedin} />
                    <InputGroup icon="fab fa-instagram" placeholder="Instagram Page URL" name="instagram" value={this.state.instagram} onChange={this.onChange} error={errors.instagram} />
                    <InputGroup icon="fab fa-youtube" placeholder="Youtube Channel URL" name="youtube" value={this.state.youtube} onChange={this.onChange} error={errors.youtube} />
                </div>
            );
        }

        return (
            <form onSubmit={this.onSubmit}>
                <TextFieldGroup placeholder="Profile Handle*" name="handle" value={this.state.handle} onChange={this.onChange} error={errors.handle} info="A unique handle for your profile URL. Your full name, company name, nickname" />
                <SelectListGroup placeholder="Status*" name="status" value={this.state.status} options={options} onChange={this.onChange} error={errors.status} info="Give us an idea of where you are at in your career" />
                <TextFieldGroup placeholder="Skills*" name="skills" value={this.state.skills} onChange={this.onChange} error={errors.skills} info="Please use comma separated values (eg. HTML,CSS,Javascript,PHP)" />
                <TextFieldGroup placeholder="Company" name="company" value={this.state.company} onChange={this.onChange} error={errors.company} info="Could be your own company or one you work for" />
                <TextFieldGroup placeholder="Location" name="location" value={this.state.location} onChange={this.onChange} error={errors.location} info="City or city & state suggested (eg. Boston, MA)" />
                <TextAreaFieldGroup placeholder="Short Bio" name="bio" value={this.state.bio} onChange={this.onChange} error={errors.bio} info="Tell us a little about yourself" />
                <TextFieldGroup placeholder="Website" name="website" value={this.state.website} onChange={this.onChange} error={errors.website} info="Your personal website" />
                <div className="mb-3">
                    <button type="button" className="btn btn-light" onClick={() => {this.setState(state => ({displaySocialInput: !state.displaySocialInput}))}}>
                        Add Social Network Links
                    </button>
                    <span className="ml-3 text-muted">Optional</span>
                </div>
                {socialInputs}
                <input type="submit" value="Submit" className="btn btn-info btn-block mb-4" />
            </form>
        );
    }
}

ProfileForm.propTypes = {
    displaySocialInput: PropTypes.bool.isRequired,
    profile: PropTypes.object,
    errors: PropTypes.object,
    onSubmit: PropTypes.func,
}

ProfileForm.defaultProps = {
    displaySocialInput: false
}

export default ProfileForm;