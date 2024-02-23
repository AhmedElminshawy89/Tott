import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoginState, UserData } from "../../Interface";
import { Toastify } from "../../Shared/Toastify";
import axios, { AxiosError } from "axios";

const initialState: LoginState = {
  loading: false,
  data: null,
  error: false,
};

export const userRegister = createAsyncThunk<
  UserData,
  UserData,
  { rejectValue: boolean }
>("register/userRegister", async (user, thunkAPI) => {
  try {
    const { data } = await axios.post<UserData>(
      "http://localhost:1337/api/auth/local/register",
      user
    );
    localStorage.setItem("userData", JSON.stringify(data.user?.username));
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(true);
  }
});
const registerSlice = createSlice({
  initialState,
  name: "register",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userRegister.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      userRegister.fulfilled,
      (state, action: PayloadAction<UserData>) => {
        state.loading = false;
        state.data = action.payload;
        state.error = false;
        Toastify({
          title: "Account Created",
          description: "Inlogin process has been successfully completed.",
          status: "success",
        });
      }
    );
    builder.addCase(userRegister.rejected, (state,action) => {
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

export const selectRegister = (state: { register: LoginState }) =>
  state.register;
export default registerSlice.reducer;
