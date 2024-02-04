import React from 'react'
import "./assets/dashboard.css"
import { Row, Col, Breadcrumb, Typography } from "antd";
import {
  AlignCenterOutlined,
  MenuOutlined,
  RiseOutlined,
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined
} from "@ant-design/icons/lib/icons";
import ai from "./assets/img/ai.jpg";
import { Table } from 'antd';
const { Text, Link } = Typography;
const HeaderComponent = () => {

    const columns = [
        {
          title: <CustomHeaderColumn title="Column 1" />,
          dataIndex: 'column1',
          key: 'column1',
        },
        {
          title: <CustomHeaderColumn title="Column 2" />,
          dataIndex: 'column2',
          key: 'column2',
        },
        // Add more columns as needed
      ];
    
      const data = [
        { key: '1', column1: 'Value 1', column2: 'Value A' },
        { key: '2', column1: 'Value 2', column2: 'Value B' },
        // Add more data rows as needed
      ];
    


  return (
    <Table
    columns={columns}
    dataSource={data}
  />   
  )
}

const CustomHeaderColumn = ({ title }) => (
    <div style={{ fontWeight: 'bold', textAlign: 'center' }}>
      {title}
    </div>
  );
export default HeaderComponent