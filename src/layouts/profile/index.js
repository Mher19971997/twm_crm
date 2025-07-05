

// TWA MUI components
import ArgonBox from "components/ArgonBox";

// TWA MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

// Overview page components
import Header from "layouts/profile/components/Header";


// Images
import { getProfile } from "http/authApi";
import { useQuery } from "react-query";
import { Divider } from "@mui/material";

function Overview() {
  const { isLoading, data: profile } = useQuery(["profile"], () =>
    getProfile()
  );
  if (isLoading) {
    return <h1>Loading</h1>
  }

  return (
    <DashboardLayout bgColor={'transparent'}>
      <Header profile={profile?.data} />
      <ArgonBox mt={5} mb={3}>
        <Divider sx={{ backgroundColor: 'black' }} />
      </ArgonBox>
    </DashboardLayout>
  );
}

export default Overview;
