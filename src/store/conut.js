import { createSlice } from '@reduxjs/toolkit';

export const conutSlice = createSlice({
  name: 'conut',
  initialState: {
    usersList: [
      {
        key: '13166666666',
        nickName: 'asfda',
        phone: '13166666666',
        age: 23,
        password: '123456w',
        department: {
          label: '天猫国际',
          value: 6,
          key: 6,
        },
        description: '描述舒适描述舒适描述舒适描述舒适描述舒适描述舒适描述舒适',
        createTime: '2024-12-04 11:43:20',
        updateTime: '2024-12-04 11:43:20',
      },
      {
        key: '13166666661',
        nickName: 'asfda',
        phone: '13166666661',
        age: 23,
        password: '123456w',
        department: {
          label: '天猫国际',
          value: 6,
          key: 6,
        },
        description: '描述舒适描述舒适描述舒适描述舒适描述舒适描述舒适描述舒适',
        createTime: '2024-12-04 11:43:20',
        updateTime: '2024-12-04 11:43:20',
      },
    ],
    curUserInfo: {},
  },
  reducers: {
    addUser: ({ usersList, ...rest }, { payload }) => {
      return {
        ...rest,

        usersList: [{ ...payload, key: payload?.phone }, ...usersList],
      };
    },
    updateCurUserInfo: (state, { payload }) => {
      return {
        ...state,
        usersList: [...payload],
      };
    },
    loginUserInfo: (state, { payload }) => {
      return {
        ...state,
        curUserInfo: payload,
      };
    },
  },
});

export const { addUser, updateCurUserInfo, loginUserInfo } = conutSlice.actions;

//异步操作函数
// export const incrementAsync = (amount) => (dispatch) => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount));
//   }, 1000);
// };

// export const selectCount = (state) => state.counter.value;

export default conutSlice.reducer;
