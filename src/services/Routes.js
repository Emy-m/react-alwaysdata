import * as React from "react";
import { useRoutes } from "react-router-dom";
import GuardedRoute from "../components/navigation/GuardedRoute";
import Auth from "./Auth";
import Login from "../components/Auth/Login";
import UserList from "../components/Users/UserList";
import Dashboard from "../components/Dashboard/Dashboard";
import Register from "../components/Auth/Register";

export default function Router() {
  const auth = new Auth();
  return useRoutes([
    {
      path: "/",
      element: (
        <GuardedRoute
          component={Dashboard}
          condition={auth.isLoggedIn()}
          failNavigate="/identificacion"
        />
      ),
      children: [
        {
          path: "/usuarios",
          element: <UserList />,
        },
      ],
    },
    {
      path: "/identificacion",
      element: (
        <GuardedRoute
          component={Login}
          condition={!auth.isLoggedIn()}
          failNavigate="/"
        />
      ),
    },
    {
      path: "/registro",
      element: (
        <GuardedRoute
          component={Register}
          condition={!auth.isLoggedIn()}
          failNavigate="/"
        />
      ),
    },
    { path: "*", element: <div>Nao nao nao manito</div> },
  ]);
}
