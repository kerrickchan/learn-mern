import React, { Component, Fragment } from 'react'
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
    const {profile, loading} = this.props.profile;
    let profileContent;

    if (profile === null || loading) {
      profileContent = <Spinner />
    } else {
      profileContent = (
        <Fragment>
          <div className="row">
            <div className="col-md-12">
              <ProfileHeader profile={profile} />
              <ProfileAbout profile={profile} />
              <ProfileCreds experience={profile.experience} education={profile.education} />
              {profile.social && profile.social.github ? (<ProfileGithub username={profile.social.github} />) : null}
            </div>
          </div>
        </Fragment>
      )
    }

    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <Link to="/profiles" className="btn btn-light mb-3 float-left">
              Back to profiles
            </Link>
          </div>
          {profileContent}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
    profile: state.profile
})

export default connect(mapStateToProps, {getProfileByHandleAction})(Profile);