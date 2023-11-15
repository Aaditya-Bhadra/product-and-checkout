import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import dataReducer from "./slice/commonSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

const rootReducer = combineReducers({
  data: dataReducer,
});

export { rootReducer };

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(thunk),
  devTools: true,
});

export type RootState = ReturnType<typeof rootReducer>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector




export { store };
