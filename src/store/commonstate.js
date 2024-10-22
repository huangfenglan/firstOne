import { createSlice } from '@reduxjs/toolkit';
// import { log } from 'console'

export const userSlice = createSlice({
  name: 'userInfo',
  initialState: {
    name: 'lanfenghuang',
  },
  reducers: {
    changeName: (state, action) => {
      state.name = action?.payload;
    },
  },
});

export const { changeName } = userSlice.actions;

//异步操作函数
export const changeNameAsync = (amount) => (dispatch) => {
  setTimeout(() => {
    dispatch(changeName('异步改用户信息'));
  }, 1000);
};

export const selectCount = (state) => state.counter.name;

export default userSlice.reducer;
