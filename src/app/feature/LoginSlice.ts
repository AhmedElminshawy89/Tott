import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginState, UserData } from "../../Interface";
import CookiesServices from "../../Services/CookiesServices";
import { Toastify } from "../../Shared/Toastify";
import axios, { AxiosError } from "axios";

const initialState: LoginState = {
  loading: false,
  data: null,
  error: false,
};

export const userLogin = createAsyncThunk<
  UserData,
  UserData,
  { rejectValue: boolean }
>("login/userLogin", async (user, thunkAPI) => {
  try {
    const { data } = await axios.post<UserData>(
      "http://localhost:1337/api/auth/local",
      user
    );
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(true);
  }
});

const loginSlice = createSlice({
  initialState,
  name: "login",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      userLogin.fulfilled,
      (state, action: PayloadAction<UserData>) => {
        state.loading = false;
        state.data = action.payload;
        state.error = false;
        localStorage.setItem("username", JSON.stringify(action.payload.user));
        const date = new Date();
        const IN_DAYS = 7;
        const EXPIRE_AT_DAYS = 1000 * 60 * 60 * 24 * IN_DAYS;
        date.setTime(date.getTime() + EXPIRE_AT_DAYS);
        const options = { path: "/Tott/", expires: date };
        CookiesServices.set("jwt", action.payload.jwt, options);
        Toastify({
          title: "Login Successfully",
          description: "Login process has been successfully completed.",
          status: "success",
        });
      }
    );
    builder.addCase(userLogin.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      const error = action.payload as unknown as AxiosError;

      if (error.response && error.response.status === 400) {
        Toastify({
          title: "Login failed",
          description: "Please check your credentials and try again.",
          status: "error",
        });
      } else {
        Toastify({
          title: "Connection Error",
          description:
            "Failed to connect to the server. Please try again later.",
          status: "error",
        });
      }
    });
  },
});

export const selectLogin = (state: { login: LoginState }) => state.login;
export default loginSlice.reducer;
