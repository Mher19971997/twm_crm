import React from "react";
import PropTypes from "prop-types";
import ArgonBox from "components/ArgonBox";
import ArgonInput from "components/ArgonInput";
import ArgonTypography from "components/ArgonTypography";

const DateToDate = ({ dateFrom, setDateFrom, dateTo, setDateTo }) => {

  return (
    <ArgonBox mb={0.5} sx={{width: '48%'}}>
      <ArgonBox mb={0.5} ml={0.5}>
        <ArgonTypography component="label" variant="caption" fontWeight="bold">
          Date
        </ArgonTypography>
      </ArgonBox>
      <ArgonBox display="flex" sx={{ width: '100%' }} alignItems="center" gap={0.5}>
        <ArgonInput
          type="datetime-local"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
        />
        <ArgonTypography component="label" variant="caption" fontWeight="bold">
          -
        </ArgonTypography>
        <ArgonInput
          type="datetime-local"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
        />
      </ArgonBox>
    </ArgonBox>
  );
};

DateToDate.propTypes = {
  dateFrom: PropTypes.any,
  setDateFrom: PropTypes.any,
  dateTo: PropTypes.any,
  setDateTo: PropTypes.any,
};

export default DateToDate;