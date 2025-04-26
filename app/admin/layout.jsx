import Sidebar from "@/components/Admin/Sidebar";
import React from "react";

function layout({ children }) {
  return (
    <div className="w-full min-h-screen bg-gray-900 text-white">
      <Sidebar />
      <div className="pl-[20vw] p-6">
        {children}
      </div>
    </div>
  );
}

export default layout;
