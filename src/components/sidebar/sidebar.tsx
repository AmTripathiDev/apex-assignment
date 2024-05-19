import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./sidebar.css";
import { routings } from "../../routes/routing";

interface props {
  children?: any;
}
const SidebarComponent = ({ children }: props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const routesWithoutParams = routings.filter(
    (route) => !route.path.includes(":") && route.path !== "/"
  );

  return (
    <>
      <div className="sidebar">
        {routesWithoutParams.map((route) => (
          <div
            key={route.path}
            className={`sidebar-options${
              location.pathname.includes(route.path) ? " active" : ""
            }`}
            onClick={() => navigate(route.path)}
          >
            {route.name}
          </div>
        ))}
      </div>
      <div className="content">{children}</div>
    </>
  );
};

export default SidebarComponent;
