import React, { useEffect, useRef, useState } from "react";
import "./assets/chart.css";
import Datepick from "./datepick";

import PopupComponent from "./PopupComponent"; //popup component

import { Table, Row, Col, Button, Select, Tooltip } from "antd";
import axios from "axios";
import Chartda from "./ChartData ";
import "./assets/table.css";
import {
  PlusCircleTwoTone,
  FullscreenOutlined,
  FullscreenExitOutlined,
  FilterFilled,
  ArrowDownOutlined,
  ArrowUpOutlined,
} from "@ant-design/icons/lib/icons";
import {
  API_URL,
  BaseUrl,
  demotabledata,
  tableMapping,
} from "../Constant/constant";
import { test } from "../Constant/constant";
import FilterModal from "./FilterModal";


const App = () => {
  const [selectionType, setSelectionType] = useState("checkbox");
  const [apiData, setApiData] = useState([]);
  const [resultapiData, setresultApiData] = useState([]);
  const [selectedProductGroup, setSelectedProductGroup] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedCustomerGroup, setSelectedCustomerGroup] = useState(null);
  const [isMaximized, setIsMaximized] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [selectedheadings, setselectedheadings] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 5;
  const [statecolumns, setcolumns] = useState([]);
  const [statetableData, setStatetableData] = useState([]);
  const [selectedRowscheck, setSelectedRowscheck] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedRowsKeyCheck, setSelectedRowsKeyCheck] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState([]);
  const [mappingId, setMappingId] = useState(null);
  const [selectrowvalue, setSelectrowValue] = useState([]);
  const [SetfilterApiData, setSetfilterApiData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedColumnValues, setSelectedColumnValues] = useState({
    item: "item",
    customer: "customer",
    location: "location",
  });
  const [startDate, SetstartDate] = useState(null);
  const [endDate, SetendtDate] = useState(null);
  const [getdate, SetgetDate] = useState(false);

  const [totalItems, setTotalItems] = useState(0);
  const pageSize = 10; // Set your desired page size
  const [currentPage, setCurrentPage] = useState(1);

  const [getDataType, setgetDataType] = useState("");

  //testing
  const [dynamicColumns, setdynamicColumns] = useState(1);

  const [totalwidth, settoatlwidth] = useState(0);
  const getWidthData = (colvalue) => {
    colvalue = colvalue.charAt(0).toLowerCase() + colvalue.slice(1);
    console.log(" in the column widht  ", colvalue);
    if (
      "item" == colvalue ||
      "customer" == colvalue ||
      "location" == colvalue
    ) {
      return "7%";
    }
    if (colvalue.startsWith("catt")) {
      return "10%";
    }
    if (colvalue.startsWith("latt")) {
      return "10%";
    }
    if (colvalue.startsWith("iatt")) {
      console.log(" iatt lenght ", 300 / colvalue.length);
      return `${300 / colvalue.length}%`;
    } else {
      return `${100 / colvalue.length}%`;
    }
  };

  // *****

  //filter model

  const [filterModalVisible, setFilterModalVisible] = useState(false);

  const showFilterModal = () => {
    setFilterModalVisible(true);
  };

  const closeFilterModal = () => {
    setFilterModalVisible(false);
  };

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 200, // Adjust the page size as needed
    total: 0,
  });
  const [tableDatademo, setTableData] = useState([]);
  const [hasMoreData, setHasMoreData] = useState(true);
  const handleScroll = (e) => {
    console.log(" on scrol call");
    const { scrollTop, clientHeight, scrollHeight } = e.target;

    const { target } = e;
    const bottomReached =
      target.scrollHeight - target.scrollTop === target.clientHeight;

    if (bottomReached && hasMoreData && !loading) {
      // Fetch more data from API
      setPagination((prevPagination) => ({
        ...prevPagination,
        current: pagination.current + 1,
      }));

      fetchData(pagination.current);
    }
  };

  const fetchData = async (pageNumber) => {
    try {
      const promises = [];
      setLoading(true);
      console.log(
        pageNumber,
        `https://horizon-app.onrender.com/api/forecastmains/?fields=item,customer,location,sdate,fdate&ordering=item,customer,location,sdate,fdate
        }`
      );
      const response = await axios.get(
        `https://horizon-app.onrender.com/api/forecastmains/?fields=item,customer,location,sdate,fdate&ordering=item,customer,location,sdate,fdate`
      );

      console.log(" the response ", response);

      let column = await tableData(response.data.results, [
        "item",
        "customer",
        "location",
      ]);

      if (startDate != null) {
        setTimeout(() => {
          SetgetDate(true);
          console.log("hello");
        }, 2000);
      }
      console.log(
        " table data aagya,",
        column.tableData,
        "set data",
        statetableData
      );
      setApiData(response.data);
      setresultApiData(response.data.results);

      const newRows = column.tableData;
      const prevIds = new Set(statetableData.map((row) => row.id));

      // Filter out rows with IDs already present in the previous data
      const filteredNewRows = newRows.filter((row) => !prevIds.has(row.id));

      // Combine the filtered new data with the previous data
      const updatedData = [...statetableData, ...filteredNewRows];

      // setStatetableData((prevData) => [...prevData, ...updatedData]);
      setStatetableData(updatedData);

      const updatecolumn = column.precolumns.map((col, index) => ({
        ...col,
        width: calculateColumnWidth(col.dataIndex || col.title),
      }));
      console.log(
        " columns *********",
        column.precolumns,
        "adarsh ---",
        updatecolumn
      );
      setcolumns(updatecolumn);
      settoatlwidth(updatecolumn.length);
      setdynamicColumns(updatecolumn);
      setPagination((prevPagination) => ({
        ...prevPagination,
        total: column.tableData.length,
      }));
      setLoading(false);
      setTimeout(() => {
        console.log(" toatl settoatlwidth  ", totalwidth);
      }, 2000);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  //get Table Data  on select

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
      setSelectedRowscheck(selectedRows);
      setSelectedRowKeys(selectedRowKeys);
      console.log(" row slected Call ");
      //("resAPI ", setApiData(setSetfilterApiData));
    },

    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
    columnWidth: 100,
  };

  const tableStyle = {
    backgroundColor: "#F9F9FC",
    height: "100%",
    marginBottom: 0,
    minHeight: "100%",
    width: "100%",
    overflowY: "auto",
  };
  // changes
  const handleMaximizeToggle = () => {
    setIsMaximized((prevIsMaximized) => !prevIsMaximized);
    const d = document.querySelector("#ch");
    if (d) {
      d.style.display = isMaximized ? "block" : "none";
    }
  };

  // popup

  // popup
  const [showPopup, setShowPopup] = useState(false);

  const handlePlusIconClick = () => {
    setselectedheadings([]);
    console.log(" row Plus Button Click *** ");

    const columnsArray = ["item", "location", "customer"];

    const replaceNullValues = (value, index) =>
      value !== null ? value : columnsArray[index];

    const nonNullProductGroup = replaceNullValues(selectedProductGroup, 0);
    const nonNullLocation = replaceNullValues(selectedLocation, 1);
    const nonNullCustomerGroup = replaceNullValues(selectedCustomerGroup, 2);
    setSelectedProductGroup(nonNullProductGroup);
    setSelectedLocation(nonNullLocation);
    setSelectedCustomerGroup(nonNullCustomerGroup);
    setSelectrowValue([]);
    let newSelection = [];
    if (selectedKeys.length <= 0) {
      newSelection = [columnsArray];
    } else {
      newSelection = [selectedKeys];
    }

    setselectedheadings([...selectedheadings, newSelection]);

    setShowPopup(true);
  };

  const closePopup = (keys) => {
    console.log("POP CLosed ********** ");
    setSelectedColumn(keys);
    setSelectrowValue(keys);
    let temp = {};
    keys.forEach((ele) => {
      temp[ele] = ele;
    });
    setSelectedColumnValues(temp);
    getFilterData("", "", "", keys);
    const tableBody = document.querySelector(".table-container tbody");
    const tableBodyRows = document.querySelectorAll(
      ".table-container tbody tr"
    );
    const columns = ["item", "location", "customer"];
    const filteredKeys = keys.filter(
      (key) =>
        !columns.includes(key) &&
        key !== selectedProductGroup &&
        key !== selectedLocation &&
        key !== selectedCustomerGroup &&
        key !== selectedKeys
    );

    setSelectedKeys(filteredKeys);

    setShowPopup(false);
  };

  // ************** Get Table Data on Click***********
  const getColumnData = async (newValue, pre) => {
    console.log(
      " In the Get Columns ********  new value->",
      newValue,
      " old value-> ",
      pre,
      "  current Column Array->  ",
      selectrowvalue
    );

    let updateColumnValue = selectrowvalue;

    updateColumnValue.forEach((ele, index) => {
      if (ele === pre) {
        updateColumnValue[index] = newValue;
      }
    });

    setSelectrowValue(updateColumnValue);
    setSelectedKeys(updateColumnValue);
    console.log("Updated Column Array->  ", updateColumnValue);

    getFilterData("", "", "", updateColumnValue);
  };

  const getFilterData = async (item, location, cusotmer, arrayData) => {
    const selectedValuesArray = Object.values(selectedColumnValues);
    setLoading(true);

    console.log(" Get Filter Call *** ");

    if (arrayData.length > 0) {
      let query = "";

      for (let i = 0; i < arrayData.length; i++) {
        if (i == arrayData.length - 1) {
          query += arrayData[i];
        } else {
          query += arrayData[i] + ",";
        }
      }

      let url =
        BaseUrl +
        "/?fields=" +
        query +
        ",fdate,sdate,sqty,f_quantity_engine,f_quantity_user&ordering=item,customer,location,sdate";

      console.log("filter URL Preapred", url);
      const response = await axios.get(url);

      await setTimeout(() => {
        setSelectedRowKeys([]);

        setSelectedRowscheck([]);
        setresultApiData(response.data.results);
      }, 2000);

      setSetfilterApiData(response.data.results);

      console.log("filter table data calling ", response.data.results);
      let column = await tableData(response.data.results, arrayData);

      const newRows = column.tableData;
      console.log("filter data table ", newRows);
      const prevIds = new Set(statetableData.map((row) => row.id));

      const filteredNewRows = newRows.filter((row) => !prevIds.has(row.id));

      const updatedData = [...statetableData, ...filteredNewRows];
      console.log("filter data table  updatedData****", updatedData);
      setStatetableData(updatedData);

      const updatecolumn = column.precolumns.map((col, index) => ({
        ...col,
        width: calculateColumnWidth(col.dataIndex || col.title),
      }));
      console.log(
        " columns *********",
        column.precolumns,
        "adarsh ---",
        updatecolumn
      );
      setcolumns(updatecolumn);
      setdynamicColumns(updatecolumn);
      setPagination((prevPagination) => ({
        ...prevPagination,
        total: column.tableData.length,
      }));
      if (startDate != null) {
        setTimeout(() => {
          SetgetDate(true);
          console.log("hello");
        }, 2000);
      }
      setLoading(false);
    }
  };

  //Api Data for Table
  useEffect(() => {
    fetchData(pagination.current);
  }, []);

  /*********** */

  const getDataFormate = (inputDate) => {
    inputDate = new Date(inputDate);
    const day = inputDate.getDate();
    const month = inputDate.getMonth() + 1; // Months are zero-based, so we add 1
    const year = inputDate.getFullYear().toString().slice(-2); // Extract last two digits of the year

    // Pad single-digit day and month with leading zeros if needed
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    // Construct the final formatted date string
    const formattedDateString = `${formattedDay}/${formattedMonth}/${year}`;
    //console.log("formattedDateString", formattedDateString);
    return formattedDateString;
  };

  const tableData = async (resutlAPI, keys) => {
    console.log("mydata orignal after call newArray ", resutlAPI);
    const sortedDates = resutlAPI
      .map((item) =>
        item.sdate !== null ? new Date(item.sdate) : new Date(item.fdate)
      )
      .filter((date) => !isNaN(date)) // Filter out invalid dates
      .sort((a, b) => a - b);

    let newArray = [];
    sortedDates.forEach((element) => {
      const dateObject = new Date(element);
      let inputDate = element;
      const day = inputDate.getDate();
      const month = inputDate.getMonth() + 1; // Months are zero-based, so we add 1
      const year = inputDate.getFullYear().toString().slice(-2); // Extract last two digits of the year

      // Pad single-digit day and month with leading zeros if needed
      const formattedDay = day < 10 ? `0${day}` : day;
      const formattedMonth = month < 10 ? `0${month}` : month;

      // Construct the final formatted date string
      const formattedDateString = `${formattedDay}/${formattedMonth}/${year}`;
      //console.log("formattedDateString", formattedDateString);
      element = formattedDateString;
      //console.log("element", element);
      newArray.push(element);
    });

    let precolumn = [];
   
    newArray = [...new Set(newArray)]; // crete unique column value
    precolumn = await createColumns(keys);
    console.log("mydata orignal after call ", precolumn);

    for (let i = 0; i < newArray.length; i++) {
      if (i == 0) {
        setTimeout(() => {
          SetstartDate(newArray[i]);
        }, 2000);
      }
      if (i == newArray.length - 1) {
        setTimeout(() => {
          SetgetDate(true);
          SetendtDate(newArray[i]);
        }, 2000);
      }
      let temp = {
        title: newArray[i],
        dataIndex: newArray[i],
        width: "5px",

        sorter: (a, b) => {
          // Handle null or undefined values appropriately
          const aValue =
            a[newArray[i]] === null || a[newArray[i]] === undefined
              ? 0
              : a[newArray[i]];
          const bValue =
            b[newArray[i]] === null || b[newArray[i]] === undefined
              ? 0
              : b[newArray[i]];

          return aValue - bValue;
        },
        render: (text) => (
          <a style={{ color: "#4285F4", fontWeight: 480 }}>
            {text === null || text === undefined ? 0 : text}
          </a>
        ),
        className: "customDynamicColumn",
        // selected: selectedValue,
      };
      precolumn.push(temp);
    }

    let tableData = await createtableData(resutlAPI, keys);

    console.log(" table data ", tableData);
    let sentData = {
      precolumns: precolumn,
      tableData: tableData,
    };

    return sentData;
  };

  const createtableData = (resutlAPI, keys) => {
    console.log("create table Data Call ", resutlAPI);

    let tableData = new Map();
    resutlAPI.forEach((ele) => {
      let combinationKey = "";
      for (let i = 0; i < keys.length; i++) {
        if (i == keys.length - 1) {
          combinationKey += ele[keys[i]];
        } else {
          combinationKey += ele[keys[i]] + "-";
        }
      }

      if (tableData.has(combinationKey)) {
        let temp = tableData.get(combinationKey);
        let getdate = "";
        if (ele.sdate != null) {
          getdate = getDataFormate(ele.sdate);
        } else {
          getdate = getDataFormate(ele.fdate);
        }

        if (temp.hasOwnProperty(getdate)) {
          // //console.log("datasame ",temp.sdate)
          if (ele.sdate != null) {
            temp[getdate] += ele.sum_sqty;
          } else {
            temp[getdate] += ele.sum_fqty;
          }
        } else {
          if (ele.sdate != null) {
            temp[getdate] = ele.sum_sqty;
          } else {
            temp[getdate] = ele.sum_fqty;
          }
        }

        tableData.set(combinationKey, temp);
      } else {
        let getData;
        if (ele.sdate != null) {
          getData = getDataFormate(ele.sdate);
          ele[getData] = ele.sum_sqty;
        } else {
          getData = getDataFormate(ele.fdate);
          ele[getData] = ele.sum_fqty;
        }

        tableData.set(combinationKey, ele);
      }
    });
    let arrayFromMap = Array.from(tableData.values());

    console.log("1001 arraydata", arrayFromMap);
    return arrayFromMap;
  };

  const getColumnSubData = async (find) => {
    try {
      console.log(" getColumnSubData function call *** ", find);
      const response = await axios.get(
        "https://horizon-app.onrender.com/api/config"
      );
      console.log(
        " in subcolumn find value ",
        find,
        " get Data Response From Config File",
        response
      );
      let subColumns = [];
      let temp1;
      let substring = "";
      let key = "";
      if (find == "item") {
        substring = "iatt";
        key = "Item";
      }
      if (find == "customer") {
        substring = "catt";
        key = "Customer";
      }
      if (find == "location") {
        substring = "latt";
        key = "Location";
      }
      let filterData;
      if (key != "") {
        filterData = response.data.mapping_table_names[key];

        temp1 = {
          value: find.charAt(0).toLowerCase() + find.slice(1),
          label: find,
        };
      }

      if (key == "") {
        let columns = ["Item", "Location", "Customer"];
        for (let i = 0; i < columns.length; i++) {
          if (
            response.data.mapping_table_names[columns[i]].hasOwnProperty(find)
          ) {
            filterData = response.data.mapping_table_names[columns[i]];

            substring = find.slice(0, -1);
            temp1 = {
              value: columns[i].charAt(0).toLowerCase() + columns[i].slice(1),
              label: columns[i],
            };
            break;
          }
        }
      }

      subColumns.push(temp1);
      for (const keys in filterData) {
        if (keys.startsWith(substring)) {
          let temp = {
            value: keys,
            label: filterData[keys],
          };
          subColumns.push(temp);
        }
      }

      return subColumns;
    } catch (error) {}
  };

  const createColumns = async (columns) => {
    let columnsValue = [];
    let precolumn = [];

    for (let i = 0; i < columns.length; i++) {
      columnsValue.push(await getColumnSubData(columns[i]));
    }
    console.log("  getColumnSubData function call 1111 ", columnsValue);
    let setcolumnValue = selectrowvalue;
    for (let i = 0; i < columns.length; i++) {
      const getWidth = getWidthData(columns[i]);
      if (setcolumnValue.length > 0) {
        if (setcolumnValue.includes(columns[i])) {
          setcolumnValue = setcolumnValue.filter((item) => item == columns[i]);
        } else {
          setcolumnValue.push(columns[i]);
        }
      } else {
        setcolumnValue.push(columns[i]);
      }

      let temp = {
        title: () => {
          return (
            <Select
              defaultValue={columns[i]}
              suffixIcon={<i class="fa-solid fa-caret-down"></i>}
              onChange={(e) => {
                getColumnData(e, columns[i]);
              }}
              dropdownStyle={{
                maxHeight: "200px",
                maxWidth: "180px", // Set your desired height
                minWidth: "150px",
                overflowY: "auto",
                fontSize: "5px",
              }}
              style={{
                paddingLeft: "5px",
                background: "#F9F9FC",
                border: "none",
                width: "100%",
                borderRadius: "none",
                fontSize: "12px",
              }}
              className="fixedDropdownTable"
              variant="borderless"
              options={columnsValue[i]}
            />
          );
        },
        dataIndex: columns[i],
        width: getWidth,
      };
      console.log("  getColumnSubData function call 2222 ", columnsValue);

      precolumn.push(temp);
    }

    return precolumn;
  };

  const paginationConfig = {
    current: currentPage,
    pageSize: pageSize,
    total: totalItems,
    showSizeChanger: false,
    onChange: (page) => setCurrentPage(page),
  };

  const handleTableChange = (pagination, filters, sorter) => {
    // Handle table changes like sorting or filtering if needed
    console.log(" table change  ", pagination);
    if (pagination.current !== currentPage) {
      fetchData(pagination.current);
      setCurrentPage(pagination.current);
    }
  };
  const calculateColumnWidth = async (name) => {
    return await getWidthData(name);
  };

  /***************** */

  return (
    <>
      <Row  gutter={0}>
        {/* <Col xs={22} sm={22} md={22} lg={22} xl={22}> */}{" "}
        <Col xs={16} sm={14} md={13} lg={14} xl={17} style={{ paddingLeft: "12px" }}>
          {/* {" "} */}
          {/* console.log("start date ",startDate, "endDate ",endDate); */}
          {getdate && <Datepick startDate={startDate} endDate={endDate} />}
        </Col>
        <Col xs={8} sm={10} md={11} lg={10} xl={7} className="filterdata">
          {/* </Col> */}

          <FilterModal />
        </Col>
      </Row>
      <Row>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <div className="card-body" id="ch">
            {resultapiData.length > 0 && (
              <Chartda
                tabledata={resultapiData}
                selectedRowscheck={selectedRowscheck}
                selectedColumn={selectedColumn}
                slectColumnValue={selectrowvalue}
                selectedAllColumnData={selectedColumnValues}
              />
            )}
          </div>
        </Col>
      </Row>
      <Row>
        <div className="card-body-2">
          <Row gutter={16} style={{ height: "100%" }}>
            <Col xs={1} sm={1} md={1} lg={1} xl={1} style={{ height: "100%" }}>
              <Button
                type="link"
                size="small"
                style={{ fontSize: "18px", marginLeft: 6, marginTop: 6 }}
                onClick={handlePlusIconClick}
              >
                <PlusCircleTwoTone />
              </Button>
              <Button
                type="link"
                size="small"
                style={{ fontSize: "18px", marginLeft: 6, marginTop: 6 }}
                onClick={handleMaximizeToggle}
              >
                {isMaximized ? (
                  <FullscreenExitOutlined />
                ) : (
                  <FullscreenOutlined />
                )}
              </Button>
            </Col>
            <Col
              xs={23}
              sm={23}
              md={23}
              lg={23}
              xl={23}
              style={{ height: "100%" }}
              className="tableclass"
            >
              {/* <Table
                loading={loading}
                onChange={handleTableChange}
                rowSelection={{ ...rowSelection, columnWidth: "2%" }}
                columns={statecolumns}
                dataSource={statetableData}
                style={tableStyle}
                onScroll={handleScroll}
                rowKey="id"
                className="customCss custom-table"
                pagination={paginationConfig}
              /> */}
              <Table
                rowKey="id"
                onChange={handleTableChange}
                rowSelection={{ ...rowSelection, columnWidth: "2%" }}
                columns={statecolumns}
                style={tableStyle}
                dataSource={statetableData}
                loading={loading}
                bordered
                size="middle"
                scroll={{
                  x: `calc(300px + ${statecolumns.length * 5}%)`,
                }}
                onScroll={handleScroll}
                pagination={false}
                // pagination={paginationConfig}
              />
            </Col>
          </Row>
        </div>
      </Row>

      {showPopup && (
        <PopupComponent
          checkeddata={closePopup}
          selectedheading={selectedheadings}
          // passapidata={resultapiData}
          passapidata={test}
        />
      )}
    </>
  );
};

export default App;
