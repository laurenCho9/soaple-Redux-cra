import { applyMiddleware, compose, createStore } from "redux";
import rootReducer from "./reducers";
import { thunk as thunkMiddleware } from "redux-thunk";
import createSagaMiddleware from "@redux-saga/core";
import rootSaga from "./sagas";
// import asyncFunctionMiddleware from "./middlewares/asyncFunctionMiddleware";
import { persistReducer, persistStore, createMigrate } from "redux-persist";
import storage from "redux-persist/lib/storage";
import sessionStorage from "redux-persist/lib/storage/session";

const migrations = {
  1: (state) => {
    return {
      ...state,
      fetchTodos: {
        ...state.fetchTodos,
        extraData: undefined,
      },
    };
  },
  2: (state) => {
    return {
      ...state,
      fetchTodos: {
        ...state.fetchTodos,
        extraData: null,
      },
    };
  },
};

const persistConfig = {
  key: "root",
  storage: sessionStorage,
  version: 2,
  migrations: createMigrate(migrations, { debug: false }),
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
