// /* global Chart */

// import React, { useState, useEffect } from 'react';
// import './assets/chart.css';
// import Chart from 'chart.js/auto'; // Import Chart.js library

// function ChartData({ tabledata,selectedRowscheck }) {
//   const [chartData, setChartData] = useState(null);
//   // const [checkpro, setcheckpro] = useState(null);
//   // const [checkloc, setcheckloc] = useState(null);
//   // const [checkcus, setcheckcus] = useState(null);

//  let checkpro=null;
//  let checkloc=null;
//  let checkcus=null;
//       if (selectedRowscheck) {
//         // Assuming there is only one key in the object
//         const firstKey = Object.keys(selectedRowscheck)[0];

//         if (firstKey) {
//           const selectedRow = selectedRowscheck[firstKey];

//           const selproValue = selectedRow.selpro;
//           const sellocValue = selectedRow.selloc;
//           const selcusValue = selectedRow.selcus;

//           checkpro=selproValue;
//           checkloc=sellocValue;
//           checkcus=selcusValue;

//           // Further logic using selproValue, sellocValue, selcusValue...
//         } else {
//           console.error("No key found in the object");
//         }
//       } else {
//         console.error("Object is null or undefined");
//       }

//       //console.log(checkpro,checkloc,checkcus)

//       const selectedItem=checkpro;
//       const selectedloc =checkloc;
//       const selectedcus=checkcus;

//   useEffect(() => {
//     let chart = null;

//     if (tabledata && tabledata.length > 0) {
//       // Filter and sort data for "sdate" and "fdate"
//       const sortedTableData = tabledata
//         .filter((item) => item.sdate !== null || item.fdate !== null)
//         .slice()
//         .sort((a, b) => {
//           const dateA = new Date(a.sdate !== null ? a.sdate : a.fdate);
//           const dateB = new Date(b.sdate !== null ? b.sdate : b.fdate);
//           return dateA - dateB;
//         });

//         // console.log(sortedTableData)
//         const filteredTableData = sortedTableData.filter(item =>
//           (selectedItem === null || item.item === selectedItem));

//         const filteredTableDataWithLocAndCus = filteredTableData.filter(item =>
//           (selectedloc === null || item.location === selectedloc) &&
//           (selectedcus === null || item.customer === selectedcus)
//         );

//         console.log(filteredTableDataWithLocAndCus);

//       const middleIndex = Math.floor(filteredTableDataWithLocAndCus.length / 2);

//       const labels = filteredTableDataWithLocAndCus.map((item) => formatDate(item.sdate !== null ? item.sdate : item.fdate));
//       const dataValuesSqty = filteredTableDataWithLocAndCus.map((item) => (item.sdate !== null ? item.sqty : null));
//       const dataValuesFQuantityEngine = filteredTableDataWithLocAndCus.map((item) => (item.fdate !== null ? item.f_quantity_engine : null));
//       const dataValuesFQuantityEngineUser = filteredTableDataWithLocAndCus.map((item) => (item.fdate !== null ? item.f_quantity_user : null));

//       const chartDataObject = {
//         labels: labels,
//         datasets: [
//           {
//             label: 'History',
//             data: dataValuesSqty,
//             backgroundColor: 'rgb(141, 115, 255)',
//             borderColor: 'rgb(141, 115, 255)',
//             borderWidth: 1,
//           },
//           {
//             label: 'Engine',
//             data: dataValuesFQuantityEngine,
//             backgroundColor: 'rgb(77,139,245)',
//             borderColor: 'rgb(77,139,245)',
//             borderWidth: 1,
//           },
//           {
//             label: 'Planer',
//             data: dataValuesFQuantityEngineUser,
//             type: 'line',
//             borderColor: 'rgb(237,125,49)',
//             backgroundColor: 'rgb(237,125,49)',
//             borderWidth: 2,
//             fill: false,
//             spanGaps: true,
//           },
//           {
//             label: 'Budget',
//             data: dataValuesSqty,
//             type: 'line',
//             borderColor: 'rgb(255, 219, 92)',
//             backgroundColor: 'rgb(255, 219, 92)',
//             borderWidth: 2,
//             fill: false,
//             spanGaps: true,
//           },

//         ],
//       };

//       setChartData(chartDataObject);

//       if (chart) {
//         chart.destroy();
//       }

//       const canvas = document.getElementById('chartstr');
//       const context = canvas.getContext('2d');
//       chart = new Chart(context, {
//         type: 'bar',
//         data: chartDataObject,
//         options: {
//           maintainAspectRatio: false,
//           responsive: true,
//           scales: {
//             y: {
//               beginAtZero: true,
//               stepSize: 1,
//               max: 4000,
//               title: {
//                 display: true,
//               },
//               ticks: {
//                 callback: function (value) {
//                   // Format ticks to display in K (thousands)
//                   return value;
//                 },
//               },
//             },
//             x: {
//               title: {
//                 display: true,
//               },
//               ticks: {
//                 maxRotation: 65,
//                 autoSkip: true,
//               },
//             },
//           },
//           plugins: {
//             legend: {
//               position: 'top',
//             },
//             annotation: {
//               annotations: [
//                 {
//                   type: 'line',
//                   mode: 'vertical',
//                   scaleID: 'x',
//                   value: middleIndex,
//                   borderColor: 'green',
//                   borderWidth: 2,

//                   label: {
//                     content: 'Middle Line',
//                     enabled: true,
//                     position: 'top',
//                   },
//                 },
//               ],
//             },
//           },
//           layout: {
//             padding: {
//               left: 10,
//               right: 10,
//               top: 10,
//               bottom: 10,
//             },
//           },
//           barPercentage: 0.5,
//           categoryPercentage: 0.5,
//         },
//       });
//     }

//     return () => {
//       if (chart) {
//         chart.destroy();
//       }
//     };
//   }, [tabledata]);

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const day = String(date.getDate()).padStart(2, '0');
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const year = date.getFullYear().toString().slice(-2);
//     return `${day}/${month}/${year}`;
//   };

//   return (
//     <div className="chartBox">
//       <canvas id="chartstr"></canvas>
//     </div>
//   );
// }

// export default ChartData;

/* global Chart */

import React, { useState, useEffect } from "react";
import "./assets/chart.css";
import Chart from "chart.js/auto"; // Import Chart.js library

function ChartData({ tabledata, selectedRowscheck, selectedColumn,slectColumnValue ,selectedAllColumnData}) {
  const [chartData, setChartData] = useState(null);
  const [selectedItem, setSelectedItem] = useState([]);
  const [selectedloc, setSelectedLoc] = useState([]);
  const [selectedcus, setSelectedCus] = useState([]);
  const [selectrowcount, setSelectrowcount] = useState(0);

  useEffect(() => {
    // selectedRowscheck=Object.values(selectedAllColumnData)
//console.log("selected valuec chartDa ",selectedAllColumnData,selectedRowscheck)

    if (selectedRowscheck.length > 0) {
    
      for (let i = 0; i < selectedRowscheck.length; i++) {
        let combinationKey = "";
        for (let j = 0; j < slectColumnValue.length; j++) {
        
          combinationKey += selectedRowscheck[i][slectColumnValue[j]]
        }

        let temp=[]
        if (selectedItem.indexOf(combinationKey) < 0) {
          temp=selectedItem;
          temp.push(combinationKey);
          
        } else {
          temp=selectedItem.filter(item=>item == combinationKey)    
        }
       
       
        //console.log("combination key prepare ",combinationKey)
        setSelectedItem(temp);
      }
    } else {
      console.error("Object is null or undefined");
      setSelectedItem([]);
      setSelectedLoc([]);
      setSelectedCus([]);
    }
  }, [selectedRowscheck,selectedAllColumnData]);

  // //console.log(selectedItem,selectedloc,selectedcus)
  useEffect(() => {
    let chart = null;

    // console.log(
    //   " chartDA 2222",
    //   "item",
    //   selectedItem,
    //   "location",
    //   selectedloc,
    //   "customer",
    //   selectedcus
    // );
    // console.log(" chartDA 3333", tabledata);

    if (tabledata && tabledata.length > 0) {
      const sortedTableData = tabledata
        .filter((item) => item.sdate !== null || item.fdate !== null)
        .slice()
        .sort((a, b) => {
          const dateA = new Date(a.sdate !== null ? a.sdate : a.fdate);
          const dateB = new Date(b.sdate !== null ? b.sdate : b.fdate);
          return dateA - dateB;
        });

      //console.log("chartDA 4444", sortedTableData);

    // custom logic for all type of data
    //console.log(" selected item  combination key",selectedItem )
    let filteredTableDataWithLocAndCus=[]
   if(selectedItem.length>0)
   {
    sortedTableData.forEach(element => {
      let compareCombinationKey=""
    
      for (let j = 0; j < slectColumnValue.length; j++) {
      
        compareCombinationKey += element[slectColumnValue[j]]
      }
      //console.log("row key: ",selectedItem[0],"compare with",compareCombinationKey)

      if(selectedItem.includes(compareCombinationKey))
      {
        filteredTableDataWithLocAndCus.push(element)
      }
    });
   }else{
filteredTableDataWithLocAndCus=sortedTableData
   }


      //console.log("chartDA 8888", filteredTableDataWithLocAndCus);

      const middleIndex = Math.floor(filteredTableDataWithLocAndCus.length / 2);

      const labels = filteredTableDataWithLocAndCus.map((item) =>
        formatDate(item.sdate !== null ? item.sdate : item.fdate)
      );
      const dataValuesSqty = filteredTableDataWithLocAndCus.map((item) =>
        item.sdate !== null ? item.sum_sqty : null
      );
      const dataValuesFQuantityEngine = filteredTableDataWithLocAndCus.map(
        (item) => (item.fdate !== null ? item.f_quantity_engine : null)
      );
      const dataValuesFQuantityEngineUser = filteredTableDataWithLocAndCus.map(
        (item) => (item.fdate !== null ? item.f_quantity_user : null)
      );

      //console.log(" dataValuesSqty",dataValuesSqty)
      const chartDataObject = {
        labels: labels,
        datasets: [
          {
            label: "History",
            data: dataValuesSqty,
            backgroundColor: "rgb(141, 115, 255)",
            borderColor: "rgb(141, 115, 255)",
            borderWidth: 1,
            type: "bar", // Add type property for bar chart
          },
          {
            label: "Engine",
            data: dataValuesFQuantityEngine,
            backgroundColor: "rgb(77,139,245)",
            borderColor: "rgb(77,139,245)",
            borderWidth: 1,
            type: "bar", // Add type property for bar chart
          },
          {
            label: "Planer",
            data: dataValuesFQuantityEngineUser,
            type: "line",
            borderColor: "rgb(237,125,49)",
            backgroundColor: "rgb(237,125,49)",
            borderWidth: 2,
            fill: false,
            spanGaps: true,
          },
          {
            label: "Budget",
            data: dataValuesSqty,
            type: "line",
            borderColor: "rgb(255, 219, 92)",
            backgroundColor: "rgb(255, 219, 92)",
            borderWidth: 2,
            fill: false,
            spanGaps: true,
          },
        ],
      };

      setChartData(chartDataObject);

      if (chart) {
        chart.destroy();
      }

      const canvas = document.getElementById("chartstr");
      const context = canvas.getContext("2d");

      let maxYValue =
        Math.max(
          Math.max(...dataValuesSqty, 0),
          Math.max(...dataValuesFQuantityEngine, 0),
          Math.max(...dataValuesFQuantityEngineUser, 0)
        ) + 500;
// maxYValue=2500
        //console.log(" the maximum value ",maxYValue, Math.max(...dataValuesSqty, 0),Math.max(...dataValuesFQuantityEngine, 0))
      chart = new Chart(context, {
        type: "bar",
        data: chartDataObject,
        options: {
          maintainAspectRatio: false,
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              stepSize: 1,
              max: maxYValue,
              title: {
                display: true,
              },
              ticks: {
                callback: function (value) {
                  // Format ticks to display in K (thousands)
                  return value;
                },
              },
            },
            x: {
              title: {
                display: true,
              },
              ticks: {
                maxRotation: 65,
                autoSkip: true,
              },
              stacked: true,
            },
          },
          plugins: {
            legend: {
              position: "top",
              labels:{
                pointStyle: 'rectRounded',
                usePointStyle: true,
                pointStyleWidth: 70,
                borderRadius: 20,
                useBorderRadius: true,
              },
              align: "end"

            },
            annotation: {
              annotations: [
                {
                  type: "line",
                  mode: "vertical",
                  scaleID: "x",
                  value: middleIndex,
                  borderColor: "green",
                  borderWidth: 2,

                  label: {
                    content: "Middle Line",
                    enabled: true,
                    position: "top",
                  },
                },
              ],
            },
          },
          layout: {
            padding: {
              left: 5,
              right: 10,
              top: 10,
              bottom: 10,
            },
          },
          barPercentage: 0.5,
          categoryPercentage: 0.5,
        },
      });
    }

    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, [tabledata, selectedItem, selectedRowscheck]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="chartBox">
      <canvas id="chartstr"></canvas>
    </div>
  );
}

export default ChartData;
