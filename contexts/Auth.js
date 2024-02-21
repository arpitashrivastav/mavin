import React, { createContext, useContext, useReducer } from "react";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
};

const SET_USER = "SET_USER";
const SET_LOADING = "SET_LOADING";
const SET_ERROR = "SET_ERROR";

const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

const setLoading = (isLoading) => ({
  type: SET_LOADING,
  payload: isLoading,
});

const setError = (error) => ({
  type: SET_ERROR,
  payload: error,
});

const reducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case SET_LOADING:
      return { ...state, isLoading: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const actions = {
    setUser: (user) => dispatch(setUser(user)),
    setLoading: (isLoading) => dispatch(setLoading(isLoading)),
    setError: (error) => dispatch(setError(error)),
  }

  return (
    <AuthContext.Provider value={{ state, actions }}>
      {children}
    </AuthContext.Provider>
  );
};
