import React, { createContext, Dispatch, useReducer } from 'react';
import { initialState, InitialStateType } from './initialState';
import reducer, { Action } from './reducer';

export const AppContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

const AnswersStore = ({ children }: { children: React.ReactNode }) => {
  //@ts-ignore
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AnswersStore;
