export type payloadType = {
  userId: number;
  name: string;
  role: string | null;
};

export enum role {
  condidate = "candidate",
  recruiter = "recruiter",
}
