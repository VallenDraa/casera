import { createContext, useReducer, useState } from 'react';
import { userReducer } from './Reducer';

const user = null;

export const userContext = createContext();
export const toastContext = createContext();
export const loadingContext = createContext();

export const ContextProvider = ({ children }) => {
  const [userState, dispatch] = useReducer(userReducer, user);
  const [toastData, setToastData] = useState(null);
  const [loading, setLoading] = useState(true);

  return (
    <loadingContext.Provider value={[loading, setLoading]}>
      <userContext.Provider value={{ userState, dispatch }}>
        <toastContext.Provider value={{ toastData, setToastData }}>
          {children}
        </toastContext.Provider>
      </userContext.Provider>
    </loadingContext.Provider>
  );
};
