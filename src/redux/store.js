import { applyMiddleware, compose, createStore } from "redux";
import rootReducer from "./reducers";
import { thunk as thunkMiddleware } from "redux-thunk";
import createSagaMiddleware from "@redux-saga/core";
import rootSaga from "./sagas";
// import asyncFunctionMiddleware from "./middlewares/asyncFunctionMiddleware";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage: storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware, sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export default store;
