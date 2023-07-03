const JWT_TOKEN_KEY = "jwtToken";

export function getJwtToken(): string | null {
  return localStorage.getItem(JWT_TOKEN_KEY);
}

export function login(jwtToken: string) {
  return localStorage.setItem(JWT_TOKEN_KEY, jwtToken);
}
