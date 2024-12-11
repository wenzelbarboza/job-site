import { z } from "zod";
import { Button } from "./ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateCompanyMutate } from "../api/companies.api";
import { useState } from "react";

const schema = z.object({
  name: z.string().min(1, "required"),
  logo: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, {
      message: "Please select an image file",
    })
    .refine(
      (files) => {
        const file = files[0];
        return ["image/jpeg", "image/png", "image/gif"].includes(file.type);
      },
      {
        message: "Only JPG, PNG, and GIF images are allowed",
      }
    )
    .refine(
      (files) => {
        const file = files[0];
        return file.size <= 5 * 1024 * 1024; // 5MB size limit
      },
      {
        message: "File size should be less than 5MB",
      }
    ),
});

type formData = z.infer<typeof schema>;
type props = {
  refetch: () => void;
};

const AddCompanyDrawer = ({ refetch }: props) => {
  const [isOpen, setisOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<formData>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync } = useCreateCompanyMutate();
  // <Controller
  //         name="image"
  //         control={control}
  //         render={({ field }) => (
  //           <input
  //             type="file"
  //             accept="image/*"
  //             {...field}
  //           />
  //         )}
  //       />

  const onSubmit = async (data: formData) => {
    alert("add clicked");
    console.log("create company data: ", data);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("logo", data.logo[0]);
    try {
      await mutateAsync({ formdata: formData });
      refetch();
      setisOpen(false);
      reset();
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <>
      <Drawer open={isOpen} onOpenChange={setisOpen}>
        <DrawerTrigger>
          <Button type="button" size={"sm"} variant={"secondary"}>
            Add Company
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Add a Company</DrawerTitle>
            <form className="flex gap-2 p-4 pb-0">
              <Input placeholder="Company name" {...register("name")} />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
              <Input
                type="file"
                accept="image/*"
                {...register("logo")}
                className="cursor-pointer file:text-gray-500"
              />
              {errors.logo && (
                <p className="text-red-500">{errors.logo.message}</p>
              )}
              <Button
                type="button"
                onClick={handleSubmit(onSubmit)}
                variant={"default"}
                className="w-40"
              >
                Add
              </Button>
            </form>
          </DrawerHeader>
          <DrawerFooter>
            {/* <Button>Submit</Button> */}
            <DrawerClose className="w-full px-4">
              <Button variant="destructive" className="w-full">
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default AddCompanyDrawer;
