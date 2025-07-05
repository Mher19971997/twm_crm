import React from "react";

// @mui material components
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import PropTypes from "prop-types";

// React components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// Custom styles for the Configurator
import ConfiguratorRoot from "examples/FilterConfigurator/ConfiguratorRoot";

// React context

const FilterConfigurator = ({ handleCloseMenu, openMenu, title, children }) => {
  return (
    <ConfiguratorRoot variant="permanent" ownerState={{ openConfigurator: openMenu }}>
      <ArgonBox
        display="flex"
        justifyContent="space-between"
        alignItems="baseline"
        pt={3}
        pb={0.8}
        px={3}
      >
        <ArgonBox>
          <ArgonTypography variant="h5">{title}</ArgonTypography>
        </ArgonBox>
        <Icon
          sx={({ typography: { size, fontWeightBold }, palette: { dark } }) => ({
            fontSize: `${size.md} !important`,
            fontWeight: `${fontWeightBold} !important`,
            stroke: dark.main,
            strokeWidth: "2px",
            cursor: "pointer",
            mt: 2,
          })}
          onClick={handleCloseMenu}
        >
          close
        </Icon>
      </ArgonBox>

      <Divider />

      <ArgonBox pt={1.25} pb={3} px={1}>
        <ArgonBox>{children}</ArgonBox>
      </ArgonBox>
    </ConfiguratorRoot>
  );
};

FilterConfigurator.propTypes = {
  handleCloseMenu: PropTypes.any,
  openMenu: PropTypes.any,
  children: PropTypes.any,
  title: PropTypes.string
};

export default FilterConfigurator;