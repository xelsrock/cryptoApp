import React from 'react';

import { Button, message, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const ConfirmDelete = ({ asset, deleteCoin }) => {
  const confirm = () => {
    deleteCoin();
    message.success(`${asset.name} removed`);
  };

  return (
    <Popconfirm
      title="Delete Coin"
      description={`Do you want to delete ${asset.name}`}
      onConfirm={confirm}
      okText="Yes"
      cancelText="No">
      <Button style={{ position: 'absolute', right: 10, top: 15 }}>
        <DeleteOutlined />
      </Button>
    </Popconfirm>
  );
};

export default ConfirmDelete;
