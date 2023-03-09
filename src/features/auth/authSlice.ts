import type { SerializedError } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  type User,
  createUserWithEmailAndPassword,
  getRedirectResult,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from 'firebase/auth';

import { auth, googleAuthProvider } from '../../services/firebase/firebase';
import { RootState } from '../../store';

/**------------------------------------------------------------------------
 *#                                TYPES
 *------------------------------------------------------------------------**/

export interface AuthState {
  user: UserInfo | null;
  loadingStatus: 'idle' | 'pending' | 'unset';
  currentRequestId: undefined | string;
  error: SerializedError | null;
}

interface EmailAndPassword {
  email: string;
  password: string;
}

export type UserInfo = Pick<
  User,
  | 'displayName'
  | 'email'
  | 'uid'
  | 'photoURL'
  | 'emailVerified'
  | 'isAnonymous'
  | 'phoneNumber'
>;

/**------------------------------------------------------------------------
 *#                                HELPERS
 *------------------------------------------------------------------------**/

/**
 * Gets essential info from Firebase `User` object and returns serialized `UserInfo` object.
 * @param user - `User` object from Firebase-Auth
 * @returns Serialized object with essential user info
 */
export const getUserInfo = (user: User): UserInfo => {
  return {
    email: user.email,
    emailVerified: user.emailVerified,
    displayName: user.displayName,
    photoURL: user.photoURL,
    isAnonymous: user.isAnonymous,
    phoneNumber: user.phoneNumber,
    uid: user.uid,
  };
};

/**------------------------------------------------------------------------
 *#                           ASYNC THUNKS
 *------------------------------------------------------------------------**/

/*------------------ LOGIN WITH EMAIL AND PASSWORD THUNK -----------------*/

export const logInWithEmailAndPassword = createAsyncThunk<
  void,
  EmailAndPassword,
  {
    state: RootState;
    rejectValue: string;
  }
>(
  'auth/logInWithEmail',
  async ({ email, password }, thunkApi) => {
    const { user: currentUser } = thunkApi.getState().auth;
    const { rejectWithValue } = thunkApi;

    // This condition will take affect only if AuthObserver isn't used for redirection
    if (currentUser?.email === email.toLowerCase()) {
      return rejectWithValue('User already logged in');
    }

    await signInWithEmailAndPassword(auth, email, password);
  },
  // This cancels before entering the thunk
  {
    condition: (_, { getState }) => {
      const { loadingStatus } = getState().auth;
      if (loadingStatus === 'pending') {
        return false;
      }
    },
  }
);

/*------------------ REGISTER WITH EMAIL AND PASSWORD THUNK -----------------*/
export const registerWithEmailAndPassword = createAsyncThunk<
  void,
  EmailAndPassword,
  {
    state: RootState;
  }
>(
  `auth/registerWithEmail`,
  async ({ email, password }) => {
    await createUserWithEmailAndPassword(auth, email, password);
  },
  // canceling before entering the thunk
  // Todo: Add feature
  // Implement better error message for this case inside the component.
  // Now there is only generic error message.
  {
    condition: (_, { getState }) => {
      const { loadingStatus } = getState().auth;
      if (loadingStatus === 'pending') {
        return false;
      }
    },
  }
);

/*------------------------------ SIGN IN WITH GOOGLE ----------------------------*/

export const signInWithGooglePopup = createAsyncThunk(
  'auth/signInWithGooglePopup',
  async () => {
    await signInWithPopup(auth, googleAuthProvider);
  }
);

/**
 * Due to redirection mechanism of signing in,
 * this thunk cannot be traced with redux dev tools
 *
 * No point to include this inside extra reducers builder case.
 */
export const signInWithGoogleRedirect = createAsyncThunk(
  'auth/signInWithGoogleRedirect',
  async () => {
    await signInWithRedirect(auth, googleAuthProvider);
    await getRedirectResult(auth);
  }
);

/*-------------------------------- LOGOUT THUNK ------------------------------*/
export const logOut = createAsyncThunk('auth/logout', async () => {
  await signOut(auth);
});

/**------------------------------------------------------------------------
 *#                              AUTH SLICE
 *------------------------------------------------------------------------**/
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loadingStatus: 'unset',
    currentRequestId: undefined,
    error: null,
  } as AuthState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserInfo | null>) => {
      switch (true) {
        case state.user === null && action.payload === null: {
          state.loadingStatus = 'idle';
          break;
        }
        case state.user === null && action.payload !== null: {
          state.user = action.payload;
          state.loadingStatus = 'idle';
          break;
        }
        case state.user &&
          action.payload &&
          state.user.uid !== action.payload.uid: {
          state.user = action.payload;
          state.loadingStatus = 'idle';
          break;
        }
        case state.user?.uid === action.payload?.uid: {
          state.loadingStatus = 'idle';
          break;
        }
        case state.user !== null && action.payload === null: {
          state.user = null;
          state.loadingStatus = 'idle';
          break;
        }
        default: {
          console.info('Unknown user state');
          break;
        }
      }
    },
    // This reducer is for test purposes only.
    // All loadingStatus changes are handled by other reducers.
    setLoadingStatus: (
      state,
      action: PayloadAction<AuthState['loadingStatus']>
    ) => {
      if (state.loadingStatus !== action.payload) {
        state.loadingStatus = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    /*------------------ LOGIN WITH EMAIL AND PASSWORD BUILDER -----------------*/
    builder
      .addCase(logInWithEmailAndPassword.pending, (state, action) => {
        const { requestId } = action.meta;
        if (state.loadingStatus === 'idle') {
          state.loadingStatus = 'pending';
          state.currentRequestId = requestId;
        }
      })
      .addCase(logInWithEmailAndPassword.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (
          state.loadingStatus === 'pending' &&
          state.currentRequestId === requestId
        ) {
          state.loadingStatus = 'idle';
          state.currentRequestId = undefined;
          state.error = null;
        }
      })
      .addCase(logInWithEmailAndPassword.rejected, (state, action) => {
        const { requestId } = action.meta;

        if (
          state.loadingStatus === 'pending' &&
          state.currentRequestId === requestId
        ) {
          state.loadingStatus = 'idle';
          state.error = action.error;
        }
      });
    /*------------------ REGISTER WITH EMAIL AND PASSWORD BUILDER -----------------*/
    builder
      .addCase(registerWithEmailAndPassword.pending, (state, action) => {
        const { requestId } = action.meta;
        if (state.loadingStatus === 'idle') {
          state.loadingStatus = 'pending';
          state.currentRequestId = requestId;
        }
      })
      .addCase(registerWithEmailAndPassword.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (
          state.loadingStatus === 'pending' &&
          state.currentRequestId === requestId
        ) {
          state.loadingStatus = 'idle';
          state.currentRequestId = undefined;
          state.error = null;
        }
      })
      .addCase(registerWithEmailAndPassword.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (
          state.loadingStatus === 'pending' &&
          state.currentRequestId === requestId
        ) {
          state.loadingStatus = 'idle';
          state.error = action.error;
        }
      });

    /*----------------------- SIGN IN WITH GOOGLE POPUP BUILDER --------------------*/
    builder
      .addCase(signInWithGooglePopup.pending, (state, action) => {
        const { requestId } = action.meta;
        if (state.loadingStatus === 'idle') {
          state.loadingStatus = 'pending';
          state.currentRequestId = requestId;
        }
      })
      .addCase(signInWithGooglePopup.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (
          state.loadingStatus === 'pending' &&
          state.currentRequestId === requestId
        ) {
          state.loadingStatus = 'idle';
          state.currentRequestId = undefined;
          state.error = null;
        }
      })
      .addCase(signInWithGooglePopup.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (
          state.loadingStatus === 'pending' &&
          state.currentRequestId === requestId
        ) {
          state.loadingStatus = 'idle';
          state.error = action.error;
        }
      });

    /*-------------------------------- LOGOUT BUILDER------------------------------*/
    builder
      .addCase(logOut.pending, (state, action) => {
        const { requestId } = action.meta;
        if (state.loadingStatus === 'idle') {
          state.loadingStatus = 'pending';
          state.currentRequestId = requestId;
        }
      })
      .addCase(logOut.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (
          state.loadingStatus === 'pending' &&
          state.currentRequestId === requestId
        ) {
          state.loadingStatus = 'idle';
          state.currentRequestId = undefined;
          state.user = null;
          state.error = null;
        }
      })
      .addCase(logOut.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (
          state.loadingStatus === 'pending' &&
          state.currentRequestId === requestId
        ) {
          state.loadingStatus = 'idle';
          state.error = action.error;
        }
      });
  },
});

/*------------------------------------------------------------------------*/

export const authReducer = authSlice.reducer;
export const { setUserInfo, setLoadingStatus } = authSlice.actions;
