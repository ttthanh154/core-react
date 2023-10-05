// import React from 'react'
// import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";

// redux
import { persistor, store } from "./store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

// style
import "./sass/index.scss";
import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
