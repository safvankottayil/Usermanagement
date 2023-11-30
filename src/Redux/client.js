import { createSlice } from "@reduxjs/toolkit";

const ClientAuth=createSlice({
    name:'Client',
    initialState:{
        Token:null,
        Username:null,
        Theme:'light'
    },
    reducers:{
        SetToken:function(state,action){
            state.Token=action.payload.Token
        },
        SetUserName:function(state,action){
            state.Username=action.payload.Username
        },
        SetTheme:function(state,action){
            state.Theme=action.payload.Theme
        }
    }
})
export const {SetToken,SetUserName,SetTheme}=ClientAuth.actions
export const Clientreducer=ClientAuth.reducer