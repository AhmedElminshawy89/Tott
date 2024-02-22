import { configureStore } from "@reduxjs/toolkit";
import NetworkSlice from "./feature/NetworkSlice";
import { weatherApi } from "./feature/weatherApi ";
import LoginSlice from "./feature/LoginSlice";
import RegisterSlice from "./feature/RegisterSlice";

export const Store = configureStore({
  reducer: {
    network: NetworkSlice,
    [weatherApi.reducerPath]: weatherApi.reducer,
    login: LoginSlice,
    register: RegisterSlice,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(weatherApi.middleware);
  },
});

export type RootState = ReturnType<typeof Store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof Store.dispatch;
