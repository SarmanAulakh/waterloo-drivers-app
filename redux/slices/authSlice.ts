import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { User as FirebaseUser, UserCredential } from "firebase/auth";
import { User } from "../../types/apiTypes";

export interface FirebaseAuth {
  currentUser: FirebaseUser | null;
  credentials: UserCredential | null;
}

export interface AuthState {
  user: User | null;
  credentials: UserCredential | null;
  // firebaseAuth: FirebaseAuth;
}

const slice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    credentials: null,
  } as AuthState,
  reducers: {
    setUser: (state, { payload: authState }: PayloadAction<AuthState>) => {
      state.user = authState.user;
    },
    logOut: (state) => {
      state.user = null;
      state.credentials = null;
    },
  },
  extraReducers: (builder) => {},
});

export const { setUser, logOut } = slice.actions;

export default slice.reducer;

export const selectUser = (state: RootState) => state.auth.user;
