

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Icon from "@mui/material/Icon";

// TWA MUI components
import ArgonBox from "components/ArgonBox";

// Custom styles for the sidenavItem
import { item, itemIcon, itemText, itemIconBox } from "examples/Sidenav/styles/sidenavItem";

// TWA MUI context
import { useArgonController } from "context";
import ArgonAvatar from "components/ArgonAvatar";
import { useQuery } from "react-query";
import { getProfile } from "http/authApi";
import { useContext } from "react";
import { AuthContext } from "context";
import team1 from "assets/images/team-1.jpg";
import { useTranslation } from "react-i18next";

function SidenavItem({ icon, name, active, open, ...rest }) {
  const { t } = useTranslation('sidebar')

  const authContext = useContext(AuthContext);

  const [controller] = useArgonController();
  const { miniSidenav, darkSidenav, sidenavColor } = controller;

  const { isLoading, data: profile } = useQuery(["profile"], () =>
    getProfile()
  );

  return (
    <>
      <ListItem component="li">
        <ArgonBox
          {...rest}
          sx={(theme) => item(theme, { active, darkSidenav, sidenavColor, miniSidenav })}
        >
          <ListItemIcon sx={(theme) => itemIconBox(theme, { active, darkSidenav, sidenavColor })}>
            {typeof icon === "string" ? (
              <Icon sx={(theme) => itemIcon(theme, { active })}>{icon}</Icon>
            ) : name === t('profile') ?
              <ArgonAvatar
                src={!profile?.data?.logo ? team1 : process.env.REACT_APP_BACKEND_API_URL + profile?.data?.logo}
                alt="profile-image"
                variant="circle"
                size="sm"
                shadow="sm"
              /> : (
                icon
              )}
          </ListItemIcon>

          <ListItemText
            primary={name}
            sx={(theme) => itemText(theme, { miniSidenav, darkSidenav, active })}
          />
        </ArgonBox>
      </ListItem>
    </>
  );
}

// Setting default values for the props of SidenavItem
SidenavItem.defaultProps = {
  color: "info",
  active: false,
  open: false,
};

// Typechecking props for the SidenavItem
SidenavItem.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  icon: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  active: PropTypes.bool,
  open: PropTypes.bool,
};

export default SidenavItem;
