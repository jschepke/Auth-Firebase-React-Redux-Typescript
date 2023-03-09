import {
  browserSessionPersistence,
  onAuthStateChanged,
  setPersistence,
} from 'firebase/auth';
import { useEffect, useMemo } from 'react';

import { getUserInfo, setUserInfo } from '../features/auth/authSlice';
import { auth } from '../services/firebase/firebase';
import { authPersistence } from '../utils/authPersistence';
import { useAppDispatch, useAppSelector } from './redux-hooks';

const useAuth = () => {
  const user = useAppSelector((state) => state.auth.user);
  const loadingStatus = useAppSelector((state) => state.auth.loadingStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      onAuthStateChanged(auth, (user) => {
        const persistence = authPersistence.get();

        if (user && persistence === 'SESSION') {
          setPersistence(auth, browserSessionPersistence)
            .then(() => dispatch(setUserInfo(getUserInfo(user))))
            .catch((error) => console.log(error));

          return;
        }

        if ((user && !persistence) || (user && persistence === 'LOCAL')) {
          dispatch(setUserInfo(getUserInfo(user)));
          return;
        }

        dispatch(setUserInfo(null));
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
