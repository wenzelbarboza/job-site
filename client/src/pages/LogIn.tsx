import React, { useState, useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { useLoginMutation } from "../api/user.api";
import { useUserStore } from "../zustand/UserStore";

type props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const LogIn = ({ isOpen, setIsOpen }: props) => {
  const userStore = useUserStore();
  const loginMutation = useLoginMutation();
  const regex = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState({
    email: "",
    password: "",
  });
  const formRef = useRef<HTMLDivElement>(null);

  const handleLogin = async () => {
    console.log("formData: ", formData);
    let flag = false;
    if (!regex.test(formData.email)) {
      flag = true;
      setFormError((prev) => ({ ...prev, email: "Invalid Email" }));
    }
    if (formData.password.length < 8) {
      flag = true;
      setFormError((prev) => ({ ...prev, password: "Minimum 8 charachers" }));
    }
    if (flag) return;
    try {
      const res = await loginMutation.mutateAsync(formData);
      console.log("login response is: ", res);
      alert(JSON.stringify(res));
      userStore.setAccessToken(res.accessToken);
      setIsOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formError.email.length != 0 && regex.test(formData.email)) {
      setFormError((prev) => ({ ...prev, email: "" }));
    }
    if (formData.password.length >= 8) {
      setFormError((prev) => ({ ...prev, password: "" }));
    }

    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // const handleOpenClick = () => {
  //   setIsOpen(true);
  // };

  return (
    <>
      {isOpen && (
        <div className="fixed px-2 sm:p-0 inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-screen z-50">
          <Card
            className=" w-full sm:max-w-[350px] relative top-48 mx-auto border  shadow-lg rounded-md"
            ref={formRef}
          >
            <CardHeader>
              <CardTitle>Login</CardTitle>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
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
                      <p className="text-xs text-red-500">
                        {formError.password}
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex items-center flex-col">
              <Button className="w-full" onClick={handleLogin}>
                Login
              </Button>
              <span className="text-center w-full">
                to create an account
                <Link
                  to={"/signup"}
                  className="underline"
                  onClick={() => setIsOpen(false)}
                >
                  signup
                </Link>
              </span>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
};
