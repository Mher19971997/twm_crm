 

// react-github-btn
import GitHubButton from "react-github-btn";

// @mui material components
import Divider from "@mui/material/Divider";
import Switch from "@mui/material/Switch";
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";

// @mui icons
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";

// TWA MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonButton from "components/ArgonButton";

// Custom styles for the Configurator
import ConfiguratorRoot from "examples/Configurator/ConfiguratorRoot";

// TWA MUI context
import {
  useArgonController,
  setOpenConfigurator,
  setDarkSidenav,
  setMiniSidenav,
  setFixedNavbar,
  setSidenavColor,
  setDarkMode,
} from "context";

function Configurator() {
  const [controller, dispatch] = useArgonController();
  const { openConfigurator, darkSidenav, miniSidenav, fixedNavbar, sidenavColor, darkMode } =
    controller;
  const sidenavColors = ["primary", "dark", "info", "success", "warning", "error"];

  const handleCloseConfigurator = () => setOpenConfigurator(dispatch, false);
  const handleDarkMode = () => {
    setDarkSidenav(dispatch, !darkMode);
    setDarkMode(dispatch, !darkMode);
  };

  return (
    <ConfiguratorRoot variant="permanent" ownerState={{ openConfigurator }}>
      <ArgonBox
        display="flex"
        justifyContent="space-between"
        alignItems="baseline"
        pt={3}
        pb={0.8}
        px={3}
      >
        <ArgonBox>
          <ArgonTypography variant="h5"> Configurator</ArgonTypography>
          <ArgonTypography variant="body2" color="text">
            See our dashboard options.
          </ArgonTypography>
        </ArgonBox>

        <Icon
          sx={({ typography: { size, fontWeightBold }, palette: { dark, white } }) => ({
            fontSize: `${size.md} !important`,
            fontWeight: `${fontWeightBold} !important`,
            color: darkMode ? white.main : dark.main,
            stroke: darkMode ? white.main : dark.main,
            strokeWidth: "2px",
            cursor: "pointer",
            mt: 2,
          })}
          onClick={handleCloseConfigurator}
        >
          close
        </Icon>
      </ArgonBox>
      <ArgonBox pt={1.25} pb={3} px={3}>
        <Divider />

        <ArgonBox display="flex" justifyContent="space-between" lineHeight={1}>
          <ArgonTypography variant="h6">Light / Dark</ArgonTypography>

          <Switch checked={darkMode} onChange={handleDarkMode} />
        </ArgonBox>

        <ArgonBox mt={3} textAlign="center">
          <ArgonBox display="flex" justifyContent="center">
            <ArgonBox mr={1.5}>
              <ArgonButton
                component={Link}
                href="//twitter.com/intent/tweet?text=Check%20Argon%20Dashboard%202%20PRO%20MUI%20made%20by%20%40CreativeTim%20%23webdesign%20%23dashboard%20%23react%20%mui&url=https%3A%2F%2Fwww.creative-tim.com%2Fproduct%2Fargon-dashboard-material-ui"
                target="_blank"
                rel="noreferrer"
                color="dark"
              >
                <TwitterIcon />
                &nbsp; Tweet
              </ArgonButton>
            </ArgonBox>
            <ArgonButton
              component={Link}
              href="https://www.facebook.com/sharer/sharer.php?u=https://www.creative-tim.com/product/argon-dashboard-material-ui"
              target="_blank"
              rel="noreferrer"
              color="dark"
            >
              <FacebookIcon />
              &nbsp; Share
            </ArgonButton>
          </ArgonBox>
        </ArgonBox>
      </ArgonBox>
    </ConfiguratorRoot>
  );
}

export default Configurator;
