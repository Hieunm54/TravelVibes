import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { appRoutes } from "../enum/routes";

import Layout from "../components/Layout";

const Home = () => {
  const auth = useSelector((state) => state.auth);

  return <Layout></Layout>;
};

export default Home;
