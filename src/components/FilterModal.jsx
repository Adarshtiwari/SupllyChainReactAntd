// FilterModal.js
import React, { useState } from "react";
import { Modal, Row, Menu, Col, Input, Select, Divider, Collapse, Popover } from "antd";
import { Button, Checkbox, Form } from "antd";

import { ArrowDownOutlined, FilterFilled, SearchOutlined } from "@ant-design/icons";
import "../css/filter.css";
const { TextArea } = Input;
const FilterModal = ({ visible, onClose }) => {
  const [current, setCurrent] = useState("product");

  const handleOk = () => {
    // Handle filter logic here
    onClose(); // Close the modal
  };

  const handleCancel = () => {
    onClose(); // Close the modal
  };

  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
  };

  const MenuItemCss = { width: "100px", textAlign: "center", marginRight: -15 };

  const collapseCss = { background: "#ffffff", marginTop: 7 };

  const items = [
    {
      label: "Product",
      key: "product",
      style: MenuItemCss,
    },
    {
      label: "Location",
      key: "location",
      style: MenuItemCss,
    },
    {
      label: " Customer",
      key: "customer",
      style: MenuItemCss,
    },
  ];

  const options = [
    {
      label: "Apple",
      value: "Apple",
    },
    {
      label: "Pear",
      value: "Pear",
    },
    {
      label: "Orange",
      value: "Orange",
    },
    {
      label: "Apple",
      value: "Apple",
    },
    {
      label: "Pear",
      value: "Pear",
    },
    {
      label: "Orange",
      value: "Orange",
    },
    {
      label: "Apple",
      value: "Apple",
    },
    {
      label: "Pear",
      value: "Pear",
    },
    {
      label: "Orange",
      value: "Orange",
    },
    {
      label: "Apple",
      value: "Apple",
    },
    {
      label: "Pear",
      value: "Pear",
    },
    {
      label: "Orange",
      value: "Orange",
    },
  ];

  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
    handleClick();
  };

  const content = (
    <div>
      <Row xs={24} sm={24} md={24} lg={24} xl={24}>
        <Col xs={23} sm={23} md={23} lg={23} xl={23}>
          <Menu
            mode="horizontal"
            selectedKeys={[current]}
            items={items}
            onClick={onClick}
            style={{
              color: "#7D8FB3",
              fontSize: 12,
              fontWeight: 500,
              height: 40,
              width: "100%",
              borderBottom: "none",
              textAlign: "center",
            }}
            // className="filtermenucard"
          />
        </Col>
      </Row>
      <Input
        placeholder=" Search"
        prefix={<SearchOutlined style={{ color: "#4285F4" }} />}
        style={{
          background: "#F7F8FA",
          borderRadius: 8,
          width: "100%",
          height: 28,
          marginTop: 10,
        }}
        variant="borderless"
      ></Input>
      <Collapse
        accordion
        size="small"
        // bordered={false}
        style={collapseCss}
        items={[
          {
            key: "1",
            label: (
              <Divider orientationMargin="0" orientation="left" style={{ fontSize: 12, fontWeight: 700, color: "#1B2559" }}>
                ABC
              </Divider>
            ),
            children: <>hi</>,
          },
          {
            key: "2",
            label: (
              <Divider orientationMargin="0" orientation="left" style={{ fontSize: 12, fontWeight: 700, color: "#1B2559" }}>
                Product Group
              </Divider>
            ),
            children: <p>hi</p>,
          },
          {
            key: "3",
            label: (
              <Divider orientationMargin="0" orientation="left" style={{ fontSize: 12, fontWeight: 700, color: "#1B2559" }}>
                Subgroup
              </Divider>
            ),
            children: <p>hi</p>,
          },
          {
            key: "4",
            label: (
              <Divider orientationMargin="0" orientation="left" style={{ fontSize: 12, fontWeight: 700, color: "#1B2559" }}>
                Brand
              </Divider>
            ),
            children: (
              <>
                {" "}
                <Checkbox.Group
                  style={{
                    width: "100%",
                  }}
                  // onChange={onChange}
                >
                  <Row>
                    <Col span={6}>
                      <Checkbox value="brand1">Brand 1</Checkbox>
                    </Col>
                    <Col span={6}>
                      <Checkbox value="brand2">Brand 2</Checkbox>
                    </Col>
                    <Col span={6}>
                      <Checkbox value="brand3">Brand 3</Checkbox>
                    </Col>
                    <Col span={6}>
                      <Checkbox value="brand4">Brand 4</Checkbox>
                    </Col>
                    <Col span={6}>
                      <Checkbox value="brand5">Brand 5</Checkbox>
                    </Col>
                    <Col span={6}>
                      <Checkbox value="brand6">Brand 6</Checkbox>
                    </Col>
                    <Col span={6}>
                      <Checkbox value="brand7">Brand 7</Checkbox>
                    </Col>
                    <Col span={6}>
                      <Checkbox value="brand8">Brand 8</Checkbox>
                    </Col>
                    <Col span={6}>
                      <Checkbox value="brand9">Brand 9</Checkbox>
                    </Col>
                    <Col span={6}>
                      <Checkbox value="brand10">Brand 10</Checkbox>
                    </Col>
                    <Col span={6}>
                      <Checkbox value="brand11">Brand 11</Checkbox>
                    </Col>
                    <Col span={6}>
                      <Checkbox value="brand12">Brand 12</Checkbox>
                    </Col>
                  </Row>
                </Checkbox.Group>
              </>
            ),
          },
          {
            key: "5",
            label: (
              <Divider orientationMargin="0" orientation="left" style={{ fontSize: 12, fontWeight: 700, color: "#1B2559" }}>
                ITEM
              </Divider>
            ),
            children: <p>hi</p>,
          },
          {
            key: "6",
            label: (
              <Divider orientationMargin="0" orientation="left" style={{ fontSize: 12, fontWeight: 700, color: "#1B2559" }}>
                Package Size
              </Divider>
            ),
            children: <p>hi</p>,
          },
        ]}
        expandIconPosition="end"
      />
      <Divider plain style={{ fontWeight: 100 }} />
      <Row>
        <Col xs={19} sm={19} md={19} lg={19} xl={19}>
          <TextArea placeholder="text area" style={{ border: "none" }} autoSize />
          <div style={{ margin: "24px 0" }} />
        </Col>
        <Col xs={2} sm={2} md={2} lg={2} xl={2}>
        <Button style={{ fontSize: 14, fontWeight: 500, borderRadius: 6, width: 64, height: 32, marginLeft:20 }}>
          Reset
        </Button>{" "}
        </Col>
        <Col xs={2} sm={2} md={2} lg={2} xl={2}>
        <Button type="primary" style={{ fontSize: 14, fontWeight: 500, borderRadius: 6, width: 64, height: 32, marginLeft:30 }}>
          Apply
        </Button>{" "}
        </Col>
      </Row>
    </div>
  );
  return (
    <>
      <Popover placement="bottom" title="Filters" style={{ fontSize: 17 }} trigger="click" content={content}>
        <Button type="primary" icon={<FilterFilled />} style={{ fontSize: 13, borderRadius: 48, width: 80 }}>
          Filter
        </Button>{" "}
      </Popover>

      <Button type="text" icon={<i class="fa-solid fa-arrows-rotate"></i>} style={{ fontSize: 13 }}>
        Refresh Data
      </Button>
      <Button type="text" icon={<ArrowDownOutlined />} style={{ fontSize: 13 }}>
        Download Data
      </Button>
      <Button type="text" icon={<i class="fa-solid fa-ellipsis"></i>}></Button>
    </>
  );
};

export default FilterModal;
