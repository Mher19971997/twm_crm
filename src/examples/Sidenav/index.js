

import { useEffect } from "react";

// react-router-dom components
import { useLocation, NavLink } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";

// TWA MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// TWA MUI example components
import SidenavItem from "examples/Sidenav/SidenavItem";
import SidenavFooter from "examples/Sidenav/SidenavFooter";

// Custom styles for the Sidenav
import SidenavRoot from "examples/Sidenav/SidenavRoot";
import sidenavLogoLabel from "examples/Sidenav/styles/sidenav";

// TWA MUI context
import { useArgonController, setMiniSidenav } from "context";
import { setDarkSidenav } from "context";
import { setDarkMode } from "context";
import { useTranslation } from "react-i18next";
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarDesktopMenu,
  navbarMobileMenu,
} from "examples/Navbars/DashboardNavbar/styles";
function Sidenav({ color, brand, brandName, routes, ...rest }) {
  const { t } = useTranslation('sidebar')
  const [controller, dispatch] = useArgonController();
  const { miniSidenav, darkSidenav, layout, darkMode } = controller;
  const location = useLocation();
  const { pathname } = location;
  const itemName = pathname.split("/").slice(1)[1];
  const profileRoutes = routes.find(item => item.name === 'Profile')
  console.log(profileRoutes, "profileRoutesprofileRoutes");
  const closeSidenav = () => setMiniSidenav(dispatch, true);
  console.log(darkMode, "darkModedarkModedarkMode");
  const handleDarkMode = () => {
    setDarkSidenav(dispatch, !darkMode);
    setDarkMode(dispatch, !darkMode);
  };
  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  // useEffect(() => {
  //   // A function that sets the mini state of the sidenav.
  //   function handleMiniSidenav() {
  //     setMiniSidenav(dispatch, window.innerWidth < 1200);
  //   }

  //   /** 
  //    The event listener that's calling the handleMiniSidenav function when resizing the window.
  //   */
  //   window.addEventListener("resize", handleMiniSidenav);

  //   // Call the handleMiniSidenav function to set the state with the initial value.
  //   handleMiniSidenav();

  //   // Remove event listener on cleanup
  //   return () => window.removeEventListener("resize", handleMiniSidenav);
  // }, [dispatch, location]);
  const prefix = localStorage.getItem("prefix");

  // Render all the routes from the routes.js (All the visible items on the Sidenav)
  const renderRoutes = routes.map(({ type, name, icon, title, key, href, route }) => {
    let returnValue;
    console.log(name, "namename");
    if (type === "route") {
      if (href) {
        returnValue = (
          <Link href={`/${prefix}${href}`} key={key} target="_blank" rel="noreferrer">
            <SidenavItem
              name={t(`${name}`)}
              icon={icon}
              active={key === itemName}
              noCollapse={false}
            />
          </Link>
        );
      } else {
        console.log(key, "5646654456", itemName);
        returnValue = (
          <NavLink to={`/${prefix}${route}`} key={key}>
            <SidenavItem name={t(`${name}`)} icon={icon} active={key === itemName} />
          </NavLink>
        );
      }
    } else if (type === "title") {
      returnValue = (
        <ArgonTypography
          key={key}
          color={darkSidenav ? "white" : "dark"}
          display="block"
          variant="caption"
          fontWeight="bold"
          textTransform="uppercase"
          opacity={0.6}
          pl={3}
          mt={2}
          mb={1}
          ml={1}
        >
          {title}
        </ArgonTypography>
      );
    } else if (type === "divider") {
      returnValue = <Divider key={key} light={darkSidenav} />;
    }

    return returnValue;
  });

  return (
    <SidenavRoot {...rest} variant="permanent" ownerState={{ darkSidenav, miniSidenav, layout }}>
      <ArgonBox pt={3} pb={1} px={4} textAlign="center">
        <ArgonBox
          display={{ xs: "block", xl: "none" }}
          position="absolute"
          top={0}
          right={0}
          p={1.625}
          onClick={closeSidenav}
          sx={{ cursor: "pointer" }}
        >
          <ArgonTypography variant="h6" color="secondary">
            <Icon sx={{ fontWeight: "bold" }}>close</Icon>
          </ArgonTypography>
        </ArgonBox>
        <ArgonBox display="flex" alignItems="center" justifyContent="space-between">
          <ArgonBox component={NavLink} to="/" display="flex" alignItems="center">
            {brand && (
              <ArgonBox component="img" src={brand} alt="Argon Logo" width="2rem" mr={0.25} />
            )}
            <Icon fontSize="medium" sx={navbarDesktopMenu} onClick={handleMiniSidenav}>
              {miniSidenav ? "menu_open" : "menu"}
            </Icon>
            <ArgonBox
              width={!brandName && "100%"}
              sx={(theme) => sidenavLogoLabel(theme, { miniSidenav })}
            >
              <ArgonTypography
                component="h6"
                variant="button"
                fontWeight="medium"
                color={darkSidenav ? "white" : "dark"}
              >
                {brandName}
              </ArgonTypography>

            </ArgonBox>
          </ArgonBox>
          {/* <ArgonBox variant="outlined" color={!darkMode ? "dark" : "light"} sx={{ padding: 0, margin: 0, width: "37px", height: '35px', border: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 2 }} >
            {darkMode ? <DarkModeIcon onClick={handleDarkMode} /> : <LightModeIcon onClick={handleDarkMode} />}
          </ArgonBox> */}
          {/* <ModeSwitcher/> */}
        </ArgonBox>
      </ArgonBox>
      <Divider light={darkSidenav} />
      <List>{renderRoutes}</List>
      <ArgonBox pt={1} mt="auto" mb={2} mx={2}>
        <SidenavFooter />
      </ArgonBox>
      {/* <Link href={`/${prefix}${profileRoutes.route}`} >
        <SidenavItem
          name={profileRoutes.name}
          icon={profileRoutes.icon}
          active={profileRoutes.key === itemName}
          noCollapse={false}
        />
      </Link> */}
    </SidenavRoot>
  );
}

// Setting default values for the props of Sidenav
Sidenav.defaultProps = {
  color: "info",
  brand: "",
};

// Typechecking props for the Sidenav
Sidenav.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  brand: PropTypes.string,
  brandName: PropTypes.string.isRequired,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Sidenav;
