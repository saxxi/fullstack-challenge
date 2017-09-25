import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Cover.css';
import _ from 'lodash';

export default class Cover extends Component {
    constructor(props) {
      super(props);
      this.state = { image_size: this.imageSize(window.innerWidth), mouseOver: false }
      this.props.openCover.bind(this)
      this.props.upVote.bind(this)
    }

    static propTypes = {
      comicData: PropTypes.object.isRequired,
      openCover: PropTypes.func.isRequired,
      upVote: PropTypes.func.isRequired,
      upVoted: PropTypes.bool.isRequired
    }

    handleResize() {
      this.setState({ image_size: this.imageSize(window.innerWidth) });
    }

    componentDidMount() {
      window.addEventListener('resize', this.handleResize.bind(this));
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.handleResize.bind(this));
    }

    imageSize(width) {
      return (width < 768) ? 'portrait_uncanny' : 'portrait_fantastic' ;
    }

    coverClick(evt) {
      switch (evt.target.dataset.type) {
        case 'cover-heart':
          this.props.upVote()
          break;
        default:
          this.props.openCover()
      }
    }

    showDetails(show) {
      this.setState({ mouseOver: show })
    }

    coverDate() {
      const date = _.find(this.props.comicData.dates, ['type', 'onsaleDate']);
      return new Date(date.date).getFullYear();
    }

    coverUpvoted() {
      if(!this.props.upVoted) { return null; }

      return (<div className="cover-upvoted">
          <div data-type="cover-heart" className="cover-heart-on"></div>
        </div>)
    }

    renderDetail() {
      if (!this.state.mouseOver) { return null; }

      return (
        <div className="cover-detail">
          <div data-type="cover-heart" className="cover-heart"></div>
          <div className="cover-footer">
            <div className="cover-title">
              { this.props.comicData.title }
            </div>
            <div>
              <span className="cover-issue"># { this.props.comicData.issueNumber }</span>
              <span className="cover-year">{ this.coverDate.call(this) }</span>
            </div>
          </div>
        </div>
        );
    }

    coverImage() {
      return `${this.props.comicData.thumbnail.path}/${this.state.image_size}.${this.props.comicData.thumbnail.extension}`;
    }

    render() {
      return (
        <div className="pure-u-23-24 pure-u-md-1-4 pure-u-lg-1-5"
          onClick={ this.coverClick.bind(this) }
          onMouseEnter={ this.showDetails.bind(this, true) }
          onMouseLeave={ this.showDetails.bind(this, false) }>
          <div className="cover">
            <img className="cover-image" alt={ this.props.comicData.title } src={ this.coverImage.call(this) } />
            { this.renderDetail() }
            { this.coverUpvoted() }
          </div>
        </div>
      );
    }
}
