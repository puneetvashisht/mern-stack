import * as React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import Todo from "./components/Todo/Todo";
import ButtonAppBar from "./components/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import Login from "./components/Login/Login";

const selectUser = (state) => {
  return state.userReducer.user;
};

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ButtonAppBar />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="todo" element={<Todo />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

function PrivateRoute() {
  const user = useSelector(selectUser);
  return <div>{user.loggedIn ? <Outlet /> : <Navigate to="/login" />}</div>;
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}
