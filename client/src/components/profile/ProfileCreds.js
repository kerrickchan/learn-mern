import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

class ProfileCreds extends Component {
  static propTypes = {
    education: PropTypes.array,
    experience: PropTypes.array
  }

  render() {
    const {experience, education} = this.props;

    const expItems = experience.map((exp) => (
      <li key={exp._id} className="list-group-item">
        <h4>{exp.company}</h4>
        <p>
          <Moment format="YYYY/MM">{exp.from}</Moment> to
          {exp.to === null ? (" Now") : <Moment format=" YYYY/MM">{exp.to}</Moment>}
        </p>
        <p><strong>Position:</strong> {exp.title}</p>
        <p>{exp.location === "" ? null : <span><strong>Location:</strong> {exp.location}</span>}</p>
        <p>{exp.descrption === "" ? null : <span><strong>Description:</strong> {exp.descrption}</span>}</p>
      </li>
    ))

    const eduItems = education.map((edu) => (
      <li key={edu._id} className="list-group-item">
        <h4>{edu.school}</h4>
        <p>
          <Moment format="YYYY">{edu.from}</Moment> to
          {edu.to === null ? (" Now") : <Moment format=" YYYY">{edu.to}</Moment>}
        </p>
        <p><strong>Degree:</strong> {edu.degree}</p>
        <p><strong>Field Of Study:</strong> {edu.fieldofstudy}</p>
        <p>{edu.descrption === "" ? null : <span><strong>Description:</strong> {edu.descrption}</span>}</p>
      </li>
    ))
    return (
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center text-info">Experience</h3>
          {
            expItems.length > 0 ? (<ul className="list-group">{expItems}</ul>) : (<p className="text-center">No Experience Listed</p>)
          }
        </div>
        <div className="col-md-6">
          <h3 className="text-center text-info">Education</h3>
          {
            eduItems.length > 0 ? (<ul className="list-group">{eduItems}</ul>) : (<p className="text-center">No Education Listed</p>)
          }
        </div>
      </div>
    )
  }
}

export default ProfileCreds;