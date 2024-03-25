import { configureStore } from "@reduxjs/toolkit";
import NetworkSlice from "./feature/NetworkSlice";
import { weatherApi } from "./feature/weatherApi ";
import LoginSlice from "./feature/LoginSlice";
import RegisterSlice from "./feature/RegisterSlice";
import { ApiCategory } from "./feature/CategorySlice";
import { ApiCity } from "./feature/CitySlice";
import { ApiReview } from "./feature/ReviewSlice";
import { ApiAdmin } from "./feature/AdminSlice";
import { ApiUser } from "./feature/UserSlice";
import { ApiPlace } from "./feature/PlaceSlice";
import RegisterAdmin from "./feature/RegisterAdmin";
import LoginAdmin from "./feature/LoginAdmin";

export const Store = configureStore({
  reducer: {
    network: NetworkSlice,
    [weatherApi.reducerPath]: weatherApi.reducer,
    [ApiCategory.reducerPath]: ApiCategory.reducer,
    [ApiCity.reducerPath]: ApiCity.reducer,
    [ApiReview.reducerPath]: ApiReview.reducer,
    [ApiAdmin.reducerPath]: ApiAdmin.reducer,
    [ApiUser.reducerPath]: ApiUser.reducer,
    [ApiPlace.reducerPath]: ApiPlace.reducer,
    login: LoginSlice,
    loginAdmin: LoginAdmin,
    register: RegisterSlice,
    registerAdmin: RegisterAdmin,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      weatherApi.middleware,
      ApiCategory.middleware,
      ApiCity.middleware,
      ApiReview.middleware,
      ApiAdmin.middleware,
      ApiUser.middleware,
      ApiPlace.middleware
    ),
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
