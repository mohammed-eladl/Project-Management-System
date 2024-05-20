import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "./modules/SharedModule/components/AuthLayout/AuthLayout";
import NotFound from "./modules/SharedModule/components/NotFound/NotFound";
import Login from "./modules/AuthenticationModule/components/Login/Login";
import ForgetPass from "./modules/AuthenticationModule/components/ForgetPass/ForgetPass";
import ResetPass from "./modules/AuthenticationModule/components/ResetPass/ResetPass";
import Register from "./modules/AuthenticationModule/components/Register/Register";
import VerifyAccount from "./modules/AuthenticationModule/components/Verify Account/VerifyAccount";
import ChangePass from "./modules/AuthenticationModule/components/ChangePass/ChangePass";
import MasterLayout from "./modules/SharedModule/components/MasterLayout/MasterLayout";
import Dashboard from "./modules/DashboardModule/components/Dashboard/Dashboard";
import ProjectsList from "./modules/ProjectsModule/components/ProjectsList/ProjectsList";
import TaskesList from "./modules/TasksModule/components/TaskesList/TaskesList";
import UsersList from "./modules/UsersModule/components/UsersList/UsersList";

import ProtectedRoute from "./modules/SharedModule/components/ProtectedRoute/ProtectedRoute";
// import { useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import ProjectsData from "./modules/ProjectsModule/components/ProjectsData/ProjectsData";
import TaskesData from "./modules/TasksModule/components/TaskesData/TaskesData";
import UsersData from "./modules/UsersModule/components/UsersData/UsersData";
// import AuthContext from "./Context/AuthContext";

function App() {
  // const { saveLoginData, loginData } :any = useContext(AuthContext);

  let [loginData, setLoginData] = useState(null);


    // let baseUrl = "https://upskilling-egypt.com:3003/api/v1";
    const saveLoginData = () => {
      let encodedToken: any = localStorage.getItem("token");
      let decodedToken: any = jwtDecode(encodedToken);
  
      
      setLoginData(decodedToken);
    };
  
    useEffect(() => {
      if (localStorage.getItem("token")) saveLoginData();
    }, []);

  const routers = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login saveLoginData={saveLoginData} /> },
        { path: "login", element: <Login saveLoginData={saveLoginData} /> },
        { path: "register", element: <Register /> },
        { path: "forget-pass", element: <ForgetPass /> },
        { path: "reset-pass", element: <ResetPass /> },
        { path: "change-pass", element: <ChangePass /> },
        { path: "verify-account", element: <VerifyAccount /> },
      ],
    },
    {
      path: "dashboard",

      element: (
        <ProtectedRoute loginData={loginData}>
          <MasterLayout />
        </ProtectedRoute>
      ),

      errorElement: <NotFound />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: "projects", element: <ProjectsList /> },
        { path: "projectdata", element: <ProjectsData /> },
        { path: "tasks", element: <TaskesList /> },
        { path: "taskdata", element: <TaskesData /> },
        { path: "users", element: <UsersList /> },
        { path: "userdata", element: <UsersData /> },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={routers} />
    </>
  );
}

export default App;
