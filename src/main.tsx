// import React from 'react'
// import ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client';

// redux
import { store } from "./store";
import { Provider } from "react-redux";

// style
import "./sass/index.scss";
import App from "./App";

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
