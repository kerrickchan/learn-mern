import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

import {deleteEducationAction} from '../../actions/profileActions';

class Education extends Component {
    handleDeleteClick = (id) => {
        this.props.deleteEducationAction(id);
    }

    render() {
        const eduTableRows = this.props.educations.map(edu => (
            <tr key={edu._id}>
                <td>{edu.school}</td>
                <td>{edu.degree}</td>
                <td><Moment format="YYYY">{edu.from}</Moment> - {edu.to === null ? ('Now') : (<Moment format="YYYY">{edu.to}</Moment>)}</td>
                <td><button className="btn btn-danger" onClick={this.handleDeleteClick.bind(this, edu._id)}>Delete</button></td>
            </tr>
        ))

        return (
            <div>
                <h4 className="mb-4">Education Credentials</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th>School</th>
                            <th>Degree</th>
                            <th>Years</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {eduTableRows}
                    </tbody>
                </table>
            </div>
        )
    }
}

Education.propTypes = {
    educations: PropTypes.array,
    deleteEducationAction: PropTypes.func.isRequired
}

export default connect(null, {deleteEducationAction})(Education);