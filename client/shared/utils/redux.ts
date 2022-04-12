import { PayloadAction } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

import { useAppSelector } from '../../store';
import { BaseRequestReducerState, MODELS, RootState } from '../types';

export const createModelAttributeSelector = (modelSelector: any) => ({
  value: createSelector(modelSelector, (model) => model.value),
  isLoading: createSelector(modelSelector, (model) => model.isLoading),
  hasError: createSelector(modelSelector, (model) => model.hasError),
  error: createSelector(modelSelector, (model) => model.error),
});

export const createModelAttributeObject = <ValueType>(attributeSelector: any): BaseRequestReducerState<ValueType> => ({
  value: useAppSelector(attributeSelector.value),
  isLoading: useAppSelector(attributeSelector.isLoading),
  hasError: useAppSelector(attributeSelector.hasError),
  error: useAppSelector(attributeSelector.error),
});

export const createRequestReducer = (model: MODELS) => {
  return (state: RootState) => {
    state[model].isLoading = true;
  };
};

export const createFailureReducer = (model: MODELS) => {
  return (state: RootState, action: PayloadAction<{ error: Error }>) => {
    state[model].isLoading = false;
    state[model].error = action.payload;
    state[model].hasError = true;
  };
};
