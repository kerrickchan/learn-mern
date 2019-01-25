import React from 'react';
import PropTypes from 'prop-types';

import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';

class ExperienceForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            company: "",
            location: "",
            from: "",
            to: "",
            current: false,
            description: "",
            errors: {},
            disabled: false
        }

        this.onChange = this.onChange.bind(this);
        this.onCheck = this.onCheck.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    onCheck(e) {
        this.setState({
            disabled: !this.state.disabled,
            current: !this.state.current
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const expData = {
            company: this.state.company,
            title: this.state.title,
            location: this.state.location,
            from: this.state.from,
            to: this.state.to,
            current: this.state.current,
            description: this.state.description
        }

        this.props.onSubmit(expData);
    }

    setData(experienceData){
        this.setState({...experienceData})
    }

    render() {
        const {errors} = this.state;

        return (
            <form onSubmit={this.onSubmit}>
                <TextFieldGroup placeholder="Job Title*" name="title" value={this.state.title} onChange={this.onChange} error={errors.title} />
                <TextFieldGroup placeholder="Company*" name="company" value={this.state.company} onChange={this.onChange} error={errors.company} />
                <TextFieldGroup placeholder="Location" name="location" value={this.state.location} onChange={this.onChange} error={errors.location} />
                <h6>From Date*</h6>
                <TextFieldGroup type="date" name="from" value={this.state.from} onChange={this.onChange} error={errors.from} />
                <h6>To Date</h6>
                <TextFieldGroup type="date" name="to" value={this.state.to} onChange={this.onChange} error={errors.to} disabled={this.state.disabled ? "disabled" : ""}/>
                <div className="form-check mb-4">
                    <input type="checkbox" className="form-check-input" id="current" name="current" value={this.state.current} checked={this.state.current} onChange={this.onCheck} />
                    <label htmlFor="current" className="form-check-label">
                        Current Job
                    </label>
                </div>
                <TextAreaFieldGroup placeholder="Job Description" name="description" value={this.state.description} onChange={this.onChange} info="Tell us about the position" error={errors.description} />
                <input type="submit" value="Submit" className="btn btn-info btn-block mt-4" />
            </form>
        )
    }
}

ExperienceForm.propTypes = {
    onSubmit: PropTypes.func,
    profile: PropTypes.object,
    errors: PropTypes.object
}

export default ExperienceForm;