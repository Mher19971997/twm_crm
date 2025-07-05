// TWA MUI layouts
import Dashboard from "layouts/dashboard";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";

// Smart  Contract MUI components
import ArgonBox from "components/ArgonBox";
import Individual from "layouts/garages";
import Organizations from "layouts/organizations";
import IGarage from "assets/icons/IGarage";
import IOrganization from "assets/icons/IOrganization";
import IDashboard from "assets/icons/IDashboard";
import IUser from "assets/icons/IUser";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Invated from "layouts/invited";

const getRoutes = (prefix, t) => {
  return [
    {
      type: "route",
      name: 'dashboard',
      key: "dashboard",
      route: "/dashboard",
      icon: <IDashboard component="i" color="primary" fontSize="14px" className="ni ni-tv-2" />,
      component: <Dashboard />,
    },
    // {
    //   type: "route",
    //   name: "contracts",
    //   key: "contracts",
    //   route: "/contracts",
    //   icon: (
    //     <IContract component="i" color="warning" fontSize="14px" className="ni ni-calendar-grid-58" />
    //   ),
    //   component: <Contracts />,
    // },
    {
      type: "route",
      name: "organizations",
      key: "organizations",
      route: "/organizations",
      icon: <IOrganization />,
      component: <Organizations />,
    },
    {
      type: "route",
      name: "individuals",
      key: "individuals",
      route: "/individuals",
      icon: <IGarage />,
      component: <Individual />,
    },
    {
      type: "route",
      name: "invated",
      key: "invated",
      route: "/invated",
      icon: <IGarage />,
      component: <Invated />,
    },
    {
      type: "route",
      name: "profile",
      key: "profile",
      route: "/profile",
      icon: <IUser component="i" color="dark" fontSize="14px" className="ni ni-single-02" />,
      component: <Profile />,
    },
    {
      type: "",
      name: "Sign In",
      key: "sign-in",
      route: "/authentication/sign-in",
      icon: (
        <ArgonBox component="i" color="warning" fontSize="14px" className="ni ni-single-copy-04" />
      ),
      component: <SignIn />,
    },
  ];
};

const RoutesWrapper = () => {
  const { t } = useTranslation('sidebar')
  const [routes, setRoutes] = useState(() => getRoutes(localStorage.getItem("prefix")), t);
  useEffect(() => {
    const handleStorageChange = () => {
      setRoutes(getRoutes(localStorage.getItem("prefix")));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  console.log(routes, "routesroutes");
  return routes;
};

export default RoutesWrapper;