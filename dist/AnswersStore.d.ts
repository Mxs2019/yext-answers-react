import React, { Dispatch } from 'react';
import { InitialStateType } from './initialState';
import { Action } from './reducer';
export declare const AppContext: React.Context<{
    state: InitialStateType;
    dispatch: Dispatch<Action>;
}>;
declare const AnswersStore: ({ children }: {
    children: React.ReactNode;
}) => JSX.Element;
export default AnswersStore;
