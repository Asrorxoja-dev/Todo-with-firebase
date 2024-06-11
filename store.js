import { configureStore } from "@reduxjs/toolkit";
import userReduser from "./src/features/userSlice"

export const store = configureStore({
    reducer:{
        currentUser: userReduser
    },
})