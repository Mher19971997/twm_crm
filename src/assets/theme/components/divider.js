 

// TWA MUI base styles
import colors from "assets/theme/base/colors";

// TWA MUI helper functions
import rgba from "assets/theme/functions/rgba";
import pxToRem from "assets/theme/functions/pxToRem";

const { dark, transparent, white } = colors;

const divider = {
  styleOverrides: {
    root: {
      backgroundColor: transparent.main,
      backgroundImage: `linear-gradient(to right, ${rgba(dark.main, 0)}, ${rgba(
        dark.main,
        0.4
      )}, ${rgba(dark.main, 0)}) !important`,
      height: pxToRem(1),
      margin: `${pxToRem(16)} 0`,
      borderBottom: 0,
      borderLeft: 0,
      borderRight: 0,
      opacity: 0.25,
    },

    vertical: {
      backgroundColor: transparent.main,
      backgroundImage: `linear-gradient(180deg, ${rgba(dark.main, 0)}, ${rgba(
        dark.main,
        0.4
      )}, ${rgba(dark.main, 0)}) !important`,
      width: pxToRem(1),
      height: "100%",
      margin: `0 ${pxToRem(16)}`,
      borderRight: "unset",
    },

    light: {
      backgroundColor: transparent.main,
      backgroundImage: `linear-gradient(to right, ${rgba(white.main, 0)}, ${white.main}, ${rgba(
        white.main,
        0
      )}) !important`,

      "&.MuiDivider-vertical": {
        backgroundImage: `linear-gradient(180deg, ${rgba(white.main, 0)}, ${white.main}, ${rgba(
          white.main,
          0
        )}) !important`,
      },
    },
  },
};

export default divider;
