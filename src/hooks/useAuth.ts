import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "./redux-hooks";
import { auth } from "../services/firebase/firebase";
import { createUserInfo, setUserInfo } from "../features/auth/authSlice";

const useAuth = () => {
  const user = useAppSelector((state) => state.auth.user);
  const loadingStatus = useAppSelector((state) => state.auth.loadingStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          dispatch(setUserInfo(createUserInfo(user)));
        } else {
          dispatch(setUserInfo(null));
        }
      });
    }

    // clean-up
    return () => {
      ignore = true;
    };
  }, [dispatch]);

  return useMemo(() => ({ user, loadingStatus }), [user, loadingStatus]);
};

export default useAuth;
