import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore"; // <- needed if using firestore
import { createStore, combineReducers, compose } from "redux";
import {
  ReactReduxFirebaseProvider,
  firebaseReducer,
} from "react-redux-firebase";
import { createFirestoreInstance, firestoreReducer } from "redux-firestore"; // <- needed if using firestore
import App from "./App";

const firebaseConfig = {
  apiKey: "AIzaSyCe5TcTjgsxGjY3EmmLUbI555E9b-Sn8bA",
  authDomain: "patient-driven.firebaseapp.com",
  databaseURL: "https://patient-driven.firebaseio.com",
  projectId: "patient-driven",
  storageBucket: "patient-driven.appspot.com",
  messagingSenderId: "722903514812",
  appId: "1:722903514812:web:618834cf1469214a1e9ab9",
  measurementId: "G-PRCQXHYF8E",
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: "users",
  // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

// Initialize firebase instance
firebase.initializeApp(firebaseConfig);

// Initialize other services on firebase instance
const firestore = firebase.firestore(); // <- needed if using firestore
firestore.settings({
  host: "localhost:8080",
  ssl: false,
});

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer, // <- needed if using firestore
});

// Create store with reducers and initial state
const initialState = { firestore: { ordered: { patients: [] } } };
const store = createStore(rootReducer, initialState);

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance, // <- needed if using firestore
};

// Setup react-redux so that connect HOC can be used
function Wrap({ children }) {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        {children}
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}

render(
  <Wrap>
    <App />
  </Wrap>,
  document.getElementById("root")
);
