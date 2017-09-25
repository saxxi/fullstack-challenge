import { combineReducers } from 'redux';
import ComicsReducer from './reducer_comics';
import OpenComicReducer from './reducer_open_comic';
import SearchReducer from './reducer_search';
import LoadingReducer from './reducer_loading';
import UpVotesReducer from './reducer_upvotes';

const rootReducer = combineReducers({
  comics: ComicsReducer,
  open_comic: OpenComicReducer,
  search_term: SearchReducer,
  up_votes: UpVotesReducer,
  loading: LoadingReducer,
});

export default rootReducer;
