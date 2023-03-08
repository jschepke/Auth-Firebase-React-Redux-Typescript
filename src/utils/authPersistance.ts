import type { Persistence as FirebasePersistance } from 'firebase/auth';

type Persistance = FirebasePersistance['type'];

export class AuthPersistance {
  keyValue = 'authPersistance';

  getPersistance() {
    return window.sessionStorage.getItem(this.keyValue);
  }

  setPersistance(typeOfPersistance: Persistance = 'LOCAL') {
    if (!this.getPersistance()) {
      window.sessionStorage.setItem(this.keyValue, typeOfPersistance);
    }
    return;
  }
  remove() {
    if (this.getPersistance()) {
      window.sessionStorage.removeItem(this.keyValue);
    }
    return;
  }
}

export const authPersistance = new AuthPersistance();
