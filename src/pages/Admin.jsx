import AdminLogIn from "../components/Admin/AdminLogIn";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { appRoutes } from "../enum/routes";

const Admin = () => {
  const adminToken = localStorage.getItem("adminToken");
  const navigate = useNavigate();

  useEffect(() => {
    if (!adminToken) {
      return;
    }
    navigate(appRoutes.ADMIN_EVENTS);
  }, [adminToken, navigate]);

  return <AdminLogIn />;
};

export default Admin;
