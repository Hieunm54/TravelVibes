import { useSelector } from "react-redux";
import AdminLogIn from "../components/AdminLogIn";
import AdminEventList from "./AdminEventList";
import { Outlet, redirect, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Admin = () => {
  const adminToken = localStorage.getItem("adminToken");
  const navigate = useNavigate();

  useEffect(() => {
    if (adminToken) navigate("/admin/events");
  }, []);

  return <AdminLogIn />;
};

export default Admin;
