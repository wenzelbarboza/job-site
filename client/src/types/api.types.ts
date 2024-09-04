export type user = {
  name: "string";
};

export type signUpType = {
  name: string;
  email: string;
  password: string;
};

export type loginType = {
  email: string;
  password: string;
};

export type apiResponeType<T = unknown> = {
  success: true;
  message: "Registration successfull";
  data?: T;
};
