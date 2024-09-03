import React, { useState } from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

export const SignUp = () => {
  const regex = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSignUp = async () => {
    let flag = false;
    if (!regex.test(formData.email)) {
      flag = true;
      setFormError((prev) => ({ ...prev, email: "Invalid Email" }));
    }
    if (formData.name.length == 0) {
      flag = true;
      setFormError((prev) => ({ ...prev, name: "Name cannot be empty" }));
    }
    if (formData.password.length < 8) {
      flag = true;
      setFormError((prev) => ({ ...prev, password: "Minimum 8 charachers" }));
    }
    if (flag) return;
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formError.email.length != 0 && regex.test(formData.email)) {
      setFormError((prev) => ({ ...prev, email: "" }));
    }
    if (formData.name.length !== 0) {
      setFormError((prev) => ({ ...prev, name: "" }));
    }
    if (formData.password.length >= 8) {
      setFormError((prev) => ({ ...prev, password: "" }));
    }

    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <>
      <div className=" flex-1 flex-col flex justify-center items-center">
        <Card className="sm:w-80">
          <CardHeader>
            <CardTitle>Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    name="name"
                    placeholder="Enter your name"
                    type="text"
                    onChange={handleFormChange}
                  />
                  {formError.name.length != 0 ? (
                    <p className="text-xs text-red-500">{formError.name}</p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Email</Label>
                  <Input
                    name="email"
                    placeholder="Enter your email"
                    onChange={handleFormChange}
                  />
                  {formError.email.length != 0 ? (
                    <p className="text-xs text-red-500">{formError.email}</p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Password</Label>
                  <Input
                    name="password"
                    placeholder="Enter your password"
                    type="password"
                    onChange={handleFormChange}
                  />
                  {formError.password.length != 0 ? (
                    <p className="text-xs text-red-500">{formError.password}</p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between ">
            <Button className="w-full" onClick={handleSignUp}>
              Login
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};
