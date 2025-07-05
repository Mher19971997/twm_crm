import { Skeleton } from "@mui/material";
import { generateData } from "utils/tableColumnData";

const data = () => {
  return {
    columns: [
      { name: "organization", align: "left" },
      { name: "type", align: "left" },
      { name: "createdAt", align: "center" },
      { name: "status", align: "center" },
      { name: "actions", align: "center" },
    ],
    skeletonRows: generateData(3, {
      type: <Skeleton variant="text" sx={{ fontSize: "14px" }} width={60} />,
      status: <Skeleton variant="text" sx={{ fontSize: "14px" }} width={70} />,
      createdAt: <Skeleton variant="text" sx={{ fontSize: "14px" }} width={70} />,
      actions: <></>,
    }),
  };
};

export default data;