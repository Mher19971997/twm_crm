

import { useState, useEffect, useCallback } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// TWA MUI example components
import Sidenav from "examples/Sidenav";

// TWA MUI themes
import theme from "assets/theme";
import themeDark from "assets/theme-dark";

// TWA MUI routes
import RoutesWrapper from "routes";

// TWA MUI contexts
import { useArgonController, setMiniSidenav } from "context";

// Images
import brand from "assets/images/logos/contract-agreement.png";
import brandDark from "assets/images/logos/contract-agreement.png";

// Icon Fonts
import "assets/css/nucleo-icons.css";
import "assets/css/nucleo-svg.css";
import { constants } from "common/config/constants";

export default function App() {
  const routes = RoutesWrapper()
  const [controller, dispatch] = useArgonController();
  const { miniSidenav, direction, layout, sidenavColor, darkSidenav, darkMode } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();
  const prefix = localStorage.getItem("prefix");

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };
  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction, prefix]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname, prefix]);

  const getPrefix = useCallback((source) => {
    switch (source) {
      case constants.PREFIX_ADMIN:
        localStorage.setItem('prefix', source)
        return source
      case constants.PREFIX_GARAGE:
        localStorage.setItem('prefix', source)
        return source
      case constants.PREFIX_ORGANIZATION:
        localStorage.setItem('prefix', source)
        return source
      default:
        localStorage.setItem('prefix', 'admin')
        return constants.PREFIX_ADMIN
    }
  }, [localStorage.getItem('prefix')])

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route path={`/${getPrefix(pathname.split('/')[1])}${route.route}`} element={route.component} key={route.key} />;
      }

      return null;
    });

  return <ThemeProvider theme={darkMode ? themeDark : theme}>
    <CssBaseline />
    {layout === "dashboard" && (
      <Sidenav
        color={sidenavColor}
        // brand={darkSidenav || darkMode ? brand : brandDark}
        brandName="TWA"
        routes={routes}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
      />
    )}
    <Routes>
      {getRoutes(routes)}
      <Route path="*" element={<Navigate to={`/${prefix}/dashboard`} />} />
    </Routes>
  </ThemeProvider>
}
