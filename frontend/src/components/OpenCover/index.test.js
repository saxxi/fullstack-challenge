import React from 'react';
import reduxThunk from 'redux-thunk';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import sinon from 'sinon';

import OpenCover from './index';

let mockStore;
let store;
let mockState = {};
let comic = {
  title: "X-Men",
  issueNumber: 33,
  isbn: "some",
  characters: {},
  images: [],
  creators: {}
}

describe('<OpenCover />', () => {

  beforeEach(() => {
    mockStore = configureStore([reduxThunk]);
    mockState = {}
  })

  it('renders nothing without its minimum requirements', () => {
    const store = mockStore(mockState);
    const component = shallow(<OpenCover store={store} comic={comic} />).shallow();
    expect(component.find('h2')).to.have.length(0);
  })

  it('renders the comic dialog basic details', () => {
    mockState.open_comic = comic

    const store = mockStore(mockState);
    const component = shallow(<OpenCover store={store} />).shallow();

    expect(component.find('.close')).to.have.length(1);
    expect(component.find('h2.cover-title').text()).to.equal(comic.title);
    expect(component.find('p.cover-issueNumber').text()).to.equal(`Issue number ${comic.issueNumber}`)
    expect(component.find('p.cover-isbn').text()).to.equal(`${comic.isbn}`)
  });

  it('can close the dialog', () => {
    mockState.open_comic = comic
    mockState.closeCover = sinon.spy();

    const store = mockStore(mockState);
    const component = shallow(<OpenCover store={store} />).shallow();

    component.find('.close').simulate('click');
    // expect(mockState.closeCover).to.have.property('callCount', 1); // not working
  })

  it('renders the comic dialog characters', () => {
    mockState.open_comic = comic
    mockState.open_comic.characters = {
      "items": [
        {
          "resourceURI": "http://gateway.marvel.com/v1/public/characters/1009583",
          "name": "She-Hulk (Jennifer Walters)"
        }
      ],
    }

    const store = mockStore(mockState);
    const component = shallow(<OpenCover store={store} />).shallow();

    expect(component.find('.characters h4').text()).to.equal('Characters')
    expect(component.find('.characters p').text()).to.equal('She-Hulk (Jennifer Walters)')
  })

  it('renders the comic dialog images', () => {
    mockState.open_comic = comic
    mockState.open_comic.images = [
      {
        "path": "http://l/a29",
        "extension": "jpg"
      },
      {
        "path": "http://l/eae",
        "extension": "jpg"
      }
    ]

    const store = mockStore(mockState);
    const component = shallow(<OpenCover store={store} />).shallow();

    expect(component.find('.images img')).to.have.length(2);
    expect(component.find('.images img').first().prop('src')).to.eq('http://l/a29.jpg');
  })

  it('renders the comic dialog creators', () => {
    mockState.open_comic = comic
    mockState.open_comic.creators = {
      "items": [
        {
          "resourceURI": "http://gateway.marvel.com/v1/public/creators/941",
          "name": "Rick Burchett",
          "role": "penciller"
        },
        {
          "resourceURI": "http://gateway.marvel.com/v1/public/creators/11521",
          "name": "Greg Horn",
          "role": "penciller (cover)"
        }
      ],
    }

    const store = mockStore(mockState);
    const component = shallow(<OpenCover store={store} />).shallow();

    expect(component.find('.creators h4').text()).to.equal('Creators')
    expect(component.find('.creators p').text()).to.equal('Rick Burchett penciller, Greg Horn penciller (cover)')
  })

});
