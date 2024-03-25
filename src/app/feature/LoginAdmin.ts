import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AdminDataLogin, LoginState, UserData } from "../../Interface";
import CookiesServices from "../../Services/CookiesServices";
import { Toastify } from "../../Shared/Toastify";
import axios, { AxiosError } from "axios";

const initialState: LoginState = {
  loading: false,
  data: null,
  error: false,
};

export const adminLogin = createAsyncThunk<
  UserData,
  UserData,
  { rejectValue: boolean }
>("loginadmin/adminLogin", async (user, thunkAPI) => {
  try {
    const { data } = await axios.post<UserData>(
      "http://localhost:8001/api/admin/login",
      user
    );
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(true);
  }
});

const loginAdminSlice = createSlice({
  initialState,
  name: "loginAdmin",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(adminLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
        adminLogin.fulfilled,
      (state, action: PayloadAction<AdminDataLogin>) => {
        state.loading = false;
        state.data = action.payload;
        state.error = false;
        localStorage.setItem("AdminData", JSON.stringify(action.payload.admin));
        const date = new Date();
        const IN_DAYS = 7;
        const EXPIRE_AT_DAYS = 1000 * 60 * 60 * 24 * IN_DAYS;
        date.setTime(date.getTime() + EXPIRE_AT_DAYS);
        const options = { path: "/Tott/", expires: date };
        CookiesServices.set("jwtAdmin", action.payload.admin?.api_token, options);
        Toastify({
          title: "Login Successfully",
          description: "Login process has been successfully completed.",
          status: "success",
        });
      }
    );
    builder.addCase(adminLogin.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      const error = action.payload as unknown as AxiosError;

      if (error.response && error.response.status === 400) {
        Toastify({
          title: "Connection Error",
          description:
            "Failed to connect to the server. Please try again later.",
          status: "error",
        });
      } else {
        Toastify({
          title: "Login failed",
          description: "Please check your credentials and try again.",
          status: "error",
        });
      }
    });
  },
});

export const selectAdminLogin = (state: { login: LoginState }) => state.login;
export default loginAdminSlice.reducer;
