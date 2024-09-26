// enum userRole {
//   CANDIDATE = "CANDIDATE",
//   EMPLOYER = "EMPLOYER",
// }

export type user = {
  id: number;
  name: string;
  role: string | null;
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

export type roleApiType = {
  role: string;
  id: number;
};
// export interface {
//   data: Data;
// }

export interface JobsData {
  job: Job;
  savedJobId: any;
  companyName: string;
  companyLogo: string;
}

export interface Job {
  id: number;
  createdAt: string;
  recruiterId: number;
  title: string;
  companyId: number;
  description: string;
  location: string;
  requirements: string;
  isOpen: boolean;
}
