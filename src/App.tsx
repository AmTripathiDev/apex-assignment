import "./App.css";
import SidebarComponent from "./components/sidebar/sidebar";
import { Navigate, Route, Routes } from "react-router-dom";
import { routings } from "./routes/routing";
import { route } from "./model/route.model";

function App() {
  return (
    <div className="screen">
      <SidebarComponent>
        <Routes>
          {routings.map((route: route, index: number) => {
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  route.path === "/" ? (
                    <Navigate to="home" />
                  ) : (
                    <route.element />
                  )
                }
              />
            );
          })}
        </Routes>
      </SidebarComponent>
    </div>
  );
}

export default App;
