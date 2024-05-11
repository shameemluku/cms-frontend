import React, { useState } from "react";
import { login } from "../api/user";
import { useRecoilState } from "recoil";
import { userState } from "../recoil/atom/user";

interface LoginData {
  username: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [_, setUser] = useRecoilState(userState);
  const [loginData, setLoginData] = useState<LoginData>({
    username: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof LoginData
  ) => {
    setLoginData({
      ...loginData,
      [field]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you can implement your login logic, for example, sending the loginData to a server
    console.log("Submitted data:", loginData);
    try {
      let { data } = await login({
        email: loginData?.username,
        password: loginData?.password,
      });
      setUser(data?.data);
    } catch (error) {}
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={loginData.username}
            onChange={(e) => handleChange(e, "username")}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={loginData.password}
            onChange={(e) => handleChange(e, "password")}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
