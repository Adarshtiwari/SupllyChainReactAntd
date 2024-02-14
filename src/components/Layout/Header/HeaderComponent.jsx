import { React, useState } from "react";
import {  Link } from 'react-router-dom';
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
import image from "../../assets/img/siren.png";
import image2 from "../../assets/img/icon2.png";
import image3 from "../../assets/img/inc_icon.png";
import { Table } from "antd";
import { useEffect } from "react";
import "../../../css/header.css";
import { noop } from "antd/es/_util/warning";
const { Text } = Typography;
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
      icon: (
        <Link to="/planning" className="menuitemicon">
          <MenuOutlined style={{ padding: 0 }} />
        </Link>
      ),
      className: "menuitemicon",
    },
    {
      label: "Portfolios",
      key: "portfolio",
      className: "menuitemicon",
      icon: (
        <Link to="/Portfolio" >
        <div>
          <i class="fa-solid fa-suitcase"></i>
        </div>
        </Link>
      ),
    },
    {
      label: " Methods",
      key: "method",
      icon: (<Link to="/method" > <CalendarOutlined /></Link>),
      className: "menuitemicon",
   
    },
    {
      label: "Segments",
      key: "segment",
      icon: (<Link to="/segment" > <AlignCenterOutlined /></Link>),
      className: "menuitemicon",
    },
    {
      label: "Performance",
      key: "performance",
      icon:(<Link to="/performace" >  <RiseOutlined /></Link>),
      className: "menuitemicon",
    },
    {
      label: "Posts",
      key: "post",
      icon: (<Link to="/post" > <BuildOutlined /></Link>),
      className: "menuitemicon",
    },
  ];

  return (
    <div
      className="mainHeaderDiv"
    >
      <div className="topSideNav" style={{ border: "none" }}>
        <div className="topFirstSec">
          <div className="pathSec">
            <Breadcrumb
              // style={{
              //   marginTop: "6%",
              //   fontSize: 14,
              // }}
              className="Breadcrumb"
            >
              <Breadcrumb.Item>Demand</Breadcrumb.Item>
              <Breadcrumb.Item className={"breadcrumbColor"}>
                Planning Overview
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className="inputSec">
            <input type="text" placeholder="search" />

            <i class="fa-regular fa-bell"></i>
            <i class="fa-solid fa-moon"></i>
            <i className="infosign">i</i>
            <div className="img_sec">
              <img src={ai} alt="" />
            </div>
          </div>
        </div>
        <div className="topSecondSec">
          <Menu
            mode="horizontal"
            onClick={onClick}
            selectedKeys={[current]}
            items={items}
            style={{ margin: 0 }}
            className="HeadermenuItem"
            // style={{ background: "#F9F9FC", color: "#7D8FB3", fontSize: 12 , height:40,}}
          />
        </div>

        {/* <Menu
        mode="horizontal"
        onClick={onClick}
        selectedKeys={[current]}
        items={items}
        style={{border:"none" ,height:"30px"}}
        
className="HeadermenuItem"
      />  */}
      </div>

      {/* <Menu
        mode="horizontal"
        onClick={onClick}
        selectedKeys={[current]}
        items={items}
        
style={{ background: "#F9F9FC", color: "#7D8FB3", fontSize: 12 , height:56,}}
      /> */}
    </div>
  );
};

export default HeaderComponent;
