import { configureStore } from "@reduxjs/toolkit";
import homePageSlice from "./slices/homePageSlice";
import userSlice from "./slices/userSlice";


export default configureStore({
    reducer : {
        HomePage : homePageSlice,
        User : userSlice
    }
})