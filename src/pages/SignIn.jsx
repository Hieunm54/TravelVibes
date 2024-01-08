import { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "../components/Button";
import { toast } from "react-toastify";
import axios from "axios";
import { saveLogInInfo } from "../store/actions/auth";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import { CONST } from "../constaints";

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
    <main className="h-screen flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="w-1/5 mx-auto flex flex-col space-y-5"
      >
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
        <Button>Sign In</Button>
      </form>
    </main>
  );
};

export default SignIn;
