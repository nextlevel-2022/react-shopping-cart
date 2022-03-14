import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  "1": 1,
  "2": 1,
};

const cartCounterSlice = createSlice({
  name: 'cartCounter',
  initialState,
  reducers: {
    increase(state, { payload: { key, value } }) {
      state[key].value++
    },
    decrease(state, {payload :{ key, value }}) {
      state[key].value--;
    },
    // insert(state, action) {
      
    // },
  }
})

export const { increase, decrease } = cartCounterSlice.actions;
export default cartCounterSlice;
