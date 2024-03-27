import { put, delay, takeEvery } from "redux-saga/effects";
import {
  fetchTodosFailed,
  fetchTodosRequested,
  fetchTodosSucceeded,
} from "../actions/fetchTodosAction";

function* fetchTodos() {
  try {
    // 실제로는 서버 API를 호출해서 데이터를 받아와야 함!
    const data = yield delay(3000, [
      "서버로부터 받아온 할 일 1",
      "서버로부터 받아온 할 일 2",
      "서버로부터 받아온 할 일 3",
    ]);

    yield put(fetchTodosSucceeded(data));
  } catch (error) {
    yield put(fetchTodosFailed(error));
  }
}

function* fetchTodosSaga() {
  yield takeEvery(fetchTodosRequested, fetchTodos);
}

export default fetchTodosSaga;
