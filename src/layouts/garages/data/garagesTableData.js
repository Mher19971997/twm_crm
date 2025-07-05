import { Skeleton } from "@mui/material";
import { generateData } from "utils/tableColumnData";

const data = () => {
  return {
    columns: [
      { name: "garage", align: "left" },
      { name: "phone", align: "left" },
      { name: "rate", align: "left" },
      { name: "inn", align: "left" },
      { name: "status", align: "left" },
      { name: "createdAt", align: "left" },
      { name: "actions", align: "center" },
    ],
    skeletonRows: generateData(4, {
      garage: <Skeleton variant="text" sx={{ fontSize: "40px" }} width={40} />,
      information: <Skeleton variant="text" sx={{ fontSize: "14px" }} width={60} />,
      rate: <Skeleton variant="text" sx={{ fontSize: "14px" }} width={60} />,
      status: <Skeleton variant="text" sx={{ fontSize: "14px" }} width={70} />,
      phone: <Skeleton variant="text" sx={{ fontSize: "14px" }} width={70} />,
      createdAt: <Skeleton variant="text" sx={{ fontSize: "14px" }} width={70} />,
      actions: <></>,
    }),
  };
};

export default data;