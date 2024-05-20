import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import SideBar from "../SideBar/SideBar";

const MasterLayout = () => {
  return (
    <>
      <NavBar />
      <div className="d-flex">
        <div className="">
          <SideBar />
        </div>
        <div className="w-100">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MasterLayout;
