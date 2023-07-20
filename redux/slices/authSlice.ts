import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { User as FirebaseUser, OAuthCredential } from 'firebase/auth';

export interface FirebaseAuth {
  currentUser: FirebaseUser | null;
  credentials: OAuthCredential | null;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  firebaseAuth: FirebaseAuth;
}

const slice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    firebaseAuth: {
      currentUser: null,
      credentials: null,
    },
  } as AuthState,
  reducers: {
    setUser: (state, { payload: user }: PayloadAction<User>) => {
      state.user = user;
    },
    setFirebaseAuth: (state, { payload: firebaseAuth }: PayloadAction<FirebaseAuth>) => {
      state.firebaseAuth = firebaseAuth;
    },
    logOut: (state) => {
      state.user = null;
      state.firebaseAuth = {
        currentUser: null,
        credentials: null,
      };
    },
  },
  extraReducers: (builder) => {},
});

export const { setUser, setFirebaseAuth, logOut } = slice.actions;

export default slice.reducer;

export const selectUser = (state: RootState) => state.auth.user;
