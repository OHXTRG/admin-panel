import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginApi } from "../../features/user.slice";

const Authenticate = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loginApi({ email: "test@test.com", password: "123" }));
  }, []);

  return <div>this is authenticate page</div>;
};

export default Authenticate;
