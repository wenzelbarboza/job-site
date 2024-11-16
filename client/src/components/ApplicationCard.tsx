import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Briefcase, Download } from "lucide-react";
import { FaTools } from "react-icons/fa";
import { FaBuildingColumns } from "react-icons/fa6";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";
import { useUpdateApplicationStatusMutation } from "../api/applications.api.ts";

type Props = {
  id: number;
  candidateId: number;
  name: string | null;
  resume: string;
  skills: string;
  status: "applying" | "interviewing" | "hired" | "rejected";
  education: string;
  experience: number;
  createdAt: Date | null;
  isCandidate: boolean;
  // new
  companyName: string;
  jobTitle: string;
  refetchApplications: () => void;
};

const ApplicationCard = ({
  id,
  isCandidate,
  createdAt,
  education,
  experience,
  name,
  resume,
  skills,
  status,
  jobTitle,
  companyName,
  refetchApplications,
}: Props) => {
  // return <div>{JSON.stringify(data)}</div>;

  const updateStatusMutation = useUpdateApplicationStatusMutation();

  const handleDownload = () => {
    console.log("handling download");
    const link = document.createElement("a");
    link.href = resume;
    link.target = "_blank";
    link.click();
  };

  const handleStatusChange = async (status: string) => {
    console.log("job status is: ", status);
    await updateStatusMutation.mutateAsync({ status, applicationId: id });
    refetchApplications();
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between font-bold">
            <span>{isCandidate ? `${jobTitle} at ${companyName}` : name}</span>
            <Download onClick={handleDownload} />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between mb-4 ">
            <div className="flex items-center gap-2">
              <Briefcase size={15} />
              {experience} years of experience
            </div>
            <div className="flex items-center gap-2">
              <FaBuildingColumns size={15} />
              {education}
            </div>
            <div className="flex items-center gap-2">
              <FaTools size={15} />
              Skills: {skills}
            </div>
          </div>
          <hr />
        </CardContent>
        <CardFooter className="flex justify-between">
          <span className="">
            {new Date(createdAt as Date).toLocaleString()}
          </span>
          {isCandidate ? (
            <span>status: {status}</span>
          ) : (
            <div>
              <Select
                onValueChange={handleStatusChange}
                defaultValue={status}
                disabled={updateStatusMutation.isPending}
              >
                <SelectTrigger>status: {status}</SelectTrigger>
                <SelectContent>
                  <SelectItem value="applied">applied</SelectItem>
                  <SelectItem value="interviewing">interviewing</SelectItem>
                  <SelectItem value="hired">hired</SelectItem>
                  <SelectItem value="rejected">rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </CardFooter>
      </Card>
    </>
  );
};

export default ApplicationCard;
