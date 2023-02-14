import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import selectionsReducer from "./selectionReducer";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  selections: selectionsReducer,
});

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

function* rootSaga() {
  yield all([]);
}

sagaMiddleware.run(rootSaga);

export default store;
