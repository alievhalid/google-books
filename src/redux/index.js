import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import { reducer } from "./reducer";

const logger = createLogger({
    diff: true,
    collapsed: true,
  });

  const rootReducer = combineReducers({
      books: reducer
  });


const store = createStore(rootReducer, applyMiddleware(thunk, logger));

export default store;