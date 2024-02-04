import React, { useState } from "react";
import "./assets/dashboard.css";
import Datepick from "./datepick";
import { Row, Col, Breadcrumb, Typography, Menu, theme, Layout } from "antd";
import {
  AlignCenterOutlined,
  MenuOutlined,
  RiseOutlined,
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons/lib/icons";

// import Chart from './chart';
import Table from "./table";

import image from "./assets/img/siren.png";
import image2 from "./assets/img/icon2.png";
import image3 from "./assets/img/inc_icon.png";
import ai from "./assets/img/ai.jpg";
const { Text, Link } = Typography;

// import PopupComponent from './PopupComponent';  //popup component

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faExpand, faCompress } from '@fortawesome/free-solid-svg-icons';

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
  getItem("Option 1", "1", <PieChartOutlined />),
  getItem("Option 2", "2", <DesktopOutlined />),
  getItem("User", "sub1", <UserOutlined />, [
    getItem("Tom", "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),
  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Files", "9", <FileOutlined />),
];

function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [selectedOption, setSelectedOption] = useState("");
  // const [tablechardata,settablechardata]=useState([]);

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
  };

  return (
    <>
      {/* <h1>Dashboard</h1> */}
      <div className="mainDahbordSec">
        <div className="leftSideNav">
          {/* <div className="first_icon">
            <div className="img_show">
              <img src={image} alt="" />
              <hr />
            </div>
          </div>

         
          <div className="middleIcon">
            <div className="icon_sec">
              <div className="icon">
                <i class="fa-solid fa-house"></i>
              </div>
            </div>

            <div className="icon_sec">
              <div className="icon">
                <i class="fa-solid fa-sack-dollar"></i>
              </div>
            </div>

            <div className="icon_sec">
              <div className="icon chc">
                <img src={image2} alt="" />
              </div>
            </div>

            <div className="icon_sec">
              <div className="icon">
                <img src={image3} alt="" />
              </div>
            </div>

            <div className="icon_sec">
              <div className="icon">
                <i class="fa-solid fa-earth-americas"></i>
              </div>
            </div>

            <div className="icon_sec">
              <div className="icon">
                <i class="fa-solid fa-chart-simple"></i>
              </div>
            </div>
            <div className="icon_sec">
              <div className="icon">
                <i class="fa-solid fa-truck"></i>
              </div>
            </div>
          </div>

          <div className="lastIcon">
            <div className="belowicon_sec">
              <div className="icon">
                <i class="fa-regular fa-calendar-days"></i>
              </div>
            </div>

            <div className="belowicon_sec">
              <div className="icon">
                <i class="fa-solid fa-video"></i>
              </div>
            </div>

            <div className="belowicon_sec">
              <div className="icon">
                <i class="fa-regular fa-file-lines"></i>
              </div>
            </div>

            <div className="belowicon_sec">
              <div className="icon">
                <i class="fa-solid fa-gear"></i>
              </div>
            </div>
          </div> */}

<Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
        </div>

        <div className="topSideNav">
          <Row>
            {/* <div className="pathSec">
                                <p>Demand / <span className='chcolor'>Planning Overview</span></p>
                        </div> */}

            <Col xs={18} sm={18} md={18} lg={18} xl={18}>
              <Breadcrumb
                items={[
                  {
                    title: "Demand",
                  },
                  {
                    title: <a href="">Planning Overview</a>,
                  },
                ]}
              />
            </Col>
            <Col xs={6} sm={6} md={6} lg={6} xl={6}>
              <div className="inputSec">
                {/* <i class="fa-solid fa-magnifying-glass"></i> */}
                <input type="text" placeholder="search" />

                <i class="fa-regular fa-bell"></i>
                <i class="fa-solid fa-moon"></i>
                <i className="infosign">i</i>
                <div className="img_sec">
                  <img src={ai} alt="" />
                </div>
              </div>
            </Col>
          </Row>
          <Row gutter={3} style={{ paddingTop: "0px" }}>
            {" "}
            <Col xs={3} sm={3} md={3} lg={3} xl={3}>
              <MenuOutlined />{" "}
              <Link href="#" target="_blank">
                Planning Overview
              </Link>
            </Col>
            <Col xs={2} sm={2} md={2} lg={2} xl={2} className="p-1">
              <i class="fa-solid fa-briefcase"></i>{" "}
              <Text href="#" target="_blank">
                Portfolios
              </Text>
            </Col>{" "}
            <Col xs={2} sm={2} md={2} lg={2} xl={2}>
              {" "}
              <i class="fa-regular fa-calendar-days"></i>{" "}
              <Text href="#" target="_blank">
                Methods
              </Text>
            </Col>
            <Col xs={2} sm={2} md={2} lg={2} xl={2}>
              <AlignCenterOutlined />{" "}
              <Text href="#" target="_blank">
                Segment
              </Text>
            </Col>
            <Col xs={2} sm={2} md={2} lg={2} xl={2}>
              {/* <AlignCenterOutlined />{" "} */}
              <RiseOutlined />
              <Text href="#" target="_blank">
                Performance
              </Text>
            </Col>
            <Col xs={2} sm={2} md={2} lg={2} xl={2}>
              <i
                class="fa-solid fa-envelopes-bulk"
                style={{ color: "#4e5e63", paddingLeft: "25px" }}
              ></i>
              <Text href="#" target="_blank">
                Posts
              </Text>
            </Col>
            {/* <div className="topSecondSec">
              <div className="toppathsec chcolor">
                <i class="fa-solid fa-bars"></i>{" "}
                <span className="chcolor">Planning Overview</span>
              </div>
              <div className="toppathsec">
                <i class="fa-solid fa-briefcase"></i> <span>Portfolios</span>
              </div>
              <div className="toppathsec">
                <i class="fa-regular fa-calendar-days"></i> <span>Methods</span>
              </div>
              <div className="toppathsec">
                <i class="fa-solid fa-bars-staggered"></i> <span>Segments</span>
              </div>
              <div className="toppathsec">
                <div className="imgIcon">
                  <img src={image3} alt="" />
                  <span className="pl">Performance</span>
                </div>
              </div>
              <div className="toppathsec">
                <i class="fa-solid fa-envelopes-bulk"></i>
                <span>Posts</span>
              </div>
            </div> */}
          </Row>
        </div>

        <div className="filterSec">
          <div className="dateFilter">
            <Datepick />
            <select
              id="selectedoption"
              onChange={handleSelectChange}
              value={selectedOption}
            >
              <option value="daily">Daily View</option>
              <option value="weekly">Weekly View</option>
              <option value="Monthly">Monthly View</option>
              <option value="Quarterly">Quaterly View</option>
              <option value="Yearly">Yearly View</option>
            </select>
          </div>
          {/* <div className="filter">
            <div className="flicon">
              <i class="fa-solid fa-filter "></i>
              <span>Filter</span>
            </div>
            <i class="fa-solid fa-arrows-rotate"></i> <span>Refresh Data</span>
            <i class="fa-solid fa-arrow-down"></i> Download data
          </div> */}
        </div>
        <div className="planOverview">
          <div className="chartTable">
            <Table />
          </div>
        </div>
      </div>

      {/* {showPopup && <PopupComponent onClose={closePopup} />} */}
    </>
  );
}

export default Dashboard;
