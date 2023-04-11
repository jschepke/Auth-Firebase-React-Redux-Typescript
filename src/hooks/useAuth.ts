import {
  browserSessionPersistence,
  getRedirectResult,
  onAuthStateChanged,
  setPersistence,
} from 'firebase/auth';
import { useEffect, useMemo } from 'react';

import {
  addToUsersCollection,
  getUserInfo,
  setUser,
} from '../features/auth/authSlice';
import { auth } from '../services/firebase/firebase';
import { authPersistence } from '../utils/authPersistence';
import { consoleLogger } from '../utils/consoleLogger';
import { getCurrentViteMode } from '../utils/getCurrentViteMode';
import { useAppDispatch, useAppSelector } from './redux-hooks';

const useAuth = () => {
  const user = useAppSelector((state) => state.auth.user);
  const loadingStatus = useAppSelector((state) => state.auth.loadingStatus);
  const dispatch = useAppDispatch();

  const log = consoleLogger(getCurrentViteMode(), 'useAuth.ts');

  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      onAuthStateChanged(auth, (user) => {
        if (!user) {
          dispatch(setUser(null));
          return;
        }
        getRedirectResult(auth)
          .then((result) => {
            if (result) {
              log.info(`${getRedirectResult.name} => result:`, result);
              addToUsersCollection(result.user.uid).catch((error) =>
                log.error(error)
              );
            }
          })
          .catch((error) => log.error(error));

        const persistence = authPersistence.get();

        if (user && persistence === 'SESSION') {
          setPersistence(auth, browserSessionPersistence)
            .then(() => dispatch(setUser(getUserInfo(user))))
            .catch((error) => log.error(error));

          return;
        }

        if ((user && !persistence) || (user && persistence === 'LOCAL')) {
          dispatch(setUser(getUserInfo(user)));
          return;
        }
      });
    }

    // clean-up
    return () => {
      ignore = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return useMemo(() => ({ user, loadingStatus }), [user, loadingStatus]);
};

export default useAuth;
