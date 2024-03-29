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
    const formData = new FormData();
    formData.append("fname", user.fname || "");
    formData.append("lname", user.lname || "");
    formData.append("email", user.email || "");
    formData.append("password", user.password || "");
    formData.append("com_password", user.com_password || "");
    formData.append("phone", user.phone || "");
    formData.append("age", user.age || "");
    formData.append("gender", user.gender || "");
    formData.append("city", user.city || "");
    formData.append("country", user.country || "");
    formData.append("photo", user.photo||"");
    const { data } = await axios.post<UserData>(
      "http://localhost:8001/api/registerUser",
      formData
    );
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
    builder.addCase(userRegister.rejected, (state, action) => {
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
          title: "Register failed",
          description: "This email has already been used before",
          status: "error",
        });
      }
    });
  },
});

export const selectRegister = (state: { register: LoginState }) =>
  state.register;
export default registerSlice.reducer;
