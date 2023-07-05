export type UserUpdate = {
  name: string;
  email: string;
  hobbies: Array<string>;
};

export type User = UserUpdate & {
  _id: string;
};
