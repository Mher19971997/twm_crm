

// @mui material components
import Card from "@mui/material/Card";
// TWA MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// TWA MUI examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Table from "examples/Tables/Table";

// Data
import garagesTableData from "layouts/garages/data/garagesTableData";
import React, { useState } from "react";
import { useQuery } from "react-query";
import * as qs from 'qs';
import moment from 'moment'
import { findAllGarages } from "http/garage";
import Author from "components/Author";
import { IconButton, Link, Rating } from "@mui/material";
import ReactCountryFlag from "react-country-flag";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterGarageMenu from "./components/FilterGarageMenu/index";
import { convertFilterQuery } from "utils/convertFilterQuery";
import { useSearchParams } from "react-router-dom";
import ___ from 'lodash';
import { useTranslation } from "react-i18next";

const defaultLogo = 'https://play-lh.googleusercontent.com/Fro4e_osoDhhrjgiZ_Y2C5FNXBMWvrb4rGpmkM1PDAcUPXeiAlPCq7NeaT4Q6NRUxRqo'
function Individual() {
  const { t } = useTranslation('garages')
  const { skeletonRows, columns } = garagesTableData();
  const [openMenu, setOpenMenu] = useState(false);
  const [searchParams] = useSearchParams();
  const paramsObject = Object.fromEntries(searchParams.entries());
  const limit = 10;
  const [page, setPage] = useState(+searchParams.get("page") || 1);

  const { isLoading, data: garages } = useQuery(["garages", page, paramsObject, searchParams.size], () =>
    findAllGarages(qs.stringify({
      queryMeta: {
        paginate: true,
        limit: limit,
        page,
      },
      filterMeta: convertFilterQuery(___.omit(paramsObject, ['page'])),
    }))
  );
  const handleCloseMenu = () => setOpenMenu(false);
  const handleOpenMenu = () => setOpenMenu(true);

  const garagesRowData = garages?.data.map((garage, index) => ({
    garage: <Author
      image={garage?.logo ? `http://localhost:6001/${garage.logo}` : defaultLogo}
      name={garage.name}
      email={garage.email}
    />,
    inn: garage.inn,
    rate: <Rating name="half-rating" readOnly value={garage.rate} precision={0.5} />,
    status: garage.status,
    phone: <ArgonBox display="flex" alignItems="center" gap={1}>
      <ReactCountryFlag countryCode="AM" />
      <Link href={`tel:${garage.phone}`} variant="span" fontWeight="mdeium">
        {garage.phone}
      </Link>
    </ArgonBox>,
    createdAt: moment(garage.createdAt).format("HH:mm, DD.MM.YYYY"),
    actions: (
      <ArgonBox display="flex" alignItems="center" gap={2} justifyContent="space-between">
        {/* <OrderDelete uuid={order.uuid} /> */}
        <IconButton aria-label="delete">
          <EditIcon />
        </IconButton>
        <IconButton color="error" aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </ArgonBox>
    ),
  }));
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <FilterGarageMenu openMenu={openMenu} handleCloseMenu={handleCloseMenu} />
      <ArgonBox py={3}>
        <ArgonBox mb={3}>
          <Card>
            <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <ArgonTypography variant="h6">{t("title")}</ArgonTypography>
            </ArgonBox>
            <ArgonBox
              sx={{
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`,
                  },
                },
              }}
            >
              <Table
                columns={columns}
                rows={isLoading ? skeletonRows : garagesRowData}
                setPage={setPage}
                currentPage={page}
                pageCount={Math.ceil(garages?.meta?.count / limit)}
                pagination
                handleOpenFilterMenu={handleOpenMenu}
              />
            </ArgonBox>
          </Card>
        </ArgonBox>
      </ArgonBox>
    </DashboardLayout>
  );
}

export default Individual;
