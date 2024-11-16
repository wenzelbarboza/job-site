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

export type company = {
  id: number;
  name: string;
  createdAt: Date | null;
  logoUrl: string;
};

export type Application = {
  id: number;
  createdAt: Date | null;
  jobId: number;
  status: "applying" | "interviewing" | "hired" | "rejected";
  candidateId: number;
  resume: string;
  skills: string;
  experience: number;
  education: string;
};

export type JobData = {
  jobs: {
    id: number;
    createdAt: Date | null;
    recruiterId: number;
    title: string;
    companyId: number;
    description: string;
    location: string;
    requirements: string;
    isOpen: boolean;
  };
  companies: company | null;
  application: Application | null;
};

export type JobApplicationsType = {
  id: number;
  candidateId: number;
  name: string | null;
  resume: string;
  skills: string;
  status: "applying" | "interviewing" | "hired" | "rejected";
  education: string;
  experience: number;
  createdAt: Date | null;
}[];

// export type applyToJobType = {
//   experience: number;
//   skills: string;
//   // education: "Intermediate" | "Graduate" | "Post Graduate";
//   education: string;
//   jobId: number;
//   resume: File;
// };
