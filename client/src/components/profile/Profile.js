import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import ProfileHeader from './ProfileHeader'
import ProfileAbout from './ProfileAbout'
import ProfileCreds from './ProfileCreds'
import ProfileGithub from './ProfileGithub'

import Spinner from '../common/Spinner'
import {getProfileByHandleAction} from '../../actions/profileActions'

class Profile extends Component {
  static propTypes = {
    getProfileByHandleAction: PropTypes.func.isRequired
  }

  componentDidMount() {
      if (this.props.match.params.handle) {
          this.props.getProfileByHandleAction(this.props.match.params.handle)
      }
  }

  render() {
    return (
      <div>
        <ProfileHeader />
        <ProfileAbout />
        <ProfileCreds />
        <ProfileGithub />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
    profile: state.profile
})

export default connect(mapStateToProps, {getProfileByHandleAction})(Profile);