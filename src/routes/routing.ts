import AddScenerioContainer from "../containers/add-scenerio/add-scenerio.container";
import { AddVehicleContainer } from "../containers/add-vehicle/add-vehicle-container";
import ScenerioDataScreen from "../containers/all-scenerio/all-scenerio-container";
import HomeScreen from "../containers/home-screen/home-screen-container";
import { route } from "../model/route.model";

export const routings: route[] = [
  { name: "Home", path: "/home", breakCrumb: "/home", element: HomeScreen },
  { name: "Home", path: "/", breakCrumb: "/home", element: HomeScreen },
  {
    name: "Add Scenerio",
    path: "/add/scenerio",
    breakCrumb: "/add/scenerio",
    element: AddScenerioContainer,
  },
  {
    name: "Edit Scenerio",
    path: "/edit/scenerio/:id",
    breakCrumb: "/edit/scenerio",
    element: AddScenerioContainer,
  },
  {
    name: "All Scenerio",
    path: "/all/scenerio",
    breakCrumb: "/all/scenerio",
    element: ScenerioDataScreen,
  },
  {
    name: "Add Vechicle",
    path: "/add/vehicle",
    breakCrumb: "add/vechile",
    element: AddVehicleContainer,
  },
  {
    name: "Add Vechicle",
    path: "/add/vehicle/:scenerioId",
    breakCrumb: "add/vechile",
    element: AddVehicleContainer,
  },
  {
    name: "Edit Vechicle",
    path: "/edit/vehicle/:vehicleId/:scenerioId",
    breakCrumb: "add/vechile",
    element: AddVehicleContainer,
  },
];
