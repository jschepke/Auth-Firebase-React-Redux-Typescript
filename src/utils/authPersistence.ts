import type { Persistence as FirebasePersistence } from 'firebase/auth';

type Persistence = FirebasePersistence['type'];

class AuthPersistence {
  readonly keyValue = 'authPersistence';

  get(): Persistence | null {
    const data = window.sessionStorage.getItem(this.keyValue) as Persistence;

    if (data === 'LOCAL' || data === 'SESSION' || data === 'NONE') return data;

    return null;
  }

  /**
   *
   * @param typeOfPersistence - default to "SESSION"
   */
  set(typeOfPersistence: Persistence = 'SESSION') {
    if (!this.get() || this.get() !== typeOfPersistence) {
      window.sessionStorage.setItem(this.keyValue, typeOfPersistence);
    }
  }
  // If there is no item associated with the given key, this method will do nothing.
  remove() {
    window.sessionStorage.removeItem(this.keyValue);
  }
}

/**
 * Instance of a class implementation for session storage of preferred authentication persistence.
 *
 * Stores preferred type of authentication persistence in session storage,
 * easily accessible after sign-in with redirect causing page refresh.
 */
export const authPersistence = new AuthPersistence();
