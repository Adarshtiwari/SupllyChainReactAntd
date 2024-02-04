import React, { useState } from "react";
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
import firsticon from "../assets/img/siren.png";

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
  width: 35,
  height: 35,
  boxShadow: "rgba(0, 0, 0, 0.24) 0px 1px 4px",
  paddingLeft: 8,
  marginBottom: 10,
};
const BaseLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: "100vh",
        background: "#F9F9FC",
      }}
    >
      <Sider
        width={65}
        style={{
          background: "#F9F9FC",
          borderRight: "1px solid #ddd",
        }}
        theme="light"
      >
        <Menu
          mode="vertical"
          defaultSelectedKeys={["1"]}
          style={{ background: "#F9F9FC" }}
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
              marginTop: 55,
            }}
          />
        </Menu>
        <Menu
          mode="vertical"
          defaultSelectedKeys={["1"]}
          style={{
            marginTop: 80,
            color: "#C3CAD9",
            background: "#F9F9FC",
            marginLeft: 10,
          }}
        >
          <Menu.Item
            key="1"
            icon={
              <div>
                <i class="fa-solid fa-house "></i>
              </div>
            }
            style={menuItemStyle}
          />
          <Menu.Item
            key="2"
            icon={
              <div>
                <i class="fa-solid fa-sack-dollar "></i>
              </div>
            }
            style={menuItemStyle}
          />
          <Menu.Item
            key="3"
            icon={
              <div>
                <i class="fa-solid fa-magnifying-glass"></i>
              </div>
            }
            style={menuItemStyle}
          />
          <Menu.Item
            key="4"
            icon={
              <div>
                <i class="fa-solid fa-earth-americas "></i>
              </div>
            }
            style={menuItemStyle}
          />
          <Menu.Item
            key="5"
            icon={
              <div>
                <i class="fa-solid fa-chart-simple"></i>
              </div>
            }
            style={menuItemStyle}
          />
          <Menu.Item
            key="6"
            icon={
              <div>
                <i class="fa-solid fa-truck"></i>
              </div>
            }
            style={menuItemStyle}
          />
        </Menu>
        <Menu
          mode="vertical"
          style={{
            marginTop: 40,
            marginLeft: 6,
            color: "#C3CAD9",
            background: "#F9F9FC",
          }}
        >
          <Menu.Item
            key="1"
            icon={
              <div>
                <i class="fa-regular fa-calendar-days"></i>
              </div>
            }
          />
          <Menu.Item
            key="2"
            icon={
              <div>
                <i class="fa-solid fa-video"></i>
              </div>
            }
          />
          <Menu.Item
            key="3"
            icon={
              <div>
                <i class="fa-regular fa-file-lines"></i>
              </div>
            }
          />
          <Menu.Item
            key="4"
            icon={
              <div>
                <i class="fa-solid fa-gear"></i>
              </div>
            }
          />
        </Menu>
      </Sider>
      <Layout style={{ height: "100%", background: "#F9F9FC" }}>
        <Header
          style={{
            padding: 0,
            background: "#F9F9FC",
            height: 104,
            borderBottom: "1px solid #ddd",
          }}
        >
          <HeaderComponent navClose={collapsed} />
        </Header>
        <Content
          style={{
            paddingTop: "15px",
            margin: "5px",
            // marginTop:"40px"
          }}
        >
          {/* <div
            style={{
            //   padding: 24,
              minHeight: "100%",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            Bill is a cat.
          </div> */}

          <Table />
        </Content>
      </Layout>
    </Layout>
  );
};
export default BaseLayout;
