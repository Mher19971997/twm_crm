

/**
  This file is used for controlling the global states of the components,
  you can customize the states for the different components here.
*/

import { createContext, useContext, useReducer, useMemo, useEffect, useState } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";

// The TWA MUI main context
const Argon = createContext(null);

export const AuthContext = createContext({
  isAuthenticated: false,
  login: () => { },
  register: () => { },
  logout: () => { },
});

const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");
  
  useEffect(() => {
    const prefix = localStorage.getItem("prefix");
    if (token && prefix) {
      setIsAuthenticated(true);
      // navigate(location.pathname);
    } else if (prefix) {
      navigate(`/${prefix}/authentication/sign-in`);
    }
  }, []);

  useEffect(() => {
    const prefix = localStorage.getItem("prefix");
    if (token) {
      setIsAuthenticated(true);
      if (location.pathname === `${prefix}/authentication/sign-in` || location.pathname === `/${prefix}` || location.pathname === `/`) {
        navigate(`/${prefix}/dashboard`);
      } else {
        // navigate(location.pathname);
      }
    } else if (prefix) {
      navigate(`/${prefix}/authentication/sign-in`);
    }
  }, [isAuthenticated]);

  const login = (token) => {
    const prefix = localStorage.getItem("prefix");
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
    navigate(`/${prefix}/dashboard`);
  };

  const logout = () => {
    const prefix = localStorage.getItem("prefix");
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate(`/${prefix}/authentication/sign-in`);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Setting custom name for the context which is visible on react dev tools
Argon.displayName = "ArgonContext";

// TWA MUI reducer
function reducer(state, action) {
  switch (action.type) {
    case "MINI_SIDENAV": {
      return { ...state, miniSidenav: action.value };
    }
    case "DARK_SIDENAV": {
      return { ...state, darkSidenav: action.value };
    }
    case "SIDENAV_COLOR": {
      return { ...state, sidenavColor: action.value };
    }
    case "TRANSPARENT_NAVBAR": {
      return { ...state, transparentNavbar: action.value };
    }
    case "FIXED_NAVBAR": {
      return { ...state, fixedNavbar: action.value };
    }
    case "OPEN_CONFIGURATOR": {
      return { ...state, openConfigurator: action.value };
    }
    case "DIRECTION": {
      return { ...state, direction: action.value };
    }
    case "LAYOUT": {
      return { ...state, layout: action.value };
    }
    case "DARK_MODE": {
      return { ...state, darkMode: action.value };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

// TWA MUI context provider
function ArgonControllerProvider({ children }) {
  const initialState = {
    miniSidenav: false,
    darkSidenav: false,
    sidenavColor: null,
    transparentNavbar: true,
    fixedNavbar: false,
    openConfigurator: false,
    direction: "ltr",
    layout: "dashboard",
    darkMode: false,
  };

  const [controller, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => [controller, dispatch], [controller, dispatch]);

  return <Argon.Provider value={value}>{children}</Argon.Provider>;
}

// TWA MUI custom hook for using context
function useArgonController() {
  const context = useContext(Argon);

  if (!context) {
    throw new Error("useArgonController should be used inside the ArgonControllerProvider.");
  }

  return context;
}

// Typechecking props for the ArgonControllerProvider
ArgonControllerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Context module functions
const setMiniSidenav = (dispatch, value) => dispatch({ type: "MINI_SIDENAV", value });
const setDarkSidenav = (dispatch, value) => dispatch({ type: "DARK_SIDENAV", value });
const setSidenavColor = (dispatch, value) => dispatch({ type: "SIDENAV_COLOR", value });
const setTransparentNavbar = (dispatch, value) => dispatch({ type: "TRANSPARENT_NAVBAR", value });
const setFixedNavbar = (dispatch, value) => dispatch({ type: "FIXED_NAVBAR", value });
const setOpenConfigurator = (dispatch, value) => dispatch({ type: "OPEN_CONFIGURATOR", value });
const setDirection = (dispatch, value) => dispatch({ type: "DIRECTION", value });
const setLayout = (dispatch, value) => dispatch({ type: "LAYOUT", value });
const setDarkMode = (dispatch, value) => dispatch({ type: "DARK_MODE", value });

export {
  ArgonControllerProvider,
  useArgonController,
  setMiniSidenav,
  setDarkSidenav,
  setSidenavColor,
  setTransparentNavbar,
  setFixedNavbar,
  setOpenConfigurator,
  setDirection,
  setLayout,
  setDarkMode,
  AuthContextProvider
};
