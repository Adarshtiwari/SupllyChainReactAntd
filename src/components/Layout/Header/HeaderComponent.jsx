import { React, useState } from "react";

import {
  Row,
  Col,
  Breadcrumb,
  Typography,
  Card,
  Input,
  Button,
  Avatar,
  Menu,
} from "antd";
import {
  AlignCenterOutlined,
  MenuOutlined,
  RiseOutlined,
  CalendarOutlined,
  BuildOutlined,
  SearchOutlined,
  InfoCircleOutlined,
  UserOutlined,
} from "@ant-design/icons/lib/icons";
import ai from "../../assets/img/ai.jpg";

import { Table } from "antd";
import { useEffect } from "react";
import "../../../css/header.css";
const { Text, Link } = Typography;
const { Search } = Input;

const HeaderComponent = (navClose) => {
  console.log("Header", navClose.navClose);
  const [colSpanbol, setColSpanBol] = useState(2);
  // setColSpanBol(navClose.navClose)
  const [colSpan, setColSpan] = useState(3);
  const [current, setCurrent] = useState("planning");
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  useEffect(() => {
    if (navClose.navClose) {
      console.log("Header set 2 ");
      setColSpan(2);
    } else {
      console.log("Header set 3 ");
      setColSpan(3);
    }
    console.log(" the set ", colSpan, navClose.navClose);
  }, [navClose]);

  const items = [
    {
      label: "Planning Overview",
      key: "planning",
      icon: <MenuOutlined />,
    },
    {
      label: "Portfolios",
      key: "portfolio",
      icon: (
        <div>
          <i class="fa-solid fa-suitcase"></i>
        </div>
      ),
    },
    {
      label: " Methods",
      key: "method",
      icon: <CalendarOutlined />,
    },
    {
      label: "Segments",
      key: "segment",
      icon: <AlignCenterOutlined />,
    },
    {
      label: "Performance",
      key: "performance",
      icon: <RiseOutlined />,
    },
    {
      label: "Posts",
      key: "post",
      icon: <BuildOutlined />,
    },
  ];

  return (
    <div>
      <Row
        style={{
          paddingLeft: "20px",
          paddingRight: "10px",
          // paddingTop: "12px",
        }}
      >
        <Col xs={24} sm={24} md={12} lg={14} xl={17}>
          <Breadcrumb
            style={{
              marginTop: "24px",
              fontSize: 14
            }}
          >
            <Breadcrumb.Item>Demand</Breadcrumb.Item>
            <Breadcrumb.Item className={"breadcrumbColor"}>Planning Overview</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
        <Col xs={24} sm={24} md={12} lg={10} xl={7} style={{marginTop:16}}>
          <Card
            style={{
              width: 330,
              height: 40,
              borderRadius: 49,
              paddingTop: "12px",
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 1px 4px"
            }}
            className="searchBar"
          >
            <Input
              placeholder="Search"
              prefix={<SearchOutlined style={{ color: "#4285F4" }} />}
              style={{
                background: "#F4F7FE",
                borderRadius: 49,
                width: 190,
                height: 28,
              }}
              variant="borderless"
            ></Input>
            <i
              class="fa-regular fa-bell  "
              style={{ color: "#A3AED0" , marginLeft:"8px" }}
            >

            </i>
            <i class="fa-solid fa-moon  " style={{ color: "#A3AED0", gap: 10 , marginLeft:"9px"}}></i>
            <InfoCircleOutlined style={{ fontSize: 16, color: "#A3AED0" ,  marginLeft:"9px"}} />
            <Avatar size={26} icon={<img src={ai}  />} 
            style={{  marginLeft:"10px", marginBottom: 6}}  />
   
          </Card>

          {/* <Card bordered={false} style={{ width: "98%" }} className="card"> */}
          {/* <Row className="headerCardRow" >
              <Col xs={18} sm={18} md={18} lg={18} xl={18}>
                <Input
                  placeholder="Search"
                  style={{
                    borderRadius: "30px",
                    marginLeft: "-24px",
                    width:"100%"
                    
                  
                  }}
                />
              </Col>
              <Col xs={6} sm={6} md={6} lg={6} xl={6}>
              <i class="fa-regular fa-bell headericon" style={{paddingLeft:"0px"}}></i>
                <i class="fa-solid fa-moon headericon" style={{}}></i>
                <i class="fa-solid fa-moon headericon" style={{}}></i>
              </Col>
            
           
            </Row> */}
          {/* <div className="inputSec">
               
                <input type="text" placeholder="search" />

                <i class="fa-regular fa-bell"></i>
                <i class="fa-solid fa-moon"></i>
                <i className="infosign">i</i>
                <div className="img_sec">
                  <img src={ai} alt="" />
                </div>
              </div> */}
          {/* </Card> */}
        </Col>
      </Row>

      <Menu
        mode="horizontal"
        onClick={onClick}
        selectedKeys={[current]}
        items={items}
        style={{ background: "#F9F9FC", color: "#7D8FB3", fontSize: 12 , height:56}}
      />
    </div>
  );
};

export default HeaderComponent;
