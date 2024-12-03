import { createSlice } from '@reduxjs/toolkit';

export const conutSlice = createSlice({
  name: 'conut',
  initialState: {
    curPageUrl: '/', //获取当前url
  },
  reducers: {
    changeCurPageUrl: (state, payload) => ({ ...state, curPageUrl: payload }),
    // increment: (state) => {
    //   state.value += 1;
    // },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload;
    // },
  },
});

// export const { increment, decrement, incrementByAmount } = conutSlice.actions;

//异步操作函数
// export const incrementAsync = (amount) => (dispatch) => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount));
//   }, 1000);
// };

export const selectCount = (state) => state.counter.value;

export default conutSlice.reducer;
