import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useMemo } from 'react';

import { getUserInfo, setUserInfo } from '../features/auth/authSlice';
import { auth } from '../services/firebase/firebase';
import { useAppDispatch, useAppSelector } from './redux-hooks';

const useAuth = () => {
  const user = useAppSelector((state) => state.auth.user);
  const loadingStatus = useAppSelector((state) => state.auth.loadingStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          dispatch(setUserInfo(getUserInfo(user)));
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
