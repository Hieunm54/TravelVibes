import { useSelector } from "react-redux";
import AdminLogIn from "../components/AdminLogIn";
import AdminEventList from "../components/AdminEventList";

const Admin = () => {
  const adminToken = localStorage.getItem("adminToken");

  return <>{!adminToken ? <AdminLogIn /> : <AdminEventList />}</>;
};

export default Admin;
