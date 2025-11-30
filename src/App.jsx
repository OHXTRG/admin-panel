import Routes from "./routes/Index";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { refresh } from "./features/user.slice";
import { Backdrop, CircularProgress } from "@mui/material";
import { getAllExerciseAPI } from "./features/exercise.slice";
import "./App.css";

function App() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [refreshing, setrefreshing] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (!user?.isAuthenticated && token) {
      // console.log("user is login ")
      dispatch(getAllExerciseAPI(token));
      dispatch(refresh({ token, user: user ? JSON.parse(user) : {} }));
    } else {
      setrefreshing(false);
    }
  }, []);

  useEffect(() => {
    if (user.isAuthenticated) {
      setrefreshing(false);
    }
  }, [user]);

  return refreshing ? (
    <Backdrop
      sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
      open={true}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  ) : (
    <Routes />
  );
}

export default App;
