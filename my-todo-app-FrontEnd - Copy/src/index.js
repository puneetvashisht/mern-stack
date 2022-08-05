import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { applyMiddleware, createStore } from "redux";
import userReducer from "./store/userReducer";
import todoReducer from "./store/todoReducer";
import { Provider } from "react-redux";
import { combineReducers } from "redux";
import thunk from "redux-thunk";

const rootReducer = combineReducers({ userReducer, todoReducer });

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

reportWebVitals();
