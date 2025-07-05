

import { useMemo } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// uuid is a library for generating unique id
import { v4 as uuidv4 } from "uuid";

// @mui material components
import { Icon, IconButton, Table as MuiTable, Pagination } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

// TWA MUI components
import ArgonBox from "components/ArgonBox";
import ArgonAvatar from "components/ArgonAvatar";
import ArgonTypography from "components/ArgonTypography";

// TWA MUI base styles
import typography from "assets/theme/base/typography";
import borders from "assets/theme/base/borders";
import { useSearchParams } from "react-router-dom";

function Table({
  columns,
  rows,
  pagination,
  setPage,
  pageCount,
  setQuery,
  limit,
  currentPage,
  handleOpenFilterMenu

}) {
  const { size, fontWeightBold } = typography;
  const { borderWidth } = borders;
  const [searchParams, setSearchParams] = useSearchParams();

  const renderColumns = columns.map(({ name, align, width }, key) => {
    let pl;
    let pr;

    if (key === 0) {
      pl = 3;
      pr = 3;
    } else if (key === columns.length - 1) {
      pl = 3;
      pr = 3;
    } else {
      pl = 1;
      pr = 1;
    }

    return (
      (name === "actions" && (
        <ArgonBox
          key={name}
          component="th"
          width={width || "auto"}
          pt={1.5}
          pb={1.25}
          pl={align === "left" ? pl : 3}
          pr={align === "right" ? pr : 3}
          textAlign={align}
          fontSize={size.xxs}
          fontWeight={fontWeightBold}
          color="inherit"
          opacity={0.7}
          sx={({ palette: { light } }) => ({ borderBottom: `${borderWidth[1]} solid ${light.main}` })}
        >
          <IconButton onClick={handleOpenFilterMenu} size="large" color="text">
            <Icon sx={{ fontWeight: "bold" }}>filter_list_icon</Icon>
          </IconButton>
        </ArgonBox>
      )) ||
      <ArgonBox
        key={name}
        component="th"
        width={width || "auto"}
        pt={1.5}
        pb={1.25}
        pl={align === "left" ? pl : 3}
        pr={align === "right" ? pr : 3}
        textAlign={align}
        fontSize={size.xxs}
        fontWeight={fontWeightBold}
        color="secondary"
        opacity={0.7}
        sx={({ palette: { light } }) => ({ borderBottom: `${borderWidth[1]} solid ${light.main}` })}
      >
        {name.toUpperCase()}
      </ArgonBox>

    );
  });

  const renderRows = rows.map((row, key) => {
    const rowKey = `row-${key}`;

    const tableRow = columns.map(({ name, align }) => {
      let template;

      if (Array.isArray(row[name])) {
        template = (
          <ArgonBox
            key={uuidv4()}
            component="td"
            p={1}
            sx={({ palette: { light } }) => ({
              borderBottom: row.hasBorder ? `${borderWidth[1]} solid ${light.main}` : null,
            })}
          >
            <ArgonBox display="flex" alignItems="center" py={0.5} px={1}>
              <ArgonBox mr={2}>
                <ArgonAvatar src={row[name][0]} name={row[name][1]} variant="rounded" size="sm" />
              </ArgonBox>
              <ArgonTypography variant="button" fontWeight="medium" sx={{ width: "max-content" }}>
                {row[name][1]}
              </ArgonTypography>
            </ArgonBox>
          </ArgonBox>
        );
      } else {
        template = (
          <ArgonBox
            key={uuidv4()}
            component="td"
            p={1}
            textAlign={align}
            verticalAlign="middle"
            lineHeight={0.65}
            sx={({ palette: { light } }) => ({
              borderBottom: row.hasBorder ? `${borderWidth[1]} solid ${light.main}` : null,
            })}
          >
            <ArgonTypography
              variant="button"
              fontWeight="regular"
              color="secondary"
              sx={{ display: "inline-block", width: "max-content" }}
            >
              {row[name]}
            </ArgonTypography>
          </ArgonBox>
        );
      }

      return template;
    });

    return <TableRow key={rowKey}>{tableRow}</TableRow>;
  });

  return useMemo(
    () => (
      <TableContainer>
        <MuiTable>
          <ArgonBox component="thead">
            <TableRow>{renderColumns}</TableRow>
          </ArgonBox>
          <TableBody >{renderRows}</TableBody>
        </MuiTable>
        {pagination && (
          <ArgonBox
            display="flex"
            justifyContent="flex-end"
            pt={2.5}
            pb={1}
          >
            <Pagination
              color="warning"
              count={pageCount}
              sx={{
                "& .MuiPaginationItem-root.Mui-selected": {
                  color: "#fff",
                  background: "linear-gradient(310deg, #11cdef, #26cdef)",
                  fontWeight: "500",
                },
                "& .MuiPaginationItem-root": {
                  color: "rgba(0, 0, 0, 0.65)",
                  background: "rgba(0, 0, 0, 0.05)",
                  fontWeight: "500",
                  margin: "0 4px",
                  fontSize: "12px",
                },
                "& .MuiPagination-ul li:first-of-type button, & .MuiPagination-ul li:last-child button":
                {
                  background: "transparent",
                  fontSize: "20px",
                },
              }}
              onChange={(_, page) => {
                setPage(page);
                setSearchParams({ page })
              }}
              page={currentPage}
            />
          </ArgonBox>
        )}
      </TableContainer>
    ),
    [columns, rows]
  );
}

// Setting default values for the props of Table
Table.defaultProps = {
  columns: [],
  rows: [{}],
};

// Typechecking props for the Table
Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object),
  rows: PropTypes.arrayOf(PropTypes.object),
  handleOpenFilterMenu: PropTypes.any,
  pagination: PropTypes.bool,
  setPage: PropTypes.any,
  currentPage: PropTypes.number,
  pageCount: PropTypes.number,
  setQuery: PropTypes.any,
  limit: PropTypes.any
};
export default Table;
