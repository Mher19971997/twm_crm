

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
import invatedsTableData from "layouts/invited/data/invatedsTableData";
import { findAllInvated } from "http/invated";
import React, { useState } from "react";
import { useQuery } from "react-query";
import * as qs from 'qs';
import moment from 'moment'
import Author from "components/Author";
import ArgonBadge from "components/ArgonBadge";

function Invated() {
  const { skeletonRows, columns } = invatedsTableData();

  const limit = 7;
  const [page, setPage] = useState(1);

  const [query, setQuery] = useState({
    queryMeta: {
      paginate: true,
      limit: limit,
      page,
    },
    filterMeta: {},
  });
  const { isLoading, data: invateds } = useQuery(["invated", page, query], () =>
    findAllInvated(qs.stringify(query))
  );
  console.log(invateds, "invatedsinvateds");

  const invatedsRowData = invateds?.data.map((invate, index) => ({
    type: <ArgonTypography variant="span" fontWeight="mdeium">{invate.type}</ArgonTypography>,
    organization: <Author
      image={'https://play-lh.googleusercontent.com/Fro4e_osoDhhrjgiZ_Y2C5FNXBMWvrb4rGpmkM1PDAcUPXeiAlPCq7NeaT4Q6NRUxRqo'}
      name={invate?.organization?.name}
      email={invate?.organization?.email}
    />,
    createdAt: <ArgonTypography variant="span" fontWeight="mdeium">{moment(invate.createdAt).format("HH:mm, DD.MM.YYYY")}</ArgonTypography>,
    status: <ArgonBadge variant="gradient" badgeContent={invate.status} color={invate.status === 'approved' ? 'success' : 'error'} size="xs" container />,
    actions: (
      <ArgonBox display="flex" alignItems="center" gap={2} justifyContent="space-between">
        {/* <OrderDelete uuid={order.uuid} /> */}
      </ArgonBox>
    ),
  }));
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox py={3}>
        <ArgonBox mb={3}>
          <Card>
            <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <ArgonTypography variant="h6">Invateds Table</ArgonTypography>
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
                rows={isLoading ? skeletonRows : invatedsRowData}
                setPage={setPage}
                setQuery={setQuery}
                currentPage={page}
                pageCount={Math.ceil(invateds?.meta?.count / limit)}
                pagination
              />
            </ArgonBox>
          </Card>
        </ArgonBox>
      </ArgonBox>
    </DashboardLayout>
  );
}

export default Invated;
