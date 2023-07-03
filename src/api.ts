import axios from "axios";
import { getJwtToken, login as persistJwt } from "./credentialManager";
import { User } from "./models/user";

axios.interceptors.request.use((config) => {
  const token = getJwtToken();
  if (token !== null) config.headers.set("Authorization", `Bearer ${token}`);

  return config;
});

export async function login(email: string, password: string) {
  const formData = new URLSearchParams();
  formData.append("username", email);
  formData.append("password", password);

  const response = await axios.post(
    "http://localhost:8000/auth/token",
    formData
  );

  const token = response.data.access_token;
  persistJwt(token);
}

export type AccountDetails = {
  email: string;
  name: string;
  hobbies: Array<string>;
  password: string;
};

export async function createAccount(details: AccountDetails) {
  const response = await axios.post(
    "http://localhost:8000/auth/register",
    details
  );
  const profile = response.data;

  await login(details.email, details.password);
  return profile;
}

export async function fetchCurrentUser(): Promise<User> {
  return (await axios.get("http://localhost:8000/api/users/me")).data as User;
}

export async function listUsers(
  page: number,
  perPage: number
): Promise<Array<User>> {
  const response = await axios.get(
    "http://localhost:8000/api/users?" +
      new URLSearchParams({
        page_number: page.toString(),
        per_page: perPage.toString(),
      })
  );

  const users = response.data.items as Array<User>;

  return users;
}
