let accessToken: string | null = null;

let onTokenRefreshed: ((token: string) => void) | null = null;

export function getAccessToken() {
  return accessToken;
}

export function setAccessToken(token: string | null) {
  accessToken = token;

  if (token && onTokenRefreshed) {
    onTokenRefreshed(token);
  }
}

export function subscribeToTokenRefresh(callback: (token: string) => void) {
  onTokenRefreshed = callback;

  return () => {
    onTokenRefreshed = null;
  };
}
