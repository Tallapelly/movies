import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import movieReducer from "./store/movieState.js";
import movieSaga from "./store/movieSaga.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    movies: movieReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(movieSaga);

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path="*" element={<App />} />
      </Routes>
    </Provider>
  </BrowserRouter>
);
