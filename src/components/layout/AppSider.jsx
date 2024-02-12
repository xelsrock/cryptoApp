import React from 'react';
import { Layout, Card, Statistic, List, Typography, Tag } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { strModificate } from '../../utils';
import { useCrypto } from '../../context';

const siderStyle = {
  padding: '1rem',
};

const AppSider = () => {
  const { assets } = useCrypto();

  return (
    <Layout.Sider width="25%" style={siderStyle}>
      {assets.map((asset) => (
        <Card key={asset.id} style={{ marginBottom: '1rem' }}>
          <Statistic
            title={strModificate(asset.id)}
            value={asset.totalAmount}
            precision={2}
            valueStyle={{
              color: asset.grow ? '#3f8600' : '#cf1322',
            }}
            prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            suffix="$"
          />
          <List
            size="small"
            dataSource={[
              {
                title: 'Total Profit',
                value: +asset.totalProfit.toFixed(2) + '$',
                tag: true,
              },
              {
                title: 'Asset Amount',
                value: +asset.amount.toFixed(2),
              },
              // {
              //   title: 'Difference',
              //   value: asset.growPercent + '%',
              // },
            ]}
            renderItem={(item) => (
              <List.Item>
                <span>{item.title}</span>

                <Typography.Text
                  type={
                    item.title !== 'Asset Amount' ? (asset.grow ? 'success' : 'danger') : 'default'
                  }>
                  {item.tag && <Tag color={asset.grow ? 'green' : 'red'}>{asset.growPercent}%</Tag>}
                  {item.value}
                </Typography.Text>
              </List.Item>
            )}
          />
        </Card>
      ))}
    </Layout.Sider>
  );
};

export default AppSider;
