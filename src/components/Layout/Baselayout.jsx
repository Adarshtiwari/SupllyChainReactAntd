import React, { useEffect, useState } from "react";
import image from "../assets/img/siren.png";
import image2 from "../assets/img/icon2.png";
import image3 from "../assets/img/inc_icon.png";
import ai from "../assets/img/ai.jpg";
import {
  DesktopOutlined,
  FileOutlined,
  HomeOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import HeaderComponent from "./Header/HeaderComponent";
import Table from "../table";
import "../../css/sidebar.css";
import "../../css/baselayout.css";
import firsticon from "../assets/img/siren.png";
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Portfolio from "../baseComponent/Portfolio";
import Methods from "../baseComponent/Methods";
import Segments from "../baseComponent/Segments";
import Performance from "../baseComponent/Performance";
import Posts from "../baseComponent/Posts";

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem(
    "",
    "9",
    <div
      className="icon"
      style={{
        margin: "5px",
        borderRadiusLG: "50%",
        padding: "0px",
        backgroundColor: "#fff",
        boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
      }}
    >
      <i
        class="fa-solid fa-house"
        style={{
          color: "#a3b3b8;",
          cursor: "pointer",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "20px",
          borderRadius: "50%",
          width: "5px",
          height: "5px",
          backgroundColor: "#fff",
        }}
      ></i>
    </div>
  ),
  getItem(
    "",
    "9",
    <div
      className="icon"
      style={{
        margin: "5px",
        marginTop: "25px",
        borderRadiusLG: "50%",
        padding: "0px",
        backgroundColor: "#fff",
        boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
      }}
    >
      <i
        class="fa-solid fa-sack-dollar"
        style={{
          color: "#a3b3b8;",
          cursor: "pointer",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "20px",
          borderRadius: "50%",
          width: "5px",
          height: "5px",
          backgroundColor: "#fff",
        }}
      ></i>
    </div>
  ),
  getItem(
    "",
    "9",
    <div
      className="icon"
      style={{
        margin: "5px",
        marginTop: "25px",
        borderRadiusLG: "50%",
        padding: "0px",
        backgroundColor: "#fff",
        boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
      }}
    >
      <img
        src={image2}
        alt=""
        style={{
          width: "40px",
          filter:
            "invert(8%) sepia(8%) saturate(8%) hue-rotate(100deg) brightness(1%) contrast(20%)",
        }}
      />
    </div>
  ),
  getItem(
    "",
    "9",
    <div
      className="icon"
      style={{
        margin: "5px",
        marginTop: "25px",
        borderRadiusLG: "50%",
        padding: "0px",
        backgroundColor: "#fff",
        boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
      }}
    >
      <img
        src={image3}
        alt=""
        style={{
          width: "40px",
          filter:
            "invert(8%) sepia(8%) saturate(8%) hue-rotate(100deg) brightness(1%) contrast(20%)",
        }}
      />
    </div>
  ),
  getItem(
    "",
    "9",
    <div
      className="icon"
      style={{
        margin: "5px",
        marginTop: "25px",
        borderRadiusLG: "50%",
        padding: "0px",
        backgroundColor: "#fff",
        boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
      }}
    >
      <i
        class="fa-solid fa-earth-americas"
        style={{
          color: "#a3b3b8;",
          cursor: "pointer",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "20px",
          borderRadius: "50%",
          width: "5px",
          height: "5px",
          backgroundColor: "#fff",
        }}
      ></i>
    </div>
  ),
  getItem(
    "",
    "9",
    <div
      className="icon"
      style={{
        margin: "5px",
        marginTop: "25px",
        borderRadiusLG: "50%",
        padding: "0px",
        backgroundColor: "#fff",
        boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
      }}
    >
      <i
        class="fa-solid fa-chart-simple"
        style={{
          color: "#a3b3b8;",
          cursor: "pointer",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "20px",
          borderRadius: "50%",
          width: "5px",
          height: "5px",
          backgroundColor: "#fff",
        }}
      ></i>
    </div>
  ),
  getItem(
    "",
    "9",
    <div
      className="icon"
      style={{
        margin: "5px",
        height: "20px",
        marginTop: "25px",
        borderRadiusLG: "50%",
        padding: "0px",
        backgroundColor: "#fff",
        boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
      }}
    >
      <i
        class="fa-solid fa-truck"
        style={{
          color: "#a3b3b8;",

          cursor: "pointer",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "20px",
          borderRadius: "50%",
          width: "5px",
          height: "20px",
          backgroundColor: "#fff",
        }}
      ></i>
    </div>
  ),
];

const menuItemStyle = {
  background: "#ffffff",
  borderRadius: 40,
  // width: 36,
  // height: 36,
  // boxShadow: "rgba(0, 0, 0, 0.24) 0px 1px 4px",
  // paddingLeft: 6,
  // marginBottom: 10,
};

const BaseLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    console.log(" base loyout call ");
  }, []);

  const smallScreenStyle = {
    fontSize: "14px",
    backgroundColor: "red",
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Router>
    <Layout
      style={{
        minHeight: "100vh",
        background: "#F9F9FC",
      }}
    >
      <Sider
        width={65}
        className="mainsidebar"
        style={{
          background: "#F9F9FC",
          // borderRight: "1px solid #ddd",
          // overflowY:"auto"
        }}
        theme="light"
      >
        <Menu
          mode="vertical"
          defaultSelectedKeys={["1"]}
          style={{
            background: "#F9F9FC",
            marginTop: "1%",
            position: "fixed",
            width: 60,
            border: "none",
          }}
          className="sidbarMenu"
        >
          <Menu.Item
            key="1"
            icon={
              <div className="img_show">
                <img src={firsticon} alt="" />
                <hr />
              </div>
            }
            style={{
              background: "#4254F9",
              borderRadius: 54,
              width: 40,
              height: 40,
              marginLeft: 10,
              paddingLeft: 10,
              marginTop: 30,
            }}
          />
        </Menu>
        <Menu
          mode="vertical"
          defaultSelectedKeys={["1"]}
          className="secondmenu"
        >
          <Menu.Item
            key="1"
            icon={
              <div>
                <i
                  class="fa-solid fa-house fa-xl"
                  style={{ marginLeft: 1, width: 10 }}
                ></i>
              </div>
            }
            style={{ menuItemStyle }}
            className="menuItemStylemainmiddle"
          />
          <Menu.Item
            key="2"
            icon={
              <div>
                <i
                  class="fa-solid fa-sack-dollar fa-xl"
                  style={{ marginLeft: 1, width: 10 }}
                ></i>
              </div>
            }
            className="menuItemStylemainmiddle"
          />
          <Menu.Item
            key="3"
            icon={
              <div>
                <i
                  class="fa-solid fa-magnifying-glass fa-xl"
                  style={{ marginLeft: 1, width: 10 }}
                ></i>
              </div>
            }
            className="menuItemStylemainmiddle"
          />
          <Menu.Item
            key="4"
            icon={
              <div>
                <i
                  class="fa-solid fa-earth-americas fa-xl"
                  style={{ marginLeft: 1, width: 10 }}
                ></i>
              </div>
            }
            className="menuItemStylemainmiddle"
          />
          <Menu.Item
            key="5"
            icon={
              <div>
                <i
                  class="fa-solid fa-chart-simple fa-xl"
                  style={{ marginLeft: 1, width: 10 }}
                ></i>
              </div>
            }
            className="menuItemStylemainmiddle"
          />
          <Menu.Item
            key="6"
            icon={
              <div>
                <i
                  class="fa-solid fa-truck fa-xl"
                  style={{ marginLeft: 1, width: 10 }}
                ></i>
              </div>
            }
            className="menuItemStylemainmiddle"
          />
        </Menu>
        <Menu mode="vertical" className="lastmenu">
          <Menu.Item
            key="1"
            icon={
              <div>
                <i
                  class="fa-regular fa-calendar-days fa-xl"
                  style={{ marginLeft: 2, width: 10 }}
                ></i>
              </div>
            }
            className="lastmenuitem"
          />
          <Menu.Item
            key="2"
            icon={
              <div>
                <i
                  class="fa-solid fa-video fa-xl"
                  style={{ marginLeft: 2,width: 10}}
                ></i>
              </div>
            }
            className="lastmenuitem"
          />
          <Menu.Item
            key="3"
            icon={
              <div>
                <i
                  class="fa-regular fa-file-lines fa-xl"
                  style={{ marginLeft: 2, width: 0 }}
                ></i>
              </div>
            }
            className="lastmenuitem"
          />
          <Menu.Item
            key="4"
            icon={
              <div>
                <i
                  class="fa-solid fa-gear fa-xl"
                  style={{ paddingRight: 0, marginLeft: 2, width: 0 }}
                ></i>
              </div>
            }
            className="lastmenuitem"
          />
        </Menu>
      </Sider>

      <Layout style={{ height: "100%", background: "#F9F9FC", }}>
        <Header
          className="headerclass"
        >
          <HeaderComponent navClose={collapsed} />
        </Header>
        <Content
         className="content"
        >
          <Routes>
             <Route path="/planning" element={<Table />} />
             <Route path="/portfolio" element={<Portfolio />} />
             <Route path="/method" element={<Methods />} />
             <Route path="/segment" element={<Segments />} />
             <Route path="/performace" element={<Performance />} />
             <Route path="/post" element={<Posts />} />
             </Routes>

{/* Define additional routes for other components */}
{/* Example: */}
{/* <Route path="/dashboard" component={} /> */}
{/* <Table/> */}
         
        </Content>
      </Layout>
    </Layout>
       </Router>
  );
};
export default BaseLayout;
