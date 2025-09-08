import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

const DashBoardLayout = () => {
  return (
    <>
      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar */}
        <SideBar />

        {/* Main Content Area */}
        <div className="flex-1 p-6 overflow-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default DashBoardLayout;
