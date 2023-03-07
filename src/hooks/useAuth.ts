import {
  browserSessionPersistence,
  onAuthStateChanged,
  setPersistence,
} from 'firebase/auth';
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
    const sessionPersistance = sessionStorage.getItem('sessionPersistence');

    if (!ignore) {
      onAuthStateChanged(auth, (user) => {
        if (user && sessionPersistance) {
          setPersistence(auth, browserSessionPersistence)
            .then(() => dispatch(setUserInfo(getUserInfo(user))))
            .catch((error) => console.log(error));

          console.log('sessionPersistance set');
          return;
        }
        if (user && !sessionPersistance) {
          dispatch(setUserInfo(getUserInfo(user)));
          console.log('default persistance set');
          return;
        }
        dispatch(setUserInfo(null));
        console.log('User === null');
      });
    }
    /* if (!ignore) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          dispatch(setUserInfo(getUserInfo(user)));
        } else {
          dispatch(setUserInfo(null));
        }
      });
    } */

    // clean-up
    return () => {
      ignore = true;
    };
  }, [dispatch]);

  return useMemo(() => ({ user, loadingStatus }), [user, loadingStatus]);
};

export default useAuth;
