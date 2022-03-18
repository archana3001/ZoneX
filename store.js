import {configureStore} from "@reduxjs/toolkit";
import colourReducer from "./slices/colourSlice";

export const store = configureStore({
    reducer : {colour:colourReducer},
});