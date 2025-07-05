

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
import organizationsTableData from "layouts/organizations/data/organizationsTableData";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import * as qs from 'qs';
import moment from 'moment'
import { findAllOrganizations } from "http/organization";
import Author from "components/Author";
import { IconButton, Link, Rating } from "@mui/material";
import ReactCountryFlag from "react-country-flag";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FilterOrganizationMenu from "./components/FilterOrganizationMenu/index";
import { useSearchParams } from "react-router-dom";
import { convertFilterQuery } from "utils/convertFilterQuery";
import ___ from 'lodash';
import ArgonButton from "components/ArgonButton";
import { invatedGarageOrOrganization } from "http/invated";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useTranslation } from "react-i18next";

function Organizations() {
  const { t } = useTranslation("organizations")
  const { skeletonRows, columns } = organizationsTableData();
  const [openMenu, setOpenMenu] = useState(false);
  const [searchParams] = useSearchParams();
  const paramsObject = Object.fromEntries(searchParams.entries());

  const queryClient = useQueryClient();

  const limit = 7;
  const [page, setPage] = useState(+searchParams.get("page") || 1);
  const prefix = localStorage.getItem('prefix')

  const { isLoading, data: organizations } = useQuery(["organizations", prefix, page, paramsObject, searchParams.size], () =>
    findAllOrganizations(qs.stringify({
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

  // invatedGarageOrOrganization

  const { mutate, isError } = useMutation((uuid) => invatedGarageOrOrganization(uuid), {
    onSuccess: (response, formData) => {
      console.log(response, formData, 2132231321);
      queryClient.invalidateQueries("organizations");

      // authContext.login(response?.data.token);
      // return setIsValid(true);
    },
    onError: (error) => {
      console.log(error, "errorerror");
      // setError(error.response.data.message);
    },
  });
  const organizationsRowData = organizations?.data.map((organization, index) => ({
    organization: <Author
      image={'https://play-lh.googleusercontent.com/Fro4e_osoDhhrjgiZ_Y2C5FNXBMWvrb4rGpmkM1PDAcUPXeiAlPCq7NeaT4Q6NRUxRqo'}
      name={organization?.name}
      email={organization?.email}
    />,
    inn: organization.inn,
    rate: <Rating name="half-rating" readOnly value={organization.rate} precision={0.5} />,
    status: organization.status,
    phone: <ArgonBox display="flex" alignItems="center" gap={1}>
      <ReactCountryFlag countryCode="AM" />
      <Link href={`tel:${organization.phone}`} variant="span" fontWeight="mdeium">
        {organization.phone}
      </Link>
    </ArgonBox>,
    createdAt: moment(organization.createdAt).format("HH:mm, DD.MM.YYYY"),
    actions: (
      prefix === 'admin' ?

        <ArgonBox display="flex" alignItems="center" gap={2} justifyContent="space-between">
          {/* <OrderDelete uuid={order.uuid} /> */}
          <IconButton aria-label="delete">
            <EditIcon />
          </IconButton>
          <IconButton color="error" aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </ArgonBox>
        : organization.organizationInvated &&
        <ArgonButton type="submit" color="info" size="small" sx={{ width: 100 }} fullWidth onClick={() => mutate(organization.uuid)}>
          Following <KeyboardArrowDownIcon />
        </ArgonButton> ||
        <ArgonButton type="submit" color="info" size="small" sx={{ width: 100 }} fullWidth onClick={() => mutate(organization.uuid)}>
          Follow
        </ArgonButton>

    ),
  }));
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <FilterOrganizationMenu openMenu={openMenu} handleCloseMenu={handleCloseMenu} />
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
                rows={isLoading ? skeletonRows : organizationsRowData}
                setPage={setPage}
                currentPage={page}
                pageCount={Math.ceil(organizations?.meta?.count / limit)}
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

export default Organizations;
