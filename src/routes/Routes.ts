import { RouteObject, useRoutes } from "react-router-dom";
import { RouteType, UserRoles } from "../data/app.constant";
import { AuthService } from "../services/auth.service";
import AuthenticateRoute from "./AuthenticateRoute";
import LazyLoadRoutes from "./LazyLoadRoutes";

export function RouterElement() {
  const authSvc = new AuthService();

  const routes: RouteObject[] = [
    {
      path: "/",
      element: authSvc.canActivateRoute(RouteType.PUBLIC) ? LazyLoadRoutes("Auth", "Login") : AuthenticateRoute("/dashboard"),
    },
    {
      path: "login",
      element: authSvc.canActivateRoute(RouteType.PUBLIC) ? LazyLoadRoutes("Auth", "Login") : AuthenticateRoute("/dashboard"),
    },
    {
      path: "register",
      element: authSvc.canActivateRoute(RouteType.PUBLIC) ? LazyLoadRoutes("Auth", "Register") : AuthenticateRoute("/dashboard"),
    },
    {
      path: "dashboard",
      element: authSvc.canActivateRoute(RouteType.PRIVATE) ? LazyLoadRoutes("Dashboard", "Dashboard") : AuthenticateRoute("/login"),
    },
    {
      path: "customers",
      element: authSvc.canActivateRoute(RouteType.PRIVATE, [UserRoles.ADMIN])
        ? LazyLoadRoutes("Customer", "Customers")
        : AuthenticateRoute("/login"),
    },
    {
      path: "customers/:id",
      element: authSvc.canActivateRoute(RouteType.PRIVATE, [UserRoles.ADMIN])
        ? LazyLoadRoutes("Customer", "CustomerDetails")
        : AuthenticateRoute("/login"),
    },
    {
      path: "drivers",
      element: authSvc.canActivateRoute(RouteType.PRIVATE, [UserRoles.ADMIN])
        ? LazyLoadRoutes("Driver", "Drivers")
        : AuthenticateRoute("/login"),
    },
    {
      path: "drivers/:id",
      element: authSvc.canActivateRoute(RouteType.PRIVATE, [UserRoles.ADMIN])
        ? LazyLoadRoutes("Driver", "DriverDetails")
        : AuthenticateRoute("/login"),
    },
    {
      path: "drivers/new",
      element: authSvc.canActivateRoute(RouteType.PRIVATE, [UserRoles.ADMIN])
        ? LazyLoadRoutes("Driver", "AddEditDriver")
        : AuthenticateRoute("/login"),
    },
    {
      path: "drivers/:id/edit",
      element: authSvc.canActivateRoute(RouteType.PRIVATE, [UserRoles.ADMIN])
        ? LazyLoadRoutes("Driver", "AddEditDriver")
        : AuthenticateRoute("/login"),
    },
    {
      path: "vehicle-types",
      element: authSvc.canActivateRoute(RouteType.PRIVATE, [UserRoles.ADMIN])
        ? LazyLoadRoutes("VehicleType", "VehicleTypes")
        : AuthenticateRoute("/login"),
    },
    {
      path: "vehicles",
      element: authSvc.canActivateRoute(RouteType.PRIVATE, [UserRoles.ADMIN])
        ? LazyLoadRoutes("Vehicle", "Vehicles")
        : AuthenticateRoute("/login"),
    },
    {
      path: "vehicles/new",
      element: authSvc.canActivateRoute(RouteType.PRIVATE, [UserRoles.ADMIN])
        ? LazyLoadRoutes("Vehicle", "AddVehicle")
        : AuthenticateRoute("/login"),
    },
    {
      path: "vehicles/:id/edit",
      element: authSvc.canActivateRoute(RouteType.PRIVATE, [UserRoles.ADMIN])
        ? LazyLoadRoutes("Vehicle", "EditVehicle")
        : AuthenticateRoute("/login"),
    },
  ];

  const routing = useRoutes(routes);

  return routing;
}
