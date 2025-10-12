import React, { useEffect } from "react";
import { Outlet } from "react-router";
import { useSelector } from "react-redux";

const Layout = () => {
  const userState = useSelector((state) => state.user);

  console.dir(userState);

  return <Outlet />;
};

export default Layout;
