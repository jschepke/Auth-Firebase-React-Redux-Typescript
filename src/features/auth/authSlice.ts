import type { SerializedError } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AuthError, User } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../../services/firebase/firebase";
import { AppDispatch, RootState } from "../../store";
import {
  errorMessages,
  fallbackErrorMessage,
  isSelectedAuthErrorCode,
} from "./errorCodes";

// # types _____________________________________________________________________

export interface AuthState {
  user: UserInfo | null;
  loadingStatus: "idle" | "pending" | "unset";
  currentRequestId: undefined | string;
  error: SerializedError | null;
}

interface EmailAndPassword {
  email: string;
  password: string;
}

export type UserInfo = Pick<
  User,
  | "displayName"
  | "email"
  | "uid"
  | "photoURL"
  | "emailVerified"
  | "isAnonymous"
  | "phoneNumber"
>;

// # helpers ___________________________________________________________________

export const createUserInfo = (user: User): UserInfo => {
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

// # async thunks ______________________________________________________________

export const logInWithEmailAndPassword = createAsyncThunk<
  UserInfo,
  EmailAndPassword,
  {
    dispatch: AppDispatch;
    state: RootState;
    rejectValue: string;
  }
>(
  "auth/logInWithEmail",
  async ({ email, password }, thunkApi) => {
    const { user: currentUser } = thunkApi.getState().auth;
    const { rejectWithValue } = thunkApi;

    if (currentUser?.email === email.toLowerCase()) {
      return rejectWithValue("User already logged in");
    }

    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const { user } = userCredentials;
      return createUserInfo(user);
    } catch (error) {
      const authError = error as AuthError;
      const { code, name, message, customData, cause, stack } = authError;
      console.log({ code, name, message, customData, cause, stack });

      if (isSelectedAuthErrorCode(code)) {
        return rejectWithValue(errorMessages[code][thunkApi.getState().lang]);
      }

      return rejectWithValue(fallbackErrorMessage[thunkApi.getState().lang]);
    }
  },
  // # canceling before entering the thunk
  {
    condition: (_, { getState }) => {
      const { loadingStatus } = getState().auth;
      if (loadingStatus === "pending") {
        return false;
      }
    },
  }
);

export const registerWithEmailAndPassword = createAsyncThunk<
  UserInfo,
  EmailAndPassword,
  {
    dispatch: AppDispatch;
    state: RootState;
    rejectValue: string;
  }
>(
  `auth/registerWithEmail`,
  async ({ email, password }, thunkApi) => {
    const { rejectWithValue } = thunkApi;

    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { user } = userCredentials;
      return createUserInfo(user);
    } catch (err) {
      console.log({ typeofError: typeof err, error: err });
      const error = err as AuthError;
      const { code /* name, message, customData, cause, stack */ } = error;

      if (isSelectedAuthErrorCode(code)) {
        return rejectWithValue(errorMessages[code][thunkApi.getState().lang]);
      }
      return rejectWithValue(code);
    }
  },
  //# canceling before entering the thunk
  // Todo: Add feature
  // Implement better error message for this case inside the component.
  // Now there is only generic error message.
  {
    condition: (_, { getState }) => {
      const { loadingStatus } = getState().auth;
      if (loadingStatus === "pending") {
        return false;
      }
    },
  }
);

export const logOut = createAsyncThunk("auth/logout", async () => {
  await signOut(auth);
});

//# Auth Slice _________________________________________________________________

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loadingStatus: "unset",
    currentRequestId: undefined,
    error: null,
  } as AuthState,
  reducers: {
    //* Checked ✅
    setUserInfo: (state, action: PayloadAction<UserInfo | null>) => {
      if (state.user === null && action.payload === null) {
        state.loadingStatus = "idle";
        console.log("no user logged in");
        return;
      }

      if (state.user === null && action.payload) {
        console.log("user logged in");
        state.user = action.payload;
        state.loadingStatus = "idle";
      }

      if (
        state.user &&
        action.payload &&
        state.user.uid !== action.payload.uid
      ) {
        console.log(
          "Logged in user has been replaced with another user that logged in"
        );
        state.user = action.payload;
        state.loadingStatus = "idle";
      }

      if (
        state.user &&
        action.payload &&
        state.user.uid === action.payload.uid
      ) {
        console.log("The same user uid. No action");
        state.loadingStatus = "idle";
        return;
      }

      if (state.user && action.payload === null) {
        console.log("user logged out");
        state.user = null;
        state.loadingStatus = "idle";
      }
    },
    // # This reducer is for test purposes only.
    // # All loadingStatus changes are handled by other reducers.
    setLoadingStatus: (
      state,
      action: PayloadAction<AuthState["loadingStatus"]>
    ) => {
      if (state.loadingStatus !== action.payload) {
        state.loadingStatus = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    //# loginWithEmailEndPassword ⬇️
    builder
      .addCase(logInWithEmailAndPassword.pending, (state, action) => {
        if (state.loadingStatus === "idle") {
          state.loadingStatus = "pending";
          state.currentRequestId = action.meta.requestId;
        }
      })
      .addCase(logInWithEmailAndPassword.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (
          state.loadingStatus === "pending" &&
          state.currentRequestId === requestId
        ) {
          state.loadingStatus = "idle";
          state.currentRequestId = undefined;
          state.error = null;
        }
      })
      .addCase(logInWithEmailAndPassword.rejected, (state, action) => {
        const { requestId } = action.meta;

        if (
          state.loadingStatus === "pending" &&
          state.currentRequestId === requestId
        ) {
          state.loadingStatus = "idle";
          state.error = action.error;
        }
      });

    //# Register with email and password ⬇️
    builder
      .addCase(registerWithEmailAndPassword.pending, (state, action) => {
        if (state.loadingStatus === "idle") {
          state.loadingStatus = "pending";
          state.currentRequestId = action.meta.requestId;
        }
      })
      .addCase(registerWithEmailAndPassword.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (
          state.loadingStatus === "pending" &&
          state.currentRequestId === requestId
        ) {
          state.loadingStatus = "idle";
          state.currentRequestId = undefined;
          state.error = null;
        }
      })
      .addCase(registerWithEmailAndPassword.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (
          state.loadingStatus === "pending" &&
          state.currentRequestId === requestId
        ) {
          state.loadingStatus = "idle";
          state.error = action.error;
        }
      });

    //# logOut ⬇️
    builder
      .addCase(logOut.pending, (state, action) => {
        if (state.loadingStatus === "idle") {
          state.loadingStatus = "pending";
          state.currentRequestId = action.meta.requestId;
        }
      })
      .addCase(logOut.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (
          state.loadingStatus === "pending" &&
          state.currentRequestId === requestId
        ) {
          state.loadingStatus = "idle";
          state.currentRequestId = undefined;
          state.user = null;
          state.error = null;
        }
      })
      .addCase(logOut.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (
          state.loadingStatus === "pending" &&
          state.currentRequestId === requestId
        ) {
          state.loadingStatus = "idle";
          state.error = action.error;
        }
      });
  },
});

export const authReducer = authSlice.reducer;
export const { setUserInfo, setLoadingStatus } = authSlice.actions;
