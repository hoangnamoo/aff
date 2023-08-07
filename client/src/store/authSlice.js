import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authApi from '../api/authApi';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLogined: false,
        userInfo: {},
    },
    reducers: {
        login(state, action) {
            state.isLogined = true;
        },
        logout(state, action) {
            state.isLogined = false;
        },
        setUserInfo(state, action) {
            state.userInfo = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getUserInfoByToken.fulfilled, (state, action) => {
            state.userInfo = action.payload;
            state.isLogined = true;
        });
        builder.addCase(getUserInfoByToken.rejected, (state, action) => {
            localStorage.removeItem('access_token');
            localStorage.removeItem('user_info');
        });
    },
});

const authActions = authSlice.actions;
const authReducer = authSlice.reducer;

const getUserInfoByToken = createAsyncThunk(
    'auth/getUserInfoByToken',
    async () => {
        const { data } = await authApi.getUserInfo();
        return data.data;
    }
);

export { authActions, getUserInfoByToken };
export default authReducer;
