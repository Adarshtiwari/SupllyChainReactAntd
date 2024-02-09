import React, { useEffect, useState } from "react";
import { DatePicker, Flex, Select, Typography } from "antd";
// import moment from 'moment';
import moment from 'moment';
import dayjs from 'dayjs';
import 'moment/locale/en-au';

const { Text } = Typography;
const dateFormat = 'YYYY-MM-DD';
const originalFormat = 'DD/MM/YY';
const targetFormat = 'DD/MM/YYYY';
function Datepick({startDate,endDate}) {
  const initialStartDate = new Date();
  const initialEndDate = new Date();
  const [selectestartdDate, setSelectedStartDate] = useState("");
  const [selecteenddDate, setSelectedEndDate] = useState("");
  const [getdate,SetgetDate]=useState(false)
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

  useEffect(()=>{
    // initialEndDate=startDate
    // setSelectedStartDate(startDate);
    SetgetDate(false)
    setTimeout(()=>{
    
      const originalDate = '27/07/18';
    
      
      const convertedDate = dayjs(startDate, originalFormat).format(targetFormat);
      const convertedEndDate = dayjs(endDate, originalFormat).format(targetFormat);
            setSelectedStartDate(convertedDate);
            setSelectedEndDate(convertedEndDate)
            SetgetDate(true)
            console.log("start , end  data  after timeout ",selectestartdDate,selecteenddDate)
      },2000)
  
    console.log("start , end  data ",selectestartdDate,selecteenddDate)
  },[startDate, endDate])

  const handleSelectChange = (value) => {
    // Update state with the selected value
    // setData(value);
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
      {getdate && (   
        
      <DatePicker
        onChange={onChange}
        format="DD/MM/YY"
  
        // value={startDate && dayjs(startDate,dateFormat)}
        defaultValue={dayjs(selectestartdDate, targetFormat)} 
        // format={dateFormat
        suffixIcon={<i class="fa-solid fa-caret-down"></i>}
        placeholder="Start Date"
        style={{
          border: "none",
          borderRadius: 30,
          // boxShadow: "rgba(0, 0, 0, 0.24) 0px 1px 2px",
          width: 100,
          color: "#4285F4",
          fontSize:12,
        }}
        className="custom-class"
      ></DatePicker>
     )} 
   
      <Text strong style={{ fontSize: 12 }}>
        {""} to{" "}
      </Text>
      {getdate &&
        (  
        <DatePicker
        onChange={onChange}
        format="DD/MM/YY"
        defaultValue={dayjs(selecteenddDate, targetFormat)} 
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
      )}
      <Text strong style={{ fontSize: 12 }}>
        {""} by{" "}
      </Text>
      <Select
        style={{
          borderRadius: 30,
          width: 120
        }}
        onChange={handleSelectChange}
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
