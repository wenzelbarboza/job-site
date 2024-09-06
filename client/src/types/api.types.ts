// enum userRole {
//   CANDIDATE = "CANDIDATE",
//   EMPLOYER = "EMPLOYER",
// }

export type user = {
  id: number;
  name: string;
  role: string;
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
