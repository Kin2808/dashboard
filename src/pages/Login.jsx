import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

function Login() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    handleRegister(data);
    console.log(data);
  };

  const handleRegister = (data) => {
    axios.post("http://localhost:5000/auth/login", data);
  };

  return (
    <div style={{ backgroundColor: "white" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>username</label>
        <input {...register("username")} />
        <label>password</label>
        <input {...register("password")} />
        <button type="submit">submit</button>
      </form>
    </div>
  );
}

export default Login;
