import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import "./assets/chart.css";
import Datepick from "./datepick";

import PopupComponent from "./PopupComponent"; //popup component

import {
  Table,
  Row,
  Col,
  Button,
  Select,
  Input,
  Form,
} from "antd";
import axios from "axios";
import Chartda from "./ChartData ";
import "./assets/table.css";
import {
  PlusCircleTwoTone,
  FullscreenOutlined,
  FullscreenExitOutlined,
} from "@ant-design/icons/lib/icons";
import {
  BaseUrl,
  keys,
} from "../Constant/constant";
import { test } from "../Constant/constant";
import FilterModal from "./FilterModal";
import { createChartData } from "./utils/createChartData";


//editable table
const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);

  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  const handleCellClick = () => {
    if (editable) {
      toggleEdit();
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={handleCellClick}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};
//editable table close

const App = () => {
  const [resultapiData, setresultApiData] = useState([]);
  const [selectedProductGroup, setSelectedProductGroup] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedCustomerGroup, setSelectedCustomerGroup] = useState(null);
  const [isMaximized, setIsMaximized] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState(keys);
  const [selectedheadings, setselectedheadings] = useState([]);
  const [statecolumns, setcolumns] = useState([]);
  let [statetableData, setStatetableData] = useState([]);
  const [selectedRowscheck, setSelectedRowscheck] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedColumn, setSelectedColumn] = useState([]);
  const [selectrowvalue, setSelectrowValue] = useState([]);
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
  const [page, setPage] = useState(1);
  const [load,setLoad] = useState(true);
  //testing
  const [type, setType] = useState(["sweek", "fweek"]);
  const tableRef = useRef(null);
  const getWidthData = (colvalue) => {
    colvalue = colvalue.charAt(0).toLowerCase() + colvalue.slice(1);
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
      // console.log(" iatt lenght ", 300 / colvalue.length);
      return `${300 / colvalue.length}%`;
    } else {
      return `${100 / colvalue.length}%`;
    }
  };
  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  //filter model
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 200, // Adjust the page size as needed
    total: 0,
  });

  const fetchData = async (pageNumber, type,calling=false) => {
    try {
      console.log(" type in fetch Data ", type, "page size ", page);
      setLoad(true)
      if(!calling)
      {
        setLoading(true);
      }
      let query = "";

      for (let i = 0; i < selectedKeys.length; i++) {
    
          query += selectedKeys[i] + ",";
       
      }
      //column Data
      const responseColumnData = await axios.get(
        `https://horizon-app.onrender.com/api/dates/?page=1&page_size=1200`
      );

      console.log(
        "table Url Calling ",
        `https://horizon-app.onrender.com/api/forecastmains/?fields=${query}${type[0]},${type[1]}&page=${page}&page_size=300`
      );
      const responseTableData = await axios.get(
        `https://horizon-app.onrender.com/api/forecastmains/?fields=${query}${type[0]},${type[1]}&page=${page}&page_size=300`
      );


    // console.log(" responseTableData ",responseTableData)

      setPage((prevPage) => prevPage + 1);

      const getValidFormateofColumnValue = await getValidFormateofColumn(
        responseColumnData.data.results,
        type
      );

      let Keys = keys;
      let column = await tableData(
        responseTableData.data.results,
        getValidFormateofColumnValue,
        Keys,
        type
      );

      console.log("  column data ", column.dateColumn);

      console.log(" table data ,", column.tableData);

      const charTableData = await createChartData(
        responseTableData.data.results,
        column.dateColumn,
        type,
        Keys
      );
      console.log("chartTable  ", charTableData);

      setresultApiData(charTableData);


      setType(type);
      const newRows = column.tableData;
      const prevIds = new Set(statetableData.map((row) => row.id));

      // Filter out rows with IDs already present in the previous data
      const filteredNewRows = newRows.filter((row) => !prevIds.has(row.id));

      // Combine the filtered new data with the previous data
      const updatedData = [...statetableData, ...filteredNewRows];

      // setStatetableData((prevData) => [...prevData, ...updatedData]);
      //console.log(" final Data for Table *****",updatedData)
      setStatetableData(updatedData);

      const updatecolumn = column.precolumn.map((col, index) => ({
        ...col,
        width: calculateColumnWidth(col.dataIndex || col.title),
      }));
      //console.log(" final Data for Table  column *****",updatecolumn)
      setcolumns(updatecolumn);
      setPagination((prevPagination) => ({
        ...prevPagination,
        total: column.tableData.length,
      }));
      //console.log(" get ChartTable Data")
      setLoading(false);
      setLoad(false)
      return true;
    } catch (error) {
      console.error("Error fetching data:", error);
      return false;
    }
  };

  const getValidFormateofColumn = async (originalArray, type) => {
    const resultObject1 = originalArray.map((obj) => {
      // Use Object.entries to get an array of [key, value] pairs
      const filteredEntries = Object.entries(obj).filter(
        ([key]) => key === type[0]
      );

      // Convert the filtered entries back to an object
      return Object.fromEntries(filteredEntries);
    });

    const resultObject2 = originalArray.map((obj) => {
      // Use Object.entries to get an array of [key, value] pairs
      const filteredEntries = Object.entries(obj).filter(
        ([key]) => key === type[1]
      );

      // Convert the filtered entries back to an object
      return Object.fromEntries(filteredEntries);
    });

    const nonNUllresultObject1 = resultObject1.filter(
      (obj) => Object.keys(obj).length !== 0
    );
    const nonNUllResultObject2 = resultObject2.filter(
      (obj) => Object.keys(obj).length !== 0
    );

    const finalResultObject = [
      ...nonNUllresultObject1,
      ...nonNUllResultObject2,
    ];
    return finalResultObject;
  };

  //get Table Data  on select

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      // console.log(
      //   `selectedRowKeys: ${selectedRowKeys}`,
      //   "selectedRows: ",
      //   selectedRows
      // );
      setSelectedRowscheck(selectedRows);
      setSelectedRowKeys(selectedRowKeys);
      //console.log(" row slected Call ");
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
    // overflowY: "auto",
  };
  // changes
  const handleMaximizeToggle = () => {
    setIsMaximized((prevIsMaximized) => !prevIsMaximized);
    // console.log("isMaximized", isMaximized);
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
    //console.log(" row Plus Button Click *** ");

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
    //console.log(" selected Keys ",selectedKeys)
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
    //console.log("POP CLosed ********** ",keys);
    setSelectedColumn(keys);
    setSelectrowValue(keys);
    setSelectedKeys(keys);
    let temp = {};
    keys.forEach((ele) => {
      temp[ele] = ele;
    });
    setSelectedColumnValues(temp);
    setStatetableData([])
    getFilterData(keys);
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

    // setSelectedKeys(filteredKeys);

    setShowPopup(false);
  };

  // ************** Get Table Data on Click***********
  const getColumnData = async (newValue, pre) => {
    // console.log(
    //   " In the Get Columns ********  new value->",
    //   newValue,
    //   " old value-> ",
    //   pre,
    //   "  current Column Array->  ",
    //   selectrowvalue
    // );

    let updateColumnValue = selectrowvalue;

    updateColumnValue.forEach((ele, index) => {
      if (ele === pre) {
        updateColumnValue[index] = newValue;
      }
    });

    setSelectrowValue(updateColumnValue);
    setSelectedKeys(updateColumnValue);
    //console.log("Updated Column Array->  ", updateColumnValue);
    setStatetableData([])


    getFilterData(updateColumnValue);
  };

  const getFilterData = async ( arrayData,calling=false) => {
    const selectedValuesArray = Object.values(selectedColumnValues);

    setLoad(true)
    let pagenum=1
    if(!calling)
    { console.log(" value in calling ",calling)
    setPage(1)
    statetableData=[]
    setStatetableData([])
    setLoading(true);
    }
    if(calling)
    {
      pagenum=page+1
      setPage((prevPage) => prevPage + 1);
      console.log("page number ",pagenum)
    }
    
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
        `,${type[0]},${type[1]}&page=${pagenum}&page_size=700`;

      console.log("filter URL Preapred", url);
      const response = await axios.get(url);

     
     
     
      const responseColumnData = await axios.get(
        `https://horizon-app.onrender.com/api/dates/?page=1&page_size=1200`
      );

      //console.log(" filter table row data ",response.data.results," type  ",type)
      const getValidFormateofColumnValue = await getValidFormateofColumn(
        responseColumnData.data.results,
        type
      );

      await setTimeout(() => {
        setSelectedRowKeys([]);

        setSelectedRowscheck([]);
      }, 2000);

      let column = await tableData(
        response.data.results,
        getValidFormateofColumnValue,
        arrayData,
        type
      );
      console.log("filter TableData function after ",column);

      const charTableData = createChartData(
        column.tableData,
        column.dateColumn,
        type,
        arrayData
      );
      //console.log("chartTable  filter ",charTableData)
      // setresultApiData(responseTableData.data.results);
      setresultApiData(charTableData);

      setType(type);
      console.log(" the value of tabe ",statetableData.length)
      const newRows = column.tableData;
      const prevIds = new Set(statetableData.map((row) => row.id));

      // Filter out rows with IDs already present in the previous data
      const filteredNewRows = newRows.filter((row) => !prevIds.has(row.id));

      // Combine the filtered new data with the previous data
      const updatedData = [...statetableData, ...filteredNewRows];

      // setStatetableData((prevData) => [...prevData, ...updatedData]);
      setStatetableData(updatedData);

      const updatecolumn = column.precolumn.map((col, index) => ({
        ...col,
        width: calculateColumnWidth(col.dataIndex || col.title),
      }));

      setcolumns(updatecolumn);
   

      setPagination((prevPagination) => ({
        ...prevPagination,
        total: column.tableData.length,
      }));
      //console.log(" get ChartTable Data filter")
      setLoading(false);
      setLoad(false)
    }
  };

  //Api Data for Table
  useEffect(() => {
    // getFilterData(pagination.current, ["sweek", "fweek"]);
    setStatetableData([])
    getFilterData(selectedKeys)
  }, []);

  useEffect(()=>{
    console.log("selected keys call")
    setStatetableData([])
    setStatetableData(statetableData.length=0);
  },[selectedKeys])
  /*********** */

  const tableData = async (
    responseTableData,
    responseColumnData,
    keys,
    type
  ) => {
    const responseColumnDatavalue = sortedConverToStringUniqueArray(
      responseColumnData,
      type
    );

    let precolumn = await createColumns(keys);

    //Start Date and EnD Date
    setTimeout(() => {
      SetstartDate(responseColumnDatavalue[0]);
      SetendtDate(responseColumnDatavalue[responseColumnDatavalue.length - 1]);
      SetgetDate(true);
    }, 2000);

    let dateColumn = [];
    for (let i = 0; i < responseColumnDatavalue.length; i++) {
      let temp = {
        title: responseColumnDatavalue[i],
        dataIndex: responseColumnDatavalue[i],
        width: "5px",
        editable: true,

        sorter: (a, b) => {
          // Handle null or undefined values appropriately
          const aValue =
            a[responseColumnDatavalue[i]] === null ||
            a[responseColumnDatavalue[i]] === undefined
              ? 0
              : a[responseColumnDatavalue[i]];
          const bValue =
            b[responseColumnDatavalue[i]] === null ||
            b[responseColumnDatavalue[i]] === undefined
              ? 0
              : b[responseColumnDatavalue[i]];

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
      dateColumn.push(temp);
      precolumn.push(temp);
    }

    let tableData = await createtableData(responseTableData, keys, type);
    //console.log(" table data createtableData",tableData)
    return {
      precolumn: precolumn,
      tableData: tableData,
      dateColumn: dateColumn,
    };
  };

  function sortedConverToStringUniqueArray(resultObject, type) {
    //sorted Days
    const sortedDates = resultObject
      .map((item) =>
        item[type[0]] !== null
          ? new Date(item[type[0]])
          : new Date(item[type[1]])
      )
      .filter((date) => !isNaN(date)) // Filter out invalid dates
      .sort((a, b) => a - b);

    //Formated Days in String
    let sortedStringDate = [];
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
      ////console.log("formattedDateString", formattedDateString);
      element = formattedDateString;
      ////console.log("element", element);
      sortedStringDate.push(element);
    });

    //create unique Sorted String Dates
    sortedStringDate = [...new Set(sortedStringDate)];

    return sortedStringDate;
  }

  function DDMMYY(inputDateString) {
    const dateObject = new Date(inputDateString);

    const formattedDate = dateObject.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
    return formattedDate;
  }

  const createtableData = (results, keys, type) => {
    //
    // console.group("createtableData ", results, type);
    let finalRowData = [];

    results.forEach((elementrow) => {
      let temp = elementrow.combination;
      temp.id = elementrow.id;
      elementrow.data.forEach((element) => {
        let date =
          element[type[0]] != null ? element[type[0]] : element[type[1]];
        let skipCount = 0;
        for (const key in element.aggregates) {
          if (skipCount < 2) {
            skipCount++;

            temp[DDMMYY(date)] =
              element[type[0]] != null
                ? element.aggregates.sum_sqty
                : element.aggregates.sum_fqty;
            continue;
          } else {
            temp[key] = element.aggregates[key];
          }
        }
      });

      finalRowData.push(temp);
    });

    //console.log("createtableData finalRowData  ",finalRowData)
    // console.groupEnd("createtableData finalRowData  ", finalRowData);
    return finalRowData;
  };

  const getColumnSubData = async (find) => {
    try {
      const response = await axios.get(
        "https://horizon-app.onrender.com/api/config"
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
        // fixed: "left",
      };

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
    //console.log(" table change  ", pagination);
    if (pagination.current !== currentPage) {
      fetchData(pagination.current);
      setCurrentPage(pagination.current);
    }
  };
  const calculateColumnWidth = async (name) => {
    return await getWidthData(name);
  };

  function handleDataTypeChange(dataFromChild) {
    // Do something with the data received from the child
    //console.log("Data from child:", dataFromChild);
    fetchData(pagination.current, dataFromChild);
  }

  const handleScroll = async () => {
    const tableDiv = tableRef.current;
    // console.log(" loading value ",loading, " tableDiv.scrollTop= ",
    //  tableDiv.scrollTop,"  tableDiv.clientHeight= ",tableDiv.clientHeight,"  tableDiv.scrollHeight=",tableDiv.scrollHeight)
    if (
      tableDiv.scrollTop + tableDiv.clientHeight >=
      tableDiv.scrollHeight - 20
    ) {
      // console.log(" loading value ", loading);

      if (!load) {
        console.log(" on scrolling ");
        await  getFilterData(selectedKeys,true)
        // let data = await fetchData(pagination.current, type,true);
      }
    }
  };

  const handleSave = (row) => {
    const newData = [...statetableData];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setStatetableData(newData);
  };
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = statecolumns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });
  /***************** */

  return (
    <>
      <Row gutter={0}>
        {/* <Col xs={22} sm={22} md={22} lg={22} xl={22}> */}{" "}
        <Col
          xs={16}
          sm={14}
          md={13}
          lg={13}
          xl={16}
          style={{ paddingLeft: "12px" }}
        >
          {/* {" "} */}
          {/* console.log("start date ",startDate, "endDate ",endDate); */}
          {getdate && (
            <Datepick
              startDate={startDate}
              endDate={endDate}
              onDataFromChild={handleDataTypeChange}
            />
          )}
        </Col>
        <Col xs={8} sm={10} md={11} lg={9} xl={8} className="filterdata">
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
                type={type}
              />
            )}
          </div>
        </Col>
      </Row>
      <Row>
      <div className={`card-body-2${isMaximized?'maximized':""}` }
          style={{ overflowY: "auto", overflowX: "auto" }}
          onScroll={handleScroll}
          ref={tableRef}
        >
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
            <Col xs={23} sm={23} md={23} lg={23} xl={23} className="tableclass">
              <Table
                rowKey="id"
                onChange={handleTableChange}
                components={components}
                rowClassName={() => "editable-row"}
                rowSelection={{ ...rowSelection, columnWidth: "2%" }}
                columns={columns}
                style={tableStyle}
                dataSource={statetableData}
                loading={loading}
                bordered
                // scroll={{
                //   scrollToFirstRowOnChange: false,
                //   x: `calc(700px + ${statecolumns.length * 5}%)`,
                //   y: 500
                // }}

                pagination={false}
              />

              {/* <Table
                rowKey="id"
                onChange={handleTableChange}
                components={components}
                rowClassName={() => 'editable-row'}
                rowSelection={{ ...rowSelection, columnWidth: "2%" }}
                columns={columns}
                style={tableStyle}
                dataSource={statetableData}
                loading={loading}
                bordered
                scroll={{
                  scrollToFirstRowOnChange: false,
                  x: `calc(700px + ${statecolumns.length * 5}%)`,
                  y: 500
                }}
            
              
                pagination={false}
              /> */}
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
