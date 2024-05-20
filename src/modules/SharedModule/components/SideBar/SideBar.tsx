import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const navigate = useNavigate();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Log Out

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <div className="sidebar-container vh-100">
        <Sidebar collapsed={isCollapsed}>
          <Menu className="ulll">
            <MenuItem
              onClick={toggleCollapse}
              icon={
                isCollapsed ? (
                  <i className="fa-solid fa-chevron-right"></i>
                ) : (
                  <i className="fa-solid fa-chevron-left"></i>
                )
              }
            ></MenuItem>
            <br />

            <MenuItem
              icon={<i className="fa fa-home" aria-hidden="true"></i>}
              component={<Link to="/dashboard" />}
             
            >
              Home
            </MenuItem>

            <MenuItem
              icon={<i className="fa fa-users" aria-hidden="true"></i>}
              component={<Link to="/dashboard/users" />}
            >
              Users
            </MenuItem>

            <MenuItem
              icon={
                <i
                  className="fa-solid fa-diagram-project"
                  aria-hidden="true"
                ></i>
              }
              component={<Link to="/dashboard/projects" />}
            >
              Projects
            </MenuItem>

            <MenuItem
              icon={<i className="fas fa-tasks" aria-hidden="true"></i>}
              component={<Link to="/dashboard/tasks" />}
            >
              Tasks
            </MenuItem>

            <MenuItem icon={<i className="fa fa-key" aria-hidden="true"></i>}>
              Change Password
            </MenuItem>
            <MenuItem
              onClick={logout}
              icon={
                <i className="fa fa-right-from-bracket" aria-hidden="true"></i>
              }
            >
              Logout
            </MenuItem>
          </Menu>
        </Sidebar>

        {/* <button onClick={logout} className="btn btn-danger">
         Logout
       </button> */}
      </div>
    </>
  );
};

export default SideBar;
