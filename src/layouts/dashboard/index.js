/* eslint-disable no-unused-vars */


// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// TWA MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// TWA MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DetailedStatisticsCard from "examples/Cards/StatisticsCards/DetailedStatisticsCard";
import SalesTable from "examples/Tables/SalesTable";
import CategoriesList from "examples/Lists/CategoriesList";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";

// TWA MUI base styles
import typography from "assets/theme/base/typography";

// Dashboard layout components
import Slider from "layouts/dashboard/components/Slider";

// Data
import gradientLineChartData from "layouts/dashboard/data/gradientLineChartData";
import salesTableData from "layouts/dashboard/data/salesTableData";
import categoriesListData from "layouts/dashboard/data/categoriesListData";
import { useQuery } from "react-query";
import { getAbalyticTotalize } from "http/analyticAPI";
import { useTranslation } from "react-i18next";
import { useState, startTransition } from "react";

function Default() {
  const { t, ready } = useTranslation('dashboard')
  const { size } = typography;
  // State for analyticsData data
  const [analyticsData, setAnalyticsData] = useState(null);

  // Use useQuery to fetch data
  const { isLoading } = useQuery(["analytic"], () =>
    getAbalyticTotalize(),
    {
      onSuccess: (data) => {
        startTransition(() => {
          setAnalyticsData(data);
        });
      }
    }
  );
  if (!ready) {
    return <div>Loading...</div>; // Загрузочный экран пока языковые ресурсы не готовы
  }
  console.log(analyticsData, "analyticsanalytics");
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox py={3}>
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} md={6} lg={3}>


            <DetailedStatisticsCard
              title={t('detailed.money.title')}
              count="$53,000"
              icon={{ color: "info", component: <i className="ni ni-money-coins" /> }}
              percentage={{ color: "success", count: "+55%", text: t('detailed.money.description') }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <DetailedStatisticsCard
              title={t('detailed.user.title')}
              count={analyticsData?.data?.user}
              icon={{ color: "error", component: <i className="ni ni-world" /> }}
              percentage={{ color: "success", count: "+3%", }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <DetailedStatisticsCard
              title={t('detailed.organization.title')}
              count={analyticsData?.data?.organization}
              icon={{ color: "success", component: <i className="ni ni-paper-diploma" /> }}
              percentage={{ color: "error", count: "-2%", }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <DetailedStatisticsCard
              title={t('detailed.garage.title')}
              count={analyticsData?.data?.garage}
              icon={{ color: "warning", component: <i className="ni ni-cart" /> }}
              percentage={{ color: "success", count: "+5%", }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} lg={7}>
            <GradientLineChart
              title={t('gradient.sales.title')}
              description={
                <ArgonBox display="flex" alignItems="center">
                  <ArgonBox fontSize={size.lg} color="success" mb={0.3} mr={0.5} lineHeight={0}>
                    <Icon sx={{ fontWeight: "bold" }}>arrow_upward</Icon>
                  </ArgonBox>
                  <ArgonTypography variant="button" color="text" fontWeight="medium">
                    4% {t('more')}{" "}
                    <ArgonTypography variant="button" color="text" fontWeight="regular">
                      {t("in")} 2024
                    </ArgonTypography>
                  </ArgonTypography>
                </ArgonBox>
              }
              chart={gradientLineChartData}
            />
          </Grid>
          <Grid item xs={12} lg={5}>
            <Slider />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <SalesTable title={t('sales.by.country.title')} rows={salesTableData} />
          </Grid>
          <Grid item xs={12} md={4}>
            <CategoriesList title={t('categories')} categories={categoriesListData} />
          </Grid>
        </Grid>
      </ArgonBox>
    </DashboardLayout>
  );
}

export default Default;
