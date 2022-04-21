import { createContext, useReducer, useState } from 'react';
import { userReducer } from './Reducer';

export const userContext = createContext();
export const errorContext = createContext();

export const ContextProvider = ({ children }) => {
  const [userState, dispatch] = useReducer(userReducer, {
    user: null,
  });

  const [error, setError] = useState(null);
  return (
    <userContext.Provider value={{ userState, dispatch }}>
      <errorContext.Provider value={{ error, setError }}>
        {children}
      </errorContext.Provider>
    </userContext.Provider>
  );
};
