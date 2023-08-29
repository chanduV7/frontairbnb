import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {baseUrl} from "../../utlis/api";
const userSlice = createSlice({
    name: "User",
    initialState: {
        value: {
            register: {},
            login: {},
            generateToken: {},
            verifyToken: {},
            changePass:{},
            userDetails:{}
        }
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(register.fulfilled, (state,action) => {
            state.value.register = action.payload;
            state.error = null
        })
        builder.addCase(register.rejected, (state,action) => {
            state.value.register = null;
            state.error = action.error;
        })
        builder.addCase(generateToken.fulfilled, (state,action) => {
            state.value.generateToken = action.payload;
            state.error = null
        })
        builder.addCase(generateToken.rejected, (state,action) => {
            state.value.generateToken = null;
            state.error = action.error;
        })
        builder.addCase(verifyToken.fulfilled, (state,action) => {
            state.value.verifyToken = action.payload;
            state.error = null
        })
        builder.addCase(verifyToken.rejected, (state,action) => {
            state.value.verifyToken = null;
            state.error = action.error;
        })
        builder.addCase(changePassword.fulfilled, (state,action) => {
            state.value.changePass = action.payload;
            state.error = null
        })
        builder.addCase(changePassword.rejected, (state,action) => {
            state.value.changePass = null;
            state.error = action.error;
        })
        builder.addCase(fetchUser.fulfilled, (state,action) => {
            state.value.userDetails = action.payload;
            state.error = null
        })
        builder.addCase(fetchUser.rejected, (state,action) => {
            state.value.userDetails = null;
            state.error = action.error;
        })
        builder.addCase(login.fulfilled, (state,action) => {
            state.value.login = action.payload.data;
            localStorage.clear();
            const keys = Object.keys(action.payload.data);
            for (const key of keys) {
                localStorage.setItem(key, action.payload.data[key])
            }
            if(action.payload.data.token) {
                action.payload.navigate("/")
            }
            state.error = null
        })
        builder.addCase(login.rejected, (state,action) => {
            state.value.login = null;
            state.error = action.error;
        })
    }
})

export const register = createAsyncThunk("/register",async(userDetails) => {
    const {data} = await axios.post(baseUrl+"/users/register", userDetails);
    return data;
})
export const login = createAsyncThunk("/login",async({userDetails,navigate}) => {
    const {data} = await axios.post(baseUrl+"/users/login", userDetails);
    return {data,navigate};
})
export const generateToken = createAsyncThunk("/passwordReset",async(userDetails) => {
    const {data} = await axios.post(baseUrl+"/users/passwordReset", userDetails);
    return data;
})
export const verifyToken = createAsyncThunk("/verifyToken",async(token) => {
    const {data} = await axios.get(baseUrl+"/users/verify"+ token);
    return data;
})
export const changePassword = createAsyncThunk("/changePassword",async(passData) => {
    const {data} = await axios.post(baseUrl+"/users/changePass", passData);
    return data;
})
export const fetchUser = createAsyncThunk("/fetchUser",async() => {
    const token = localStorage.getItem("token");
    const {data} = await axios.get(baseUrl+"/users/loggedInUser", {
        headers: {
            Authorization: "Bearer "+ token
        }
    });
    return data;
})

export default userSlice.reducer;