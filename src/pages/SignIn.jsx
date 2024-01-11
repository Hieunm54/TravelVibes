import { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "../components/Button";
import { toast } from "react-toastify";
import axios from "axios";
import { saveLogInInfo } from "../store/actions/auth";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import { CONST } from "../constaints";
import logo from "../assets/logo.png";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${CONST.API_URL}/api/auth/login`, {
        email,
        password,
      });

      const { token, user } = response.data;
      dispatch(saveLogInInfo(token, user));
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/");
      // window.location = "/";
    } catch (e) {
      toast.error("Your email or password is incorrect.");
    }
  };

  return (
    <main className="h-screen grid grid-cols-2">
      <div className="bg-hanoi bg-cover bg-center bg-no-repeat w-full h-screen relative">
        <div className="h-screen w-1/2 absolute top-0 right-0 bg-gradient-to-l from-white to-transparent"></div>
      </div>
      <div className="flex flex-col justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-1/2 mx-auto flex flex-col space-y-5"
        >
          <h1 className="font-bold text-5xl mb-7 font-['Lemon']">
            <span className="text-blue-800">Travel</span>
            <span className="text-blue-500">Vibes</span>
          </h1>
          {/* <img src={logo} /> */}
          <FormInput
            name="Email"
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <FormInput
            name="Password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <div className="flex flex-col space-y-2">
            <Button>Sign In</Button>
            <p className="text-center flex space-x-1 items-center justify-center">
              <span>Join today!</span>
              <Link
                to="/sign-up"
                className="underline text-blue-500 hover:text-blue-700"
              >
                Create an account
              </Link>
            </p>
          </div>
        </form>
      </div>
    </main>
  );
};

export default SignIn;
