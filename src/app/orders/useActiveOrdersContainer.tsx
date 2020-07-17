import { useQuery, useSubscription } from "@apollo/client";
import { Button, Space } from "antd";
import React from "react";
import { activeOrdersQuery } from "./queries/activeOrdersQuery";
import { ordersSubscription } from "./subscriptions/ordersSubscription";
import Link from "next/link";

export const useActiveOrdersContainer = () => {
  const { data, error, loading, refetch } = useQuery(activeOrdersQuery, {
    variables: { limit: 0 },
  });

  const { data: activeOrderUpdated } = useSubscription(ordersSubscription);

  React.useEffect(() => {
    if (activeOrderUpdated) {
      refetch().catch(console.error);
    }
  }, [activeOrderUpdated]);
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Created",
      dataIndex: "created",
      key: "created",
    },
    {
      title: "Destination",
      dataIndex: "destination",
      key: "destination",
    },
    {
      title: "Room Number",
      dataIndex: "roomNumber",
      key: "roomNumber",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Action",
      key: "action",
      render: (_text, record) => (
        <Space size="middle">
          <Button type="primary">
            <Link href={`/order/${record?.id}`}>
              <a>Update</a>
            </Link>
          </Button>
        </Space>
      ),
    },
  ];
  return {
    columns,
    orders: data?.orders?.entries ?? [],
    error,
    loading,
  };
};
