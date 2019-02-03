import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

import {deleteExperienceAction} from '../../actions/profileActions';

class Experience extends Component {
    handleDeleteClick = (id) => {
        this.props.deleteExperienceAction(id);
    }

    render() {
        const expTableRows = this.props.experiences.map(exp => (
            <tr key={exp._id}>
                <td>{exp.company}</td>
                <td>{exp.title}</td>
                <td><Moment format="YYYY/MM/DD">{exp.from}</Moment> - {exp.to === null ? ('Now') : (<Moment format="YYYY/MM/DD">{exp.to}</Moment>)}</td>
                <td><button className="btn btn-danger" onClick={this.handleDeleteClick.bind(this, exp._id)}>Delete</button></td>
            </tr>
        ))

        return (
            <div>
                <h4 className="mb-4">Experience Credentials</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th>Title</th>
                            <th>Years</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {expTableRows}
                    </tbody>
                </table>
            </div>
        )
    }
}

Experience.propTypes = {
    experiences: PropTypes.array,
    deleteExperienceAction: PropTypes.func.isRequired
}

export default connect(null, {deleteExperienceAction})(Experience);