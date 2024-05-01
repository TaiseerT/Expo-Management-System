import React, { createContext, useEffect, useState } from "react";
export const LoginContext = createContext();
export function LoginProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState("");
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  // useEffect(() => {
  //   const data = JSON.parse(window.localStorage.getItem("token"));
  //   const role = window.localStorage.getItem("role");
  //   if (data) setIsLoggedIn((prev) => ({ ...prev, ...data }));
  //   if (role) setRole(role);

  // }, []);
  // useEffect(() => {
  //   localStorage.setItem("token", JSON.stringify(isLoggedIn));
  //   localStorage.setItem("role", role);
  // }, [isLoggedIn, role]);
  useEffect(() => {
    const data = window.localStorage.getItem("token");
    const role = window.localStorage.getItem("role");
    const name = window.localStorage.getItem("name");
    if (data) setIsLoggedIn(data);
    if (role) setRole(role);
    if (name) setName(name);
  }, []);
  useEffect(() => {
    localStorage.setItem("token", isLoggedIn);
    localStorage.setItem("role", role);
    localStorage.setItem("name", name);
  }, [isLoggedIn, role, name]);
  return (
    <LoginContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, role, setRole, name, setName }}
    >
      {children}
    </LoginContext.Provider>
  );
}
