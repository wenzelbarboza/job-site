import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Button } from "./ui/button";
import z from "zod";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useApplyToJobMutation } from "../api/applications.api";

type JobsType =
  | {
      id: number;
      createdAt: Date | null;
      recruiterId: number;
      title: string;
      companyId: number;
      description: string;
      location: string;
      requirements: string;
      isOpen: boolean;
    }
  | undefined;

type PropsType = {
  user?: any;
  job: JobsType;
  applied: boolean;
  refetch: () => void;
  companyName: string;
};

type FormData = {
  experience: number;
  skills: string;
  education: string;
  resume: File;
};

const schema = z.object({
  experience: z
    .number()
    .min(0, { message: "Experience must be at least 0" })
    .int(),
  skills: z.string().min(1, { message: "Skills are required" }),
  education: z.enum(["Intermediate", "Graduate", "Post Graduate"], {
    message: "Education is required",
  }),
  resume: z
    .any()
    .refine(
      (file) =>
        file[0] &&
        (file[0].type === "application/pdf" ||
          file[0].type === "application/msword"),
      { message: "Only PDF or Word documents are allowed" }
    ),
});

const JobDrawer = ({ applied, job, companyName }: PropsType) => {
  const { mutateAsync } = useApplyToJobMutation();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const handleFormSubmit = async (data: FieldValues) => {
    console.log("indside handle form submit: ", data);
    const formdata = new FormData();
    try {
      formdata.append("experience", data?.experience || null);
      formdata.append("education", data?.education || null);
      formdata.append("jobId", String(job?.id));
      formdata.append("skills", data?.skills || null);
      formdata.append("resume", data?.resume[0] || null);

      // console.log("printing the form data in formSubmit: ", formdata);

      // const axiosRes = (
      //   await axios.post(`${applicationUrl}/apply`, formdata, {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     },
      //   })
      // ).data;
      // console.log("axiosRes: ", axiosRes);
      const res = await mutateAsync(formdata);
      console.log("response is: ", res);
    } catch (error: any) {
      console.error(error);
    }
    // reset();
  };

  return (
    <>
      <Drawer open={applied ? false : undefined}>
        <DrawerTrigger asChild>
          <Button
            variant={"blue"}
            disabled={!job?.isOpen || applied}
            size="sm"
            className="self-center"
          >
            apply now
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>
                apply for {job?.title} at {companyName}
              </DrawerTitle>
              <DrawerDescription></DrawerDescription>
            </DrawerHeader>
            <form action="" onSubmit={handleSubmit(handleFormSubmit)}>
              <Input
                type="number"
                placeholder="Years of experience (comma seperated)"
                className="flex-1 "
                {...register("experience", { valueAsNumber: true })}
              />
              {errors.experience ? (
                <span className="text-red-500 h-4">
                  {errors.experience.message}
                </span>
              ) : (
                <div className="h-4"></div>
              )}
              <Input
                type="text"
                placeholder="skills (comma seperated)"
                className="flex-1 "
                {...register("skills")}
              />
              {errors.skills ? (
                <span className="text-red-500 h-4">
                  {errors.skills.message}
                </span>
              ) : (
                <div className="h-4"></div>
              )}
              <Controller
                name="education"
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    onValueChange={field.onChange}
                    {...field}
                    className="mb-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Intermediate" id="intermediate" />
                      <Label htmlFor="intermediate">Intermediate</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Graduate" id="graduate" />
                      <Label htmlFor="graduate">Graduate</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="Post Graduate"
                        id="post-graduate"
                      />
                      <Label htmlFor="post-graduate">Post Graduate</Label>
                    </div>
                  </RadioGroup>
                )}
              />
              <Input
                type="file"
                accept=".pdf, .doc, docx"
                className="mb-4"
                {...register("resume")}
              />
              <Button className="w-full">Submit</Button>
            </form>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default JobDrawer;
