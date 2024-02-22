import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoginState, UserData } from "../../Interface";
import { Toastify } from "../../Shared/Toastify";
import axios from "axios";

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
    builder.addCase(userRegister.rejected, (state) => {
      state.loading = false;
      state.error = true;
      Toastify({
        title: "Register failed",
        description: "Email or Username are already taken",
        status: "error",
      });
    });
  },
});

export const selectRegister = (state: { register: LoginState }) =>
  state.register;
export default registerSlice.reducer;
