

// @mui material components
import Link from "@mui/material/Link";

// TWA MUI components
import ArgonButton from "components/ArgonButton";
import ArgonBox from "components/ArgonBox";

// TWA MUI context
import { useArgonController } from "context";
import { useContext } from "react";
import { AuthContext } from "context";

function SidenavFooter() {
  const authContext = useContext(AuthContext);
  const [controller] = useArgonController();
  const { miniSidenav } = controller;

  return (
    <ArgonBox opacity={miniSidenav ? 0 : 1} sx={{ transition: "opacity 200ms linear" }}>
      <ArgonBox display="flex" flexDirection="column">
        <ArgonButton
          component={Link}
          target="_blank"
          rel="noreferrer"
          color="info"
          size="small"
          fullWidth
          onClick={() => authContext.logout()}
          mb={2}
        >
          Log Out
        </ArgonButton>
      </ArgonBox>
    </ArgonBox>
  );
}

export default SidenavFooter;
