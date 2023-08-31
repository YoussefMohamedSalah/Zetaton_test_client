/**
 * * Remove stored token
 * It should remove the Token into the SessionStorage or LocalStorage
 *
 * @returns {void}
 */
export function removeToken() {
  window.localStorage.removeItem("access_token");
  window.sessionStorage.removeItem("access_token");
}

/**
 * * Get the Token if presents.
 *
 * @returns {string | undefined}
 */
export function getToken() {
  return window.localStorage.getItem("access_token") || window.sessionStorage.getItem("access_token");
}

/**
 * * If token is present then it will return true otherwise false.
 * @returns {boolean}
 */
export const isAuthorized = (): boolean => {
  const token = getToken();
  if (!token) return false;
  return true;
}