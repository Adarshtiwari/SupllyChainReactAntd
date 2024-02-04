import React, { useState } from "react";
import { DatePicker, Flex, Select, Typography } from "antd";
const { Text } = Typography;

function Datepick() {
  const initialStartDate = new Date();
  const initialEndDate = new Date();
  initialEndDate.setMonth(initialEndDate.getMonth() + 1);

  const formatDate = (date) => {
    return date
      ? date.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : "";
  };

  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <div>
      <Text strong style={{ fontSize: 16 }}>
        {" "}
        Current Plan
      </Text>
      <Text strong style={{ fontSize: 12 }}>
        {" "}
        showing for{" "}
      </Text>
      <DatePicker
        onChange={onChange}
        format="DD/MM/YYYY"
        suffixIcon={<i class="fa-solid fa-caret-down"></i>}
        placeholder="Start Date"
        style={{
          border: "none",
          borderRadius: 30,
          // boxShadow: "rgba(0, 0, 0, 0.24) 0px 1px 2px",
          width: 100,
          color: "#4285F4",
          fontSize:12
        }}
      ></DatePicker>
      <Text strong style={{ fontSize: 12 }}>
        {""} to{" "}
      </Text>
      <DatePicker
        onChange={onChange}
        format="DD/MM/YYYY"
        suffixIcon={<i class="fa-solid fa-caret-down"></i>}
        placeholder="End Date"
        style={{
          border: "none",
          borderRadius: 30,
          width: 100,
          color: "#4285F4",
          fontSize:12
        }}
      ></DatePicker>
      <Text strong style={{ fontSize: 12 }}>
        {""} by{" "}
      </Text>
      <Select
        style={{
          borderRadius: 30,
          width: 120
        }}
        defaultValue="Monthly View"
        placeholder="Select View"
        className="custom-select"
        options={[
          { value: "daily", label: "Daily View" },
          { value: "weekly", label: "Weekly View" },
          { value: "monthly", label: "Monthly View" },
          { value: "quarterly", label: "Quarterly View" },
          { value: "yearly", label: "Yearly View" },
        ]}
        variant="borderless"
        suffixIcon={<i class="fa-solid fa-caret-down"></i>}
      />
    </div>
  );
}

export default Datepick;
