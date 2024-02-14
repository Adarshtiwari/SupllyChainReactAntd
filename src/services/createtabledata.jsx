const axios = require("axios");

const fetchColumn = async (type,keys) => {
  try {
    const responseColumn = await axios.get(
      "https://horizon-app.onrender.com/api/dates/?page=1&page_size=100"
    );
    const responseTable = await axios.get(
      "https://horizon-app.onrender.com/api/forecastmains/?fields=item%2Clocation%2Ccustomer&page=1&page_size=20"
    );
    // console.log("response ",responseColumn.data.results)
    const originalArray = responseColumn.data.results;
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

    // console.log("data",resultObject)
   const sortedConverToStringUniqueArrayValue=  await  sortedConverToStringUniqueArray(finalResultObject,type)

   const createFilterColummsValue=await createFilterColumms(keys)
   console.log("createFilterColummsValue ",createFilterColummsValue)
  
  } catch (error) {}
};

function sortedConverToStringUniqueArray(resultObject, type) {

  //sorted Days
  const sortedDates = resultObject
    .map((item) =>
    item[type[0]] !== null ? new Date(item[type[0]]) : new Date(item[type[1]])
    )
    .filter((date) => !isNaN(date)) // Filter out invalid dates
    .sort((a, b) => a - b);

  

  //Formated Days in String
  const sortedStringDate = [];
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
    sortedStringDate.push(element);
  });

  console.log("sortedStringDate ",sortedStringDate)
  //create unique Sorted String Dates
  sortedStringDate = [...new Set(sortedStringDate)];

return sortedStringDate

}

const createFilterColumms = async (columns) => {
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
    };


    precolumn.push(temp);
  }

  return precolumn;
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

fetchColumn(["sdate", "fdate"],[
  "item",
  "customer",
  "location",
]);

// export const fetchData = async (pageNumber) => {
//     try {
//       const promises = [];
//       setLoading(true);
//       console.log(
//         pageNumber,
//         `https://horizon-app.onrender.com/api/forecastmains/?ordering=item,location,customer,sdate,fdate,f_quantity_engine,f_quantity_user&page_size=900&page=${pageNumber}&fields=sqty,sdate,sdate,fdate,f_quantity_engine,f_quantity_user
//         }`
//       );
//       const response = await axios.get(`https://horizon-app.onrender.com/api/forecastmains/?fields=item,customer,location,sdate,fdate,f_quantity_engine,f_quantity_user&ordering=item,customer,location,sdate`);

//       // const response = await axios.get("https://horizon-app.onrender.com/api/forecastmains/?ordering=item,location,customer,sdate,fdate&page_size=900");
//       // const { data } = await response.json();

//       console.log(" the response ", response);
//       setTotalItems(response.data.count);
//       let column = await tableData(response.data.results, [
//         "item",
//         "customer",
//         "location",
//       ]);

//       if (startDate != null) {
//         setTimeout(() => {
//           SetgetDate(true);
//           console.log("hello");
//         }, 2000);
//       }
//       console.log(
//         " table data aagya,",
//         column.tableData,
//         "set data",
//         statetableData
//       );
//       setApiData(response.data);
//       setresultApiData(response.data.results);

//       const newRows = column.tableData;
//       const prevIds = new Set(statetableData.map((row) => row.id));

//       // Filter out rows with IDs already present in the previous data
//       const filteredNewRows = newRows.filter((row) => !prevIds.has(row.id));

//       // Combine the filtered new data with the previous data
//       const updatedData = [...statetableData, ...filteredNewRows];

//       // setStatetableData((prevData) => [...prevData, ...updatedData]);
//       setStatetableData(updatedData);

//       const updatecolumn = column.precolumns.map((col, index) => ({
//         ...col,
//         width: calculateColumnWidth(col.dataIndex || col.title),
//       }));
//       console.log(
//         " columns *********",
//         column.precolumns,
//         "adarsh ---",
//         updatecolumn
//       );
//       setcolumns(updatecolumn);
//       settoatlwidth(updatecolumn.length)
//       setdynamicColumns(updatecolumn);
//       setPagination((prevPagination) => ({
//         ...prevPagination,
//         total: column.tableData.length,
//       }));
//       setLoading(false);
//      setTimeout(() => {
//       console.log(" toatl settoatlwidth  ",totalwidth)
//      }, 2000);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };
//   //

//   const tableData = async (resutlAPI, keys) => {
//     const sortedDates = resutlAPI
//       .map((item) =>
//         item.sdate !== null ? new Date(item.sdate) : new Date(item.sdate)
//       )
//       .filter((date) => !isNaN(date)) // Filter out invalid dates
//       .sort((a, b) => a - b);
//     console.log(" Table Data function call *** ");
//     let newArray = [];
//     sortedDates.forEach((element) => {
//       const dateObject = new Date(element);
//       let inputDate = element;
//       const day = inputDate.getDate();
//       const month = inputDate.getMonth() + 1; // Months are zero-based, so we add 1
//       const year = inputDate.getFullYear().toString().slice(-2); // Extract last two digits of the year

//       // Pad single-digit day and month with leading zeros if needed
//       const formattedDay = day < 10 ? `0${day}` : day;
//       const formattedMonth = month < 10 ? `0${month}` : month;

//       // Construct the final formatted date string
//       const formattedDateString = `${formattedDay}/${formattedMonth}/${year}`;
//       //console.log("formattedDateString", formattedDateString);
//       element = formattedDateString;
//       //console.log("element", element);
//       newArray.push(element);
//     });

//     let precolumn = [];

//     precolumn = await createColumns(keys);
//     //console.log("mydata orignal after call ", precolumn);
//     //console.log("newArray", newArray);

//     for (let i = 0; i < newArray.length; i++) {
//       if (i == 0) {
//         setTimeout(() => {
//           SetgetDate(true);
//           SetstartDate(newArray[i]);
//         }, 2000);
//       }
//       if (i == newArray.length - 1) {
//         setTimeout(() => {
//           SetgetDate(true);
//           SetendtDate(newArray[i]);
//         }, 2000);
//       }
//       let temp = {
//         title: newArray[i],
//         dataIndex: newArray[i],
//         width: 5,
//         // ellipsis:true,
//         sorter: (a, b) => {
//           // Handle null or undefined values appropriately
//           const aValue =
//             a[newArray[i]] === null || a[newArray[i]] === undefined
//               ? 0
//               : a[newArray[i]];
//           const bValue =
//             b[newArray[i]] === null || b[newArray[i]] === undefined
//               ? 0
//               : b[newArray[i]];

//           return aValue - bValue;
//         },
//         render: (text) => (
//           <a style={{ color: "#4285F4", fontWeight: 480 }}>
//             {text === null || text === undefined ? 0 : text}
//           </a>
//         ),
//         className: "customDynamicColumn",
//         // selected: selectedValue,
//       };
//       precolumn.push(temp);
//     }

//     //console.log("mydata orignal after array ", precolumn);

//     /// creating the data for table
//     //console.log("resultful APi ", resutlAPI);
//     let tableData = await createtableData(resutlAPI, keys);
//     //console.log(" all table data", tableData);
//     let sentData = {
//       precolumns: precolumn,
//       tableData: tableData,
//     };

//     return sentData;
//   };

//   const createtableData = (resutlAPI, keys) => {
//     console.log("create table Data Call ", keys);

//     let tableData = new Map();
//     resutlAPI.forEach((ele) => {
//       let combinationKey = "";
//       for (let i = 0; i < keys.length; i++) {
//         if (i == keys.length - 1) {
//           combinationKey += ele[keys[i]];
//         } else {
//           combinationKey += ele[keys[i]] + "-";
//         }
//       }
//       //console.log("combinationkey", combinationKey);
//       if (tableData.has(combinationKey)) {
//         let temp = tableData.get(combinationKey);
//         let getdate=""
//         if(ele.data!=null)
//         {
//           getdate = getDataFormate(ele.sdate);
//           console.log("getdate  *******",ele.sdate)
//         }
//         else{
//           getdate = getDataFormate(ele.fdate);
//         }

//         // //console.log(" temp  ",temp)
//         if (temp.hasOwnProperty(getdate)) {
//           // //console.log("datasame ",temp.sdate)
//           if(ele.data!=null)
//           {
//             temp[getdate] += ele.sum_sqty;
//           }else{
//             temp[getdate] += ele.sum_fqty;
//           }
//         }

//         else {

//           if(ele.data!=null)
//           {
//             temp[getdate] = ele.sum_sqty;
//           }else{
//             temp[getdate] = ele.sum_fqty;
//           }

//         }

//         // //console.log("final temp for  ",ele.item , "is: ",temp)
//         tableData.set(combinationKey, temp);
//       } else {
//         let getData
//         if(ele.sdate!=null)
//         {
//           getData = getDataFormate(ele.sdate);
//           ele[getData] = ele.sum_sqty;

//         }
//         else{
//           getData = getDataFormate(ele.fdate);
//             ele[getData] = ele.sum_fqty;
//         }
//         // let getData = getDataFormate(ele.sdate);
//         // console.log("getdate  *******",ele.sdate)
//         // ele[getData] = ele.sum_sqty;

//         tableData.set(combinationKey, ele);
//       }
//     });
//     let arrayFromMap = Array.from(tableData.values());

//     console.log("1001 arraydata", arrayFromMap);
//     return arrayFromMap;
//   };

//   const getColumnSubData = async (find) => {
//     try {
//       console.log(" getColumnSubData function call *** ", find);
//       const response = await axios.get(
//         "https://horizon-app.onrender.com/api/config"
//       );
//       console.log(
//         " in subcolumn find value ",
//         find,
//         " get Data Response From Config File",
//         response
//       );
//       let subColumns = [];
//       let temp1;
//       let substring = "";
//       let key = "";
//       if (find == "item") {
//         substring = "iatt";
//         key = "Item";
//       }
//       if (find == "customer") {
//         substring = "catt";
//         key = "Customer";
//       }
//       if (find == "location") {
//         substring = "latt";
//         key = "Location";
//       }
//       let filterData;
//       if (key != "") {
//         filterData = response.data.mapping_table_names[key];
//         //console.log("mapping template", filterData);
//         temp1 = {
//           value: find.charAt(0).toLowerCase() + find.slice(1),
//           label: find,
//         };
//       }

//       if (key == "") {
//         //console.log(" key found  ", key);
//         let columns = ["Item", "Location", "Customer"];
//         for (let i = 0; i < columns.length; i++) {
//           if (
//             response.data.mapping_table_names[columns[i]].hasOwnProperty(find)
//           ) {
//             filterData = response.data.mapping_table_names[columns[i]];

//             substring = find.slice(0, -1);
//             temp1 = {
//               value: columns[i].charAt(0).toLowerCase() + columns[i].slice(1),
//               label: columns[i],
//             };
//             break;
//           }
//         }
//       }

//       subColumns.push(temp1);
//       for (const keys in filterData) {
//         if (keys.startsWith(substring)) {
//           let temp = {
//             value: keys,
//             label: filterData[keys],
//           };
//           subColumns.push(temp);
//         }
//       }
//       //console.log("subcloumns 9999", subColumns);
//       return subColumns;
//     } catch (error) {}
//   };

//   // const [state, setState]=({ columnWidth: 300})
//   // const []=(10)

//   const createColumns = async (columns) => {
//     let columnsValue = [];
//     let precolumn = [];

//     console.log(" createColumns function call *** ");
//     for (let i = 0; i < columns.length; i++) {
//       //console.log("call for ", columns[i]);
//       columnsValue.push(await getColumnSubData(columns[i]));
//     }
//     console.log("  getColumnSubData function call 1111 ", columnsValue);
//     let setcolumnValue = selectrowvalue;
//     for (let i = 0; i < columns.length; i++) {
//       const getWidth = getWidthData(columns[i]);
//       if (setcolumnValue.length > 0) {
//         if (setcolumnValue.includes(columns[i])) {
//           setcolumnValue = setcolumnValue.filter((item) => item == columns[i]);
//         } else {
//           setcolumnValue.push(columns[i]);
//         }
//       } else {
//         setcolumnValue.push(columns[i]);
//       }
//       let temp = {
//         title: () => {

//           // <Tooltip title={columns[i]}>
//           return (
//             <Select
//               defaultValue={columns[i]}
//               suffixIcon={<i class="fa-solid fa-caret-down"></i>}
//               onChange={(e) => {
//                 getColumnData(e, columns[i]);
//               }}
//               dropdownStyle={{
//                 maxHeight: "200px",
//                 maxWidth: "180px", // Set your desired height
//                 minWidth: "150px",
//                 overflowY: "auto",
//                 fontSize: "5px",
//               }}
//               style={{
//                 paddingLeft: "5px",
//                 background: "#F9F9FC",
//                 border: "none",
//                 width: "100%",
//                 borderRadius: "none",
//                 fontSize: "12px",
//               }}
//               className="fixedDropdownTable"
//               variant="borderless"
//               options={columnsValue[i]}

//               // value={columnsValue[i]}
//             />
//           );
//           {/* </Tooltip> */}
//         },
//         dataIndex: columns[i],
//         width: getWidth,
//         // fixed: "left",
//         // align: "left",

//         // sorter: true,
//         // sorter: {
//         //   compare: (a, b) => a.location - b.location,
//         //   multiple: 1,
//         // },
//         // ellipsis: true
//       };
//       console.log("  getColumnSubData function call 2222 ", columnsValue);
//       //console.log(" pre");
//       precolumn.push(temp);
//     }

//     //console.log("precolumn mydata ", precolumn);
//     return precolumn;
//   };
