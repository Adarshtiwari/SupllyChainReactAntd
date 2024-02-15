

function formatDate(date) {
    const options = { year: '2-digit', month: '2-digit', day: '2-digit' };
    return new Date(date).toLocaleDateString('en-US', options);
  }

  function convertToISOString(inputDate) {
    // Parse the input date string in the format "DD/MM/YY"
    const parts = inputDate.split('/');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Months are zero-based in JavaScript
    const year = 2000 + parseInt(parts[2], 10); // Assuming the year is in the range 2000-2099
  
    // Create a Date object
    const dateObject = new Date(year, month, day);
  
    // Format the date as "YYYY-MM-DDTHH:mm:ssZ"
    const isoString = dateObject.toISOString();
  
    return isoString;
  }
  
// rowData, columnData,type,keys
 export const createChartData=(rowData, columnData,type,keys)=>{

    const updatedRowData = rowData.map((item) => {
        // If sweek is null, convert fweek to the desired format
        if (!item.sweek && item.fweek) {
          item.fweek = formatDate(item.fweek);
        }
      
        // If sweek is not null, convert it to the desired format
        if (item.sweek) {
          item.sweek = formatDate(item.sweek);
        }
      
        return item;
      });
const chartYAxis=[
"f_quantity_engine",
 "f_quantity_user",
]
rowData=updatedRowData

let chartData=[]
columnData.forEach(element => {
 let flag=true
    rowData.forEach(ele=>{
        // console.log(" rowData ",ele.hasOwnProperty(element.title), "Row Value ",ele, "column value  ",element.title,)
       if( (ele[type[0]]!=null? ele[type[0]]==element.title:false )|| (ele[type[1]]!=null?  ele[type[1]]==element.title:false ))
       {let temp={}
       flag=false
        keys.forEach(keyele => {
            temp[keyele]=ele[keyele]
        });
        chartYAxis.forEach(yaxis=>{
            temp[yaxis]=ele[yaxis]
        })
     
        temp.sum_sqty=(ele.sum_sqty!=null? ele.sum_sqty:ele.sum_fqty)
        temp[type[0]]=convertToISOString(element.title)
      
        chartData.push(temp)
       }
       else{
        let temp={}
       flag=false
        keys.forEach(keyele => {
            temp[keyele]=ele[keyele]
        });
        chartYAxis.forEach(yaxis=>{
            temp[yaxis]=0
        })
     
        temp.sum_sqty=0
        temp[type[0]]=convertToISOString(element.title)
      
        chartData.push(temp)
       }
      
    })

   
});
return chartData
}


// const   rowData=[
  
//     {
//         "item": "63710019",
//         "location": "20424",
//         "customer": "514046",
//         "sweek": "2022-10-01T00:00:00Z",
//         "fweek": null,
//         "id": 608679,
//         "sum_sqty": null,
//         "sum_fqty": 30,
//         "sum_f_quantity_user": 30,
//         "sum_f_quantity_user_new": null,
//         "sum_f_quantity_user_disc": null
//     },
//     {
//         "item": "63710019",
//         "location": "20424",
//         "customer": "514046",
//         "sweek": null,
//         "fweek": "2024-01-21T18:30:00Z",
//         "id": 608680,
//         "sum_sqty": null,
//         "sum_fqty": 22,
//         "sum_f_quantity_user": 22,
//         "sum_f_quantity_user_new": null,
//         "sum_f_quantity_user_disc": null
//     },
//     {
//         "item": "63710019",
//         "location": "20424",
//         "customer": "514046",
//         "sweek": null,
//         "fweek": "2024-01-28T18:30:00Z",
//         "id": 608681,
//         "sum_sqty": null,
//         "sum_fqty": 30,
//         "sum_f_quantity_user": 30,
//         "sum_f_quantity_user_new": null,
//         "sum_f_quantity_user_disc": null
//     },
//     {
//         "item": "63710019",
//         "location": "20424",
//         "customer": "514046",
//         "sweek": null,
//         "fweek": "2024-02-04T18:30:00Z",
//         "id": 608682,
//         "sum_sqty": null,
//         "sum_fqty": 35,
//         "sum_f_quantity_user": 35,
//         "sum_f_quantity_user_new": null,
//         "sum_f_quantity_user_disc": null
//     },
//     {
//         "item": "63710019",
//         "location": "20424",
//         "customer": "514046",
//         "sweek": null,
//         "fweek": "2024-02-11T18:30:00Z",
//         "id": 608683,
//         "sum_sqty": null,
//         "sum_fqty": 41,
//         "sum_f_quantity_user": 41,
//         "sum_f_quantity_user_new": null,
//         "sum_f_quantity_user_disc": null
//     },
//     {
//         "item": "63710019",
//         "location": "20424",
//         "customer": "514046",
//         "sweek": null,
//         "fweek": "2024-02-18T18:30:00Z",
//         "id": 608684,
//         "sum_sqty": null,
//         "sum_fqty": 32,
//         "sum_f_quantity_user": 32,
//         "sum_f_quantity_user_new": null,
//         "sum_f_quantity_user_disc": null
//     },
//     {
//         "item": "63710019",
//         "location": "20424",
//         "customer": "514046",
//         "sweek": null,
//         "fweek": "2024-02-25T18:30:00Z",
//         "id": 608685,
//         "sum_sqty": null,
//         "sum_fqty": 31,
//         "sum_f_quantity_user": 31,
//         "sum_f_quantity_user_new": null,
//         "sum_f_quantity_user_disc": null
//     },
//     {
//         "item": "63710019",
//         "location": "20424",
//         "customer": "514046",
//         "sweek": null,
//         "fweek": "2024-03-03T18:30:00Z",
//         "id": 608686,
//         "sum_sqty": null,
//         "sum_fqty": 36,
//         "sum_f_quantity_user": 36,
//         "sum_f_quantity_user_new": null,
//         "sum_f_quantity_user_disc": null
//     },
//     {
//         "item": "63710019",
//         "location": "20424",
//         "customer": "514046",
//         "sweek": null,
//         "fweek": "2024-03-10T18:30:00Z",
//         "id": 608687,
//         "sum_sqty": null,
//         "sum_fqty": 42,
//         "sum_f_quantity_user": 42,
//         "sum_f_quantity_user_new": null,
//         "sum_f_quantity_user_disc": null
//     },
//     {
//         "item": "63710019",
//         "location": "20424",
//         "customer": "514046",
//         "sweek": null,
//         "fweek": "2024-03-17T18:30:00Z",
//         "id": 608688,
//         "sum_sqty": null,
//         "sum_fqty": 39,
//         "sum_f_quantity_user": 39,
//         "sum_f_quantity_user_new": null,
//         "sum_f_quantity_user_disc": null
//     },
//     {
//         "item": "63710019",
//         "location": "20424",
//         "customer": "514046",
//         "sweek": null,
//         "fweek": "2024-03-24T18:30:00Z",
//         "id": 608689,
//         "sum_sqty": null,
//         "sum_fqty": 36,
//         "sum_f_quantity_user": 36,
//         "sum_f_quantity_user_new": null,
//         "sum_f_quantity_user_disc": null
//     },
//     {
//         "item": "63710019",
//         "location": "20424",
//         "customer": "514046",
//         "sweek": null,
//         "fweek": "2024-03-31T18:30:00Z",
//         "id": 608690,
//         "sum_sqty": null,
//         "sum_fqty": 38,
//         "sum_f_quantity_user": 38,
//         "sum_f_quantity_user_new": null,
//         "sum_f_quantity_user_disc": null
//     },
//     {
//         "item": "63710019",
//         "location": "20424",
//         "customer": "514046",
//         "sweek": null,
//         "fweek": "2024-04-07T18:30:00Z",
//         "id": 608691,
//         "sum_sqty": null,
//         "sum_fqty": 31,
//         "sum_f_quantity_user": 31,
//         "sum_f_quantity_user_new": null,
//         "sum_f_quantity_user_disc": null
//     },
//     {
//         "item": "63710019",
//         "location": "20424",
//         "customer": "514046",
//         "sweek": null,
//         "fweek": "2024-04-14T18:30:00Z",
//         "id": 608692,
//         "sum_sqty": null,
//         "sum_fqty": 33,
//         "sum_f_quantity_user": 33,
//         "sum_f_quantity_user_new": null,
//         "sum_f_quantity_user_disc": null
//     },
//     {
//         "item": "63710019",
//         "location": "20424",
//         "customer": "514046",
//         "sweek": null,
//         "fweek": "2024-04-21T18:30:00Z",
//         "id": 608693,
//         "sum_sqty": null,
//         "sum_fqty": 35,
//         "sum_f_quantity_user": 35,
//         "sum_f_quantity_user_new": null,
//         "sum_f_quantity_user_disc": null
//     },
//     {
//         "item": "63710019",
//         "location": "20424",
//         "customer": "514046",
//         "sweek": null,
//         "fweek": "2024-04-28T18:30:00Z",
//         "id": 608694,
//         "sum_sqty": null,
//         "sum_fqty": 45,
//         "sum_f_quantity_user": 45,
//         "sum_f_quantity_user_new": null,
//         "sum_f_quantity_user_disc": null
//     },
//     {
//         "item": "63710019",
//         "location": "20424",
//         "customer": "514046",
//         "sweek": null,
//         "fweek": "2024-05-05T18:30:00Z",
//         "id": 608695,
//         "sum_sqty": null,
//         "sum_fqty": 42,
//         "sum_f_quantity_user": 42,
//         "sum_f_quantity_user_new": null,
//         "sum_f_quantity_user_disc": null
//     },
//     {
//         "item": "63710019",
//         "location": "20424",
//         "customer": "514046",
//         "sweek": null,
//         "fweek": "2024-05-12T18:30:00Z",
//         "id": 608696,
//         "sum_sqty": null,
//         "sum_fqty": 39,
//         "sum_f_quantity_user": 39,
//         "sum_f_quantity_user_new": null,
//         "sum_f_quantity_user_disc": null
//     },
//     {
//         "item": "63710019",
//         "location": "20424",
//         "customer": "514046",
//         "sweek": null,
//         "fweek": "2024-05-19T18:30:00Z",
//         "id": 608697,
//         "sum_sqty": null,
//         "sum_fqty": 28,
//         "sum_f_quantity_user": 28,
//         "sum_f_quantity_user_new": null,
//         "sum_f_quantity_user_disc": null
//     }
// ]
// const columnData=[
//     {
//         "title": "10/01/22",
//         "dataIndex": "10/01/22",
//         "width": "5px",
//         "className": "customDynamicColumn"
//     },
//     {
//         "title": "17/01/22",
//         "dataIndex": "17/01/22",
//         "width": "5px",
//         "className": "customDynamicColumn"
//     },
//     {
//         "title": "24/01/22",
//         "dataIndex": "24/01/22",
//         "width": "5px",
//         "className": "customDynamicColumn"
//     },
//     {
//         "title": "31/01/22",
//         "dataIndex": "31/01/22",
//         "width": "5px",
//         "className": "customDynamicColumn"
//     },
//     {
//         "title": "07/02/22",
//         "dataIndex": "07/02/22",
//         "width": "5px",
//         "className": "customDynamicColumn"
//     },
//     {
//         "title": "14/02/22",
//         "dataIndex": "14/02/22",
//         "width": "5px",
//         "className": "customDynamicColumn"
//     },
//     {
//         "title": "21/02/22",
//         "dataIndex": "21/02/22",
//         "width": "5px",
//         "className": "customDynamicColumn"
//     },
//     {
//         "title": "28/02/22",
//         "dataIndex": "28/02/22",
//         "width": "5px",
//         "className": "customDynamicColumn"
//     },
//     {
//         "title": "07/03/22",
//         "dataIndex": "07/03/22",
//         "width": "5px",
//         "className": "customDynamicColumn"
//     },
//     {
//         "title": "14/03/22",
//         "dataIndex": "14/03/22",
//         "width": "5px",
//         "className": "customDynamicColumn"
//     },
//     {
//         "title": "21/03/22",
//         "dataIndex": "21/03/22",
//         "width": "5px",
//         "className": "customDynamicColumn"
//     },
//     {
//         "title": "28/03/22",
//         "dataIndex": "28/03/22",
//         "width": "5px",
//         "className": "customDynamicColumn"
//     },
//     {
//         "title": "04/04/22",
//         "dataIndex": "04/04/22",
//         "width": "5px",
//         "className": "customDynamicColumn"
//     },
//     {
//         "title": "11/04/22",
//         "dataIndex": "11/04/22",
//         "width": "5px",
//         "className": "customDynamicColumn"
//     },
//     {
//         "title": "18/04/22",
//         "dataIndex": "18/04/22",
//         "width": "5px",
//         "className": "customDynamicColumn"
//     },
//     {
//         "title": "25/04/22",
//         "dataIndex": "25/04/22",
//         "width": "5px",
//         "className": "customDynamicColumn"
//     },
//     {
//         "title": "02/05/22",
//         "dataIndex": "02/05/22",
//         "width": "5px",
//         "className": "customDynamicColumn"
//     },
//     {
//         "title": "09/05/22",
//         "dataIndex": "09/05/22",
//         "width": "5px",
//         "className": "customDynamicColumn"
//     },
//     {
//         "title": "16/05/22",
//         "dataIndex": "16/05/22",
//         "width": "5px",
//         "className": "customDynamicColumn"
//     },
//     {
//         "title": "23/05/22",
//         "dataIndex": "23/05/22",
//         "width": "5px",
//         "className": "customDynamicColumn"
//     },
//     {
//         "title": "30/05/22",
//         "dataIndex": "30/05/22",
//         "width": "5px",
//         "className": "customDynamicColumn"
//     },
//     {
//         "title": "06/06/22",
//         "dataIndex": "06/06/22",
//         "width": "5px",
//         "className": "customDynamicColumn"
//     },
//     {
//         "title": "13/06/22",
//         "dataIndex": "13/06/22",
//         "width": "5px",
//         "className": "customDynamicColumn"
//     }
// ]

//   // Iterate through the array and update sweek and fweek properties
//   const updatedRowData = rowData.map((item) => {
//     // If sweek is null, convert fweek to the desired format
//     if (!item.sweek && item.fweek) {
//       item.fweek = formatDate(item.fweek);
//     }
  
//     // If sweek is not null, convert it to the desired format
//     if (item.sweek) {
//       item.sweek = formatDate(item.sweek);
//     }
  
//     return item;
//   });
// //   console.log("updtated row ",updatedRowData)
// createChartData(updatedRowData,columnData,["sweek", "fweek"],["item", "customer", "location"]);