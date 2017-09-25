import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';

import { actions } from '../../actions/index.js';
import './OpenCover.css'

export class OpenCover extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open_comic: null
    };
    this._renderTextItems = this._renderTextItems.bind(this);
  }

  static propTypes = {
    open_comic: PropTypes.object,
    closeCover: PropTypes.func
  }

  handleCloseModal () {
    this.setState({ showModal: false });
  }

  _renderTextItems(title, className, object = {}, renderFn = (el => null)) {
    if (!object.items || object.items.length === 0) {
      return
    }
    return (
      <div className={className}>
        <h4>{title}</h4>
        <p>
          {
            object.items
              .map(t => renderFn(t) || '')
              .reduce((prev, curr) => [prev, ', ', curr])
          }
        </p>
      </div>
    )
  }

  renderCharacters(characters = {}) {
    return this._renderTextItems(
      'Characters',
      'characters',
      characters,
      c => (
        <a key={c.resourceURI} href={c.resourceURI} target="_blank">{c.name}</a>
      )
    )
  }

  renderCreators(creators = {}) {
    return this._renderTextItems(
      'Creators',
      'creators',
      creators,
      c => (
        <a key={c.resourceURI} href={c.resourceURI}
          target="_blank">{c.name} <small>{c.role}</small></a>
      )
    )
  }

  renderImages(images = []) {
    if (images.length === 0) {
      return
    }
    return (
      <div className="images">
        {
          images
            .map(img => `${img.path}.${img.extension}`)
            .map(url => (<img key={url} src={url} alt="img" />))
            .reduce((prev, curr) => [prev, ' ', curr])
        }
      </div>
    )
  }

  render() {
    const comic = this.props.open_comic;
    if (comic && (typeof comic === "object")) {
      const {title, issueNumber, isbn, characters, images, creators} = comic;
      return(
        <ReactModal
          isOpen={true}
          contentLabel="Minimal Modal Example"
          onRequestClose={this.props.closeCover}
          ariaHideApp={true}
        >
          <span className="close" onClick={this.props.closeCover}>&times;</span>
          <h2 className="cover-title">{title}</h2>
          <p className="cover-issueNumber">Issue number {issueNumber}</p>
          <p className="cover-isbn">{isbn}</p>
          { this.renderCharacters(characters) }
          { this.renderImages(images) }
          { this.renderCreators(creators) }
          <br />
          <br />
          <button onClick={this.props.closeCover}>Close</button>
        </ReactModal>
      );
    }
    return null;
  }
}

function mapStateToProps(state) {
  return {
    open_comic: state.open_comic,
  };
 }

export default connect(mapStateToProps, actions)(OpenCover)
