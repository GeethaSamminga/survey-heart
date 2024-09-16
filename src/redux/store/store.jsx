import { applyMiddleware, legacy_createStore } from "redux";
import todosReducer from "../reducer/reducer";
import { thunk } from 'redux-thunk';
// Correctly import redux-thunk

const reduxStore = legacy_createStore(todosReducer, applyMiddleware(thunk));

export default reduxStore;
