import BreadCrump from "@/components/BreadCrump";
import SideNav from "@/components/SideNav";
import React from "react";

export default function AccountLayout({ children }) {
  return (
    <div className="container">
      <BreadCrump />
      <div className="grid grid-cols-12">
        <div className="col-span-2">
          <SideNav />
        </div>
        <div className="col-span-10">{children}</div>
      </div>
    </div>
  );
}
