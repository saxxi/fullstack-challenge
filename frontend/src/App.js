import React, { Component } from 'react';
import reduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import './App.css';
import reducers from './reducers';
import ComicList from './components/ComicList';
import Searchbar from './components/Searchbar';
import Loading from './components/Loading';
import OpenCover from './components/OpenCover';

const store = applyMiddleware(reduxThunk)(createStore)(reducers);

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <div className="App">
          <Loading />
          <OpenCover />
          <Searchbar />
          <ComicList />
        </div>
      </Provider>
    );
  }
}

export default App;
