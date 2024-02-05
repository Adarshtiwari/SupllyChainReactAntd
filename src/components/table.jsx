import React, { useEffect, useState } from "react";
import "./assets/chart.css";
import Datepick from "./datepick";

// changes
import PopupComponent from "./PopupComponent"; //popup component

import { Table, Row, Col, Button, Select } from "antd";
import axios from "axios";
import Chartda from "./ChartData ";
import "./assets/table.css";
import {
  PlusCircleTwoTone,
  FullscreenOutlined,
  FullscreenExitOutlined,
  FilterFilled,
  ArrowDownOutlined,
} from "@ant-design/icons/lib/icons";
import { API_URL, BaseUrl, tableMapping } from "../Constant/constant";
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

  const [selectedColumnValues, setSelectedColumnValues]
   = useState({
    item:"item",
    customer:"customer",
    location:"location"
});

//filter model

const [filterModalVisible, setFilterModalVisible] = useState(false);

const showFilterModal = () => {
  setFilterModalVisible(true);
};

const closeFilterModal = () => {
  setFilterModalVisible(false);
};




//close filter model data


  // const [tablechardata,settablechardata]=useState([]);

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
  };

  //get Table Data  on select

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
      setSelectedRowscheck(selectedRows);
      setSelectedRowsKeyCheck(selectedRowKeys)
      //("resAPI ", setApiData(setSetfilterApiData));
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };

  const tableStyle = {
    backgroundColor: "#F9F9FC",
    height: "100%",
    marginBottom: 0,
    minHeight: '100%'
    
    // Set your desired background color
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

  const [isModalOpen, setIsModalOpen] = useState(false);

  // popup
  const [showPopup, setShowPopup] = useState(false);

  const handlePlusIconClick = () => {
    setselectedheadings([]);
    // console.log(selectedProductGroup,selectedLocation,selectedCustomerGroup)
    // Replace null values with corresponding values from columns array
    const columnsArray = ["item", "location", "customer"];

    const replaceNullValues = (value, index) =>
      value !== null ? value : columnsArray[index];

    const nonNullProductGroup = replaceNullValues(selectedProductGroup, 0);
    const nonNullLocation = replaceNullValues(selectedLocation, 1);
    const nonNullCustomerGroup = replaceNullValues(selectedCustomerGroup, 2);
    setSelectedProductGroup(nonNullProductGroup);
    setSelectedLocation(nonNullLocation);
    setSelectedCustomerGroup(nonNullCustomerGroup);
    setSelectrowValue([])
    let  newSelection=[]
   if(selectedKeys.length<=0)
   {
    
      newSelection = [
        columnsArray,
      ];
   }
   else{
     newSelection = [
      selectedKeys,
    ];
   }
    // Add the data to the selectedheadings array
   

    setselectedheadings([...selectedheadings, newSelection]);

    setShowPopup(true);
  };

  const closePopup = (keys) => {
    //("closeuo", keys);
    setSelectedColumn(keys);
    setSelectrowValue(keys);
    let temp={}
    keys.forEach((ele)=>{
      temp[ele]=ele
    })
    setSelectedColumnValues(temp)
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
    // call api to get update reocord
    setShowPopup(false);
  };
  //

  // ************** Get Table Data on Click***********
  const getColumnData = async (newValue, pre) => {
    setSelectedRowsKeyCheck([])
    //("new value0000", newValue, "old value ",pre,"current array  ", selectrowvalue);
 

    let updateColumnValue=selectrowvalue
    //("old array value ",updateColumnValue)

    updateColumnValue.forEach((ele, index) => {
      if (ele === pre) {
        updateColumnValue[index] = newValue;
      }
  });


    setSelectrowValue(updateColumnValue)
    setSelectedKeys(updateColumnValue)
    getFilterData("", "", "", updateColumnValue)
    //(" in the filter data ", selectrowvalue);
    
  };

  // ******* calling api to get filter data
  const getFilterData = async (item, location, cusotmer, arrayData) => {
    const selectedValuesArray = Object.values(selectedColumnValues);
    setLoading(true);
    setSelectedRowsKeyCheck([''])
    //("Current selected values:", selectedValuesArray);
    //("Adarsh Response  arrayData", arrayData.length);
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
        ",sqty,sdate,fdate,f_quantity_engine,f_quantity_user";
      console.log("filter URL Preapred", url);
      const response = await axios.get(url);
     
      //("Adarsh Response", response);
      setresultApiData(response.data.results);
      setSetfilterApiData(response.data.results);
      let column = await tableData(response.data.results, arrayData);
     
      setcolumns(column.precolumns);
      setStatetableData(column.tableData);
      setLoading(false);
    } else {
      const columnsArray = ["item", "location", "customer"];
      setMappingId("id");
      const replaceNullValues = (value, index) =>
        value !== null ? value : columnsArray[index];

      const nonNullProductGroup = replaceNullValues(item, 0);
      const nonNullLocation = replaceNullValues(location, 1);
      const nonNullCustomerGroup = replaceNullValues(cusotmer, 2);

      // console.log(
      //   "get url ",
      //   nonNullProductGroup + "," + nonNullLocation + "," + nonNullCustomerGroup
      // );
      let url =
        BaseUrl +
        "/?fields=" +
        "" +
        nonNullProductGroup +
        "," +
        nonNullLocation +
        "," +
        nonNullCustomerGroup +
        ",sqty,sdate,fdate,f_quantity_engine,f_quantity_user";
      //console.log("get url ", url);
      const response = await axios.get(url);
      setLoading(false);
      //console.log("get url response", response);
      let keys = [nonNullProductGroup, nonNullLocation, nonNullCustomerGroup];
      let column = await tableData(response.data.results, keys);
    
      setcolumns(column.precolumns);
      setStatetableData(column.tableData);
    }
  };

  //Api Data for Table
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://horizon-app.onrender.com/api/forecastmains/?fields=location,customer,item,sqty,sdate,fdate,f_quantity_engine,f_quantity_user"
          // "https://horizon-app.onrender.com/api/forecastmains/"
        );
       
        console.log("get first API CallData ", response.data.results);
        let column = await tableData(response.data.results, [
          "item",
          "customer",
          "location",
        ]);

        console.log("Table Data PrePared For First API Call ", column);
        setLoading(false);
        setcolumns(column.precolumns);
        setStatetableData(column.tableData);
        //console.log(" 100", statecolumns);
        //console.log(" 101", statetableData);

        //console.log(" the result data final,", response);
        setApiData(response.data);
        setresultApiData(response.data.results);
        // onChartData()
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  /*********** */

  //Created Table Column and Data for First Render
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
    //console.log("mydata orignal keys ", keys);
    precolumn = await createColumns(keys);
    //console.log("mydata orignal after call ", precolumn);
    //console.log("newArray", newArray);
    for (let i = 0; i < newArray.length; i++) {
      let temp = {
        title: newArray[i],
        dataIndex: newArray[i],
        width: 80,
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
        render: (text) => <a style={{color: "#4285F4", fontWeight: 400}}>{(text === null || text === undefined ? 0 : text)}</a>,
        className: "customDynamicColumn",
        // selected: selectedValue,
      };
      precolumn.push(temp);
    }

    //console.log("mydata orignal after array ", precolumn);

    /// creating the data for table
    //console.log("resultful APi ", resutlAPI);
    let tableData = await createtableData(resutlAPI, keys);
    //console.log(" all table data", tableData);
    let sentData = {
      precolumns: precolumn,
      tableData: tableData,
    };
    //console.log(" sent data ", sentData);
    return sentData;
  };

  const createtableData = (resutlAPI, keys) => {
    //console.log("keys ", keys);
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
      //console.log("combinationkey", combinationKey);
      if (tableData.has(combinationKey)) {
        let temp = tableData.get(combinationKey);
        let getdate = getDataFormate(ele.sdate);
        // //console.log("getdate ",getdate)
        // //console.log(" temp  ",temp)
        if (temp.hasOwnProperty(getdate)) {
          // //console.log("datasame ",temp.sdate)
          temp[getdate] += ele.sum_sqty;
        } else {
          temp[getdate] = ele.sum_sqty;
        }

        // //console.log("final temp for  ",ele.item , "is: ",temp)
        tableData.set(combinationKey, temp);
      } else {
        let getData = getDataFormate(ele.sdate);
        ele[getData] = ele.sum_sqty;
        // //console.log(" get data",getData)
        // //console.log(" crete for ",ele.item,"is ****", ele)
        tableData.set(combinationKey, ele);
      }
    });
    let arrayFromMap = Array.from(tableData.values());

    //console.log("1001 arraydata", arrayFromMap);
    return arrayFromMap;
  };

  const getColumnSubData = async (find) => {
    try {
      const response = await axios.get(
        "https://horizon-app.onrender.com/api/config"
      );
      console.log(" in subcolumn find value ", find);
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
        //console.log("mapping template", filterData);
        temp1 = {
          value: find,
          label: find,
        };
      }

      if (key == "") {
        //console.log(" key found  ", key);
        let columns = ["Item", "Location", "Customer"];
        for (let i = 0; i < columns.length; i++) {
          if (
            response.data.mapping_table_names[columns[i]].hasOwnProperty(find)
          ) {
          
            filterData = response.data.mapping_table_names[columns[i]];

            substring = find.slice(0, -1);
            temp1 = {
              value: columns[i],
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
      //console.log("subcloumns 9999", subColumns);
      return subColumns;
    } catch (error) {}
  };

  const createColumns = async (columns) => {
    let columnsValue = [];
    let precolumn = [];

    for (let i = 0; i < columns.length; i++) {
      //console.log("call for ", columns[i]);
      columnsValue.push(await getColumnSubData(columns[i]));
    }
    //console.log(" get subcolumn ", columnsValue);
    let setcolumnValue = selectrowvalue;
    for (let i = 0; i < columns.length; i++) {
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
                fontSize: '12px',
              }}
              style={{
                paddingLeft: "5px",
                background: "#F9F9FC",
                border: "none",
                width: "100%",
                borderRadius: "none",
                fontSize: '12px',

              }}
              className="fixedDropdownTable"
              variant="borderless"
              options={columnsValue[i]}
              // value={selectedValue}
            />
          );
        },
        dataIndex: columns[i],
        width: 100,
        fixed: "left",
        align: "left",
        // sorter: true,
        // sorter: {
        //   compare: (a, b) => a.location - b.location,
        //   multiple: 1,
        // },
        // ellipsis: true
      };

      //console.log(" pre");
      precolumn.push(temp);
    }
    
  
    //console.log("precolumn mydata ", precolumn);
    return precolumn;
  };

  const paginationConfig = {
    pageSize: 5,
  };

  /***************** */

  return (
    <>
      <Row style={{ paddingLeft: "15px" }}>
        {/* <Col xs={22} sm={22} md={22} lg={22} xl={22}> */}{" "}
        <Col xs={16} sm={14} md={24} lg={15} xl={16}>
          {" "}
          <Datepick />
        </Col>
        <Col xs={8} sm={10} md={24} lg={9} xl={8}>
          {/* </Col> */}
          
          <Button
            type="primary"
            icon={<FilterFilled />}
            style={{ fontSize: 13, borderRadius: 48, width: 80 }}
            onClick={showFilterModal}
          >
            Filter
          </Button>{" "}
          <Button
            type="text"
            icon={<i class="fa-solid fa-arrows-rotate"></i>}
            style={{ fontSize: 13 }}
          >
            Refresh Data
          </Button>
          <Button
            type="text"
            icon={<ArrowDownOutlined />}
            style={{ fontSize: 13 }}
          >
            Download Data
          </Button>
          <Button
            type="text"
            icon={<i class="fa-solid fa-ellipsis"></i>}
          ></Button>
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
            {console.log("******", selectedRowscheck)}
          </div>
        </Col>
      </Row>
      <Row>
        <div className="card-body-2">
          <Row gutter={16} style={{height: "100%" }}>
            <Col xs={1} sm={1} md={1} lg={1} xl={1} style={{height: "100%"}}>
              <Button
                type="link"
                size="small"
                style={{ fontSize: "18px", marginLeft: 6, marginTop: 6 }}
                // onClick={showModal}
                onClick={handlePlusIconClick}
              >
                <PlusCircleTwoTone />
              </Button>
              <Button
                type="link"
                size="small"
                style={{ fontSize: "18px", marginLeft: 6, marginTop: 6  }}
                onClick={handleMaximizeToggle}
              >
                {isMaximized ? (
                  <FullscreenExitOutlined />
                ) : (
                  <FullscreenOutlined />
                )}
              </Button>
            </Col>
            <Col xs={23} sm={23} md={23} lg={23} xl={23} style={{height: "100%",}}>
              <Table
                loading={loading}
                rowSelection={{
                  type: selectionType,
                  ...rowSelection,
                }}
                columns={statecolumns}
                // pagination={paginationConfig}
                dataSource={statetableData}
                style={tableStyle}
                // size="large" 
                scroll={{ x: 1500, y: 200 }}
                // rowKey="id"
                rowKey="id"
                pagination={false}
                className="customCss custom-table"
                // infinite
                // onInfinite={() => fetchData()}
                // hasMore={hasMore}
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

<FilterModal visible={filterModalVisible} onClose={closeFilterModal} />
   
    </>
  );
};
export default App;
