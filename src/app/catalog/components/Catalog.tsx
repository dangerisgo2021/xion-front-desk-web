import React from "react";
import { Layout, List, Card, Button, Space } from "antd";
import Link from "next/link";

import { useCatalogContainer } from "app/catalog/containers/useCatalogContainer";
import { Header } from "app/layout/components/Header";
import { AddVendorModal } from "./AddVendorModal";

const { Content } = Layout;

export const Catalog = () => {
  const {
    gridConfig,
    vendors,
    loading,
    isAddVendorModalVisible,
    onAddVendorOkClick,
    onAddVendorCanceled,
    onAddVendorButtonClick,
  } = useCatalogContainer();

  return (
    <Layout>
      <Header title="Catalog Dashboard" breadcrumbs={["Catalog"]} />

      <Content style={{ padding: "1vw" }}>
        <Space style={{ margin: " 1vw 0" }}>
          <Button type="primary" onClick={onAddVendorButtonClick}>
            Add Vendor
          </Button>
        </Space>

        <List
          grid={gridConfig}
          loading={loading}
          dataSource={vendors}
          renderItem={(vendor) => (
            <List.Item>
              <Link href={`/catalog/vendor/${vendor?.["id"]}`}>
                <a>
                  <Card title={vendor?.["name"]} hoverable />
                </a>
              </Link>
            </List.Item>
          )}
        />
        <AddVendorModal
          visible={isAddVendorModalVisible}
          onOk={onAddVendorOkClick}
          onCancel={onAddVendorCanceled}
        />
      </Content>
    </Layout>
  );
};
