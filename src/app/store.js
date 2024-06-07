import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import usersSlice from "./users/usersSlice";

const initialState = {
  auth: {
    status: false,
    userData: null,
  },
  users: []
};

const saveToLocalStorage = (state) => {
  try {
    const newState = {
      auth: state.auth,
      users: state.users
    };
    const serializedState = JSON.stringify(newState);
    localStorage.setItem("Login-Register", serializedState);
  } catch (e) {
    console.warn(e);
    alert(e.message);
  }
};

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("Login-Register");
    if (serializedState === null) return initialState;
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn(e);
    return initialState;
  }
};

const rootReducer = {
  auth: authSlice,
  users: usersSlice
};

const store = configureStore({
  reducer: rootReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
  preloadedState: loadFromLocalStorage(),
});

// Subscribe to store changes and save to local storage
store.subscribe(() => {
  const state = store.getState();
  // Save state to local storage
  saveToLocalStorage(state);
});

export default store;
