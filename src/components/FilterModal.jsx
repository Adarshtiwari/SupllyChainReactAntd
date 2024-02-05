// FilterModal.js
import React, { useState } from "react";
import { Modal, Row, Menu, Col, Input, Select, Divider, Collapse, Popover } from "antd";
import { Button, Checkbox, Form } from "antd";

import { SearchOutlined } from "@ant-design/icons";
import "../css/filter.css";
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

  const collapseCss = { background: "#ffffff", marginTop: 5};

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
      label: 'Apple',
      value: 'Apple',
    },
    {
      label: 'Pear',
      value: 'Pear',
    },
    {
      label: 'Orange',
      value: 'Orange',
    },
  ];

  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
    handleClick();
  };

  const content = (<div>
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
        size="small"
        bordered={false}
        style={collapseCss}

        items={[
          {
            key: "1",
            label:<Divider orientationMargin="0" orientation="left" style={{fontSize: 12}}>ABC</Divider>
          },
        ]}
        expandIconPosition="end"
      />
      <Collapse
        size="small"
        bordered={false}
        style={collapseCss}

        items={[
          {
            key: "1",
            label:<Divider orientationMargin="0" orientation="left" style={{fontSize: 12}}>Product Group</Divider>
          },
        ]}
        expandIconPosition="end"
      />{" "}
      <Collapse
        size="small"
        bordered={false}
        style={collapseCss}

        items={[
          {
            key: "1",
            label:<Divider orientationMargin="0" orientation="left" style={{fontSize: 12}}>Subgroup</Divider>
          },
        ]}
        expandIconPosition="end"
      />{" "}
      <Collapse
        size="small"
        bordered={false}
        style={collapseCss}

        items={[
          {
            key: "1",
            label:<Divider orientationMargin="0" orientation="left" style={{fontSize: 12}}>Brand</Divider>
          },
        ]}
        expandIconPosition="end"
        // items = {<Checkbox.Group options={options} defaultValue={['Apple']}/>}

      />{" "}
      <Collapse
        size="small"
        bordered={false}
        style={collapseCss}
        items={[
          {
            key: "1",
            label:<Divider orientationMargin="0" orientation="left" style={{fontSize: 12}}>Item</Divider>,
            // children: <Checkbox.Group options={options} defaultValue={['Apple']}/>
            children: <p>hi</p>
          },
        ]}
        expandIconPosition="end"
      />
      <Collapse
        size="small"
        bordered={false}
        style={collapseCss}
        items={[
          {
            key: "1",
            label:<Divider orientationMargin="0" orientation="left" style={{fontSize: 12}}>Package Size</Divider>
          },
        ]}
        expandIconPosition="end"
      />
  </div>)
  return (
    // <Modal
    //   title={
    //     <span style={{ fontWeight: 400, fontSize: 18, height: 300 }}>
    //       <b>Filters</b>
    //     </span>
    //   }
    //   visible={visible}
    //   onOk={handleOk}
    //   onCancel={handleCancel}
    //   width={700}
    // >
    //   <Row xs={24} sm={24} md={24} lg={24} xl={24}>
    //     <Col xs={23} sm={23} md={23} lg={23} xl={23}>
    //       <Menu
    //         mode="horizontal"
    //         selectedKeys={[current]}
    //         items={items}
    //         onClick={onClick}
    //         style={{
    //           color: "#7D8FB3",
    //           fontSize: 12,
    //           fontWeight: 500,
    //           height: 40,
    //           width: "100%",
    //           borderBottom: "none",
    //           textAlign: "center",
    //         }}
    //         // className="filtermenucard"
    //       />
    //     </Col>
    //   </Row>
    //   <Input
    //     placeholder=" Search"
    //     prefix={<SearchOutlined style={{ color: "#4285F4" }} />}
    //     style={{
    //       background: "#F7F8FA",
    //       borderRadius: 8,
    //       width: "100%",
    //       height: 28,
    //       marginTop: 10,
    //     }}
    //     variant="borderless"
    //   ></Input>

    //   <Collapse
    //     size="small"
    //     bordered={false}
    //     style={collapseCss}

    //     items={[
    //       {
    //         key: "1",
    //         label:<Divider orientationMargin="0" orientation="left" style={{fontSize: 12}}>ABC</Divider>
    //       },
    //     ]}
    //     expandIconPosition="end"
    //   />
    //   <Collapse
    //     size="small"
    //     bordered={false}
    //     style={collapseCss}

    //     items={[
    //       {
    //         key: "1",
    //         label:<Divider orientationMargin="0" orientation="left" style={{fontSize: 12}}>Product Group</Divider>
    //       },
    //     ]}
    //     expandIconPosition="end"
    //   />{" "}
    //   <Collapse
    //     size="small"
    //     bordered={false}
    //     style={collapseCss}

    //     items={[
    //       {
    //         key: "1",
    //         label:<Divider orientationMargin="0" orientation="left" style={{fontSize: 12}}>Subgroup</Divider>
    //       },
    //     ]}
    //     expandIconPosition="end"
    //   />{" "}
    //   <Collapse
    //     size="small"
    //     bordered={false}
    //     style={collapseCss}

    //     items={[
    //       {
    //         key: "1",
    //         label:<Divider orientationMargin="0" orientation="left" style={{fontSize: 12}}>Brand</Divider>
    //       },
    //     ]}
    //     expandIconPosition="end"
    //     // items = {<Checkbox.Group options={options} defaultValue={['Apple']}/>}

    //   />{" "}
    //   <Collapse
    //     size="small"
    //     bordered={false}
    //     style={collapseCss}
    //     items={[
    //       {
    //         key: "1",
    //         label:<Divider orientationMargin="0" orientation="left" style={{fontSize: 12}}>Item</Divider>,
    //         // children: <Checkbox.Group options={options} defaultValue={['Apple']}/>
    //         children: <p>hi</p>
    //       },
    //     ]}
    //     expandIconPosition="end"
    //   />
    //   <Collapse
    //     size="small"
    //     bordered={false}
    //     style={collapseCss}
    //     items={[
    //       {
    //         key: "1",
    //         label:<Divider orientationMargin="0" orientation="left" style={{fontSize: 12}}>Package Size</Divider>
    //       },
    //     ]}
    //     expandIconPosition="end"
    //   />
    // </Modal>
<Popover placement="bottom" title="Filter"       trigger="click"
content={content}>
            <Button>Bottom</Button>
          </Popover>
  );
};

export default FilterModal;
