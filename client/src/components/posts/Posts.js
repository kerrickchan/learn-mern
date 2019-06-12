import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getPostsAction} from '../../actions/postActions'

import Spinner from '../common/Spinner'
import PostItem from './PostItem'

const Posts = ({getPostsAction, post: {posts, loading}}) => {
  useEffect(() => {
    getPostsAction();
  }, [getPostsAction])

  return (
    loading ? <Spinner /> :
              <Fragment>
                <h1 className="large text-primary">Posts</h1>
                <p className="lead">
                  <i className="fas fa-user"/> Welcome to the community
                </p>
                {/*Postform*/}
                <div className="posts">
                  {
                    posts.map(post => (
                      <PostItem key={post._id} post={post} />
                    ))
                  }
                </div>
              </Fragment>
  )
}

Posts.propTypes = {
  getPostsAction: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  post: state.post
})

export default connect(mapStateToProps, {getPostsAction})(Posts)
