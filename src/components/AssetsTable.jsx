import React from 'react';
import { Table } from 'antd';
import { useCrypto } from '../context';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ['descend'],
  },
  {
    title: 'Price, $',
    dataIndex: 'price',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    sortDirections: ['descend'],
    sorter: (a, b) => a.amount - b.amount,
  },
];

const AssetsTable = () => {
  const { assets } = useCrypto();

  const data = assets.map((asset) => ({
    key: asset.id,
    name: asset.name,
    amount: asset.amount,
    price: asset.price,
  }));
  return <Table pagination={false} columns={columns} dataSource={data} />;
};

export default AssetsTable;
