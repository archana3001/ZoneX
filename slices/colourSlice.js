import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    value:0,
    login:false,
    info:{},
    colour:" "
}

export const colourSlice = createSlice({
    name:'colour',
    initialState:initialState,
    reducers:{
        increment : (state)=>{
            state.value +=1;
        },
        decrement : (state)=>{
            state.value-=1;
        },
        incrementByAmount : (state,action)=>{
            state.value += action.payload;
        },
        setInfo:(state,action)=>{
            state.info=action.payload;
            console.log("payload",action.payload);
            state.login = true;
            console.log("logined");
        },
        logout:(state)=>{
            state.login = false;
            state.info={};
        }
    
    }
});

export const {increment,incrementByAmount,decrement,setInfo,logout} = colourSlice.actions;
export default colourSlice.reducer;