import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
 
import { Clientreducer } from "./client";

const UserPersistStore = {
  key: "User",
  storage,
};
const UserpersistReducer = persistReducer(UserPersistStore, Clientreducer);

export const store = configureStore({
  reducer: { Client: UserpersistReducer },
  middleware: getDefaultMiddleware({
    serializableCheck: false, 
  }),
});
export const persistor=persistStore(store);
