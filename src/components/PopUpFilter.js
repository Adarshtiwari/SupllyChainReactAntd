export const popContent= (<div>
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