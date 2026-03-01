export function generateLocalToken(username: string) {
  const payload = {
    username,
    exp: Date.now() + 1000 * 60 * 60 // expire dans 1h
  };

  return btoa(JSON.stringify(payload));
}

export function verifyLocalToken(token: string) {
  try {
    const decoded = JSON.parse(atob(token));
    if (decoded.exp < Date.now()) return null;
    return decoded;
  } catch {
    return null;
  }
}