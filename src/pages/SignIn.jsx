import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "../components/Button";
import { toast } from "react-toastify";
import axios from "axios";
import { saveLogInInfo } from "../store/auth";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";

const API_URL = import.meta.env.VITE_API_URL;

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
      });

      const { token, user } = response.data;
      dispatch(saveLogInInfo(token, user));
      localStorage.setItem("token", token);
      localStorage.setItem("user", user);

      navigate("/");
    } catch (e) {
      toast.error("Your email or password is incorrect.");
    }
  };

  return (
    <main className="h-screen flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="w-1/5 mx-auto flex flex-col space-y-5"
      >
        <FormInput
          name="Email"
          value={email}
          onChange={(evt) => setEmail(evt.target.value)}
        />
        <FormInput
          name="Password"
          value={password}
          onChange={(evt) => setPassword(evt.target.value)}
        />
        <Button>Sign In</Button>
      </form>
    </main>
  );
};

export default SignIn;
