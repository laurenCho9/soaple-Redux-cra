import { applyMiddleware, compose, createStore } from "redux";
import rootReducer from "./reducers";
import { thunk as thunkMiddleware } from "redux-thunk";
import createSagaMiddleware from "@redux-saga/core";
import rootSaga from "./sagas";
// import asyncFunctionMiddleware from "./middlewares/asyncFunctionMiddleware";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware, sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export default store;
