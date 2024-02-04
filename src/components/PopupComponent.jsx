// PopupComponent.jsx

import React, { useState, useEffect } from 'react';
import './assets/PopupComponent.css';
import { tableMapping } from '../Constant/constant';
const columns = ["item", "location", "customer"];

const PopupComponent = ({ checkeddata, passapidata, selectedheading }) => {
  const [selectedKeys, setSelectedKeys] = useState([]);


useEffect(() => {
  // Check checkboxes based on the last array in selectedheading
  const lastArray = selectedheading[selectedheading.length - 1];

  passapidata=tableMapping
  console.log(" the APi Data ",passapidata)
  if (Array.isArray(lastArray)) {
    const keysToCheck = lastArray
      .flat(Infinity)
      .filter(value => typeof value === 'string');

    setSelectedKeys(keysToCheck);
  }
}, [selectedheading]);



  const getKeysByPrefix = (prefix) => {
    console.log(" the APi Data ")
    return Object.keys(passapidata.length > 0 ? passapidata[0] : {}).filter(key => key.startsWith(prefix));
  };
  

  const handleCheckboxChange = (key) => {
    setSelectedKeys((prevKeys) => {
      if (prevKeys.includes(key)) {
        return prevKeys.filter((k) => k !== key);
      } else {
        return [...prevKeys, key];
      }
    });
  };

  const handleSubmit = () => {
    checkeddata(selectedKeys); // Pass selectedKeys to the checkeddata function
  };

  const lattKeys = getKeysByPrefix("latt");
  const cattKeys = getKeysByPrefix("catt");


  return (
    <div className="popup">
      <table>
        <thead>
          <tr>
            {columns.map((header, index) => (
              <th key={index}>
                <div>{header}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {columns.map((header, index) => (
            <td key={index}>
              <div>
                <input
                  type="checkbox"
                  checked={selectedKeys.includes(header)}
                  onChange={() => handleCheckboxChange(header)}
                />
                {header}
              </div>
            </td>
          ))}
          {getKeysByPrefix("iatt").map((key, index) => (
            <tr key={index}>
              <td>
                <div>
                  <input
                    type="checkbox"
                    checked={selectedKeys.includes(key)}
                    onChange={() => handleCheckboxChange(key)}
                  />
                  {key}
                </div>
              </td>
              {lattKeys[index] && (
                <td>
                  <input
                    type="checkbox"
                    checked={selectedKeys.includes(lattKeys[index])}
                    onChange={() => handleCheckboxChange(lattKeys[index])}
                  />
                  {lattKeys[index]}
                </td>
              )}
              {cattKeys[index] && (
                <td>
                  <input
                    type="checkbox"
                    checked={selectedKeys.includes(cattKeys[index])}
                    onChange={() => handleCheckboxChange(cattKeys[index])}
                  />
                  {cattKeys[index]}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default PopupComponent;
