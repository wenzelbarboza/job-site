import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { State } from "country-state-city";
import { useGetCompaniesQuerry } from "../api/companies.api";
import { Input } from "../components/ui/input";
import MDEditor from "@uiw/react-md-editor";
import { useCreateJobMutation } from "../api/jobs.api";
import AddCompanyDrawer from "../components/AddCompanyDrawer";
import { buttonVariants } from "../components/ui/button";

const creatJobSchema = z.object({
  title: z.string().min(1, "title is required"),
  description: z.string().min(1, "description is required"),
  loaction: z.string().min(1, "location is required"),
  company_id: z.string().min(1, "company is required"),
  requierments: z.string().min(1, "requirements is required"),
});

export const Postjob = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      loaction: "",
      company_id: "",
      requierments: "",
    },
    resolver: zodResolver(creatJobSchema),
  });

  const { data: companiesRes, refetch } = useGetCompaniesQuerry();
  const { mutateAsync, isPending } = useCreateJobMutation();

  console.log("the loaded companies are:", companiesRes);

  const onSubmit = async (data: z.infer<typeof creatJobSchema>) => {
    console.log("job submited data is: ", data);

    try {
      await mutateAsync({
        title: data.title,
        companyId: data.company_id,
        description: data.description,
        location: data.loaction,
        requirements: data.requierments,
      });
      reset();
    } catch (error: any) {
      console.log("jobcreation error:", error);
      alert(error);
    }
  };

  return (
    <>
      <div>
        <h3>post a job</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <Input defaultValue={"title"} {...register("title")} />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
          <Textarea defaultValue={"description"} {...register("description")} />
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
          <div className="flex gap-2 items-center">
            <div className="flex-1">
              <Controller
                name="loaction"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {State.getStatesOfCountry("IN").map(({ name }) => {
                          return (
                            <SelectItem key={name} value={name}>
                              {name}
                            </SelectItem>
                          );
                        })}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="flex-1">
              <Controller
                name="company_id"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    {/* <SelectValue>hehe</SelectValue> */}
                    <SelectTrigger>
                      <SelectValue placeholder="select company" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {companiesRes?.data?.map((company) => (
                          <SelectItem value={String(company.id)}>
                            {company.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <AddCompanyDrawer refetch={() => refetch()} />
          </div>
          <div className="flex gap-4">
            {errors.company_id && (
              <p className="text-red-500">{errors.company_id.message}</p>
            )}
            {errors.loaction && (
              <p className="text-red-500">{errors.loaction.message}</p>
            )}
          </div>
          <Controller
            name="requierments"
            control={control}
            render={({ field }) => (
              <MDEditor value={field.value} onChange={field.onChange} />
            )}
          />
          {errors.requierments && (
            <p className="text-red-500">{errors.requierments.message}</p>
          )}
          <button
            type="submit"
            className={buttonVariants({ variant: "blue" })}
            disabled={isPending}
          >
            submit
          </button>
        </form>
      </div>
    </>
  );
};
