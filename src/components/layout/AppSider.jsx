import React, { useEffect, useState } from 'react';
import { Layout, Card, Statistic, List, Spin, Typography, Tag } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { fakeFetchCrypto, fetchAssets } from '../../api';
import { percentDifference, strModificate } from '../../utils';

const siderStyle = {
  padding: '1rem',
};

const AppSider = () => {
  const [loading, setLoading] = useState(false);
  const [crypto, setCrypto] = useState([]);
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    const preload = async () => {
      setLoading(true);

      const { result } = await fakeFetchCrypto();
      const dataAssets = await fetchAssets();

      setCrypto(result);

      setAssets(
        dataAssets.map((asset) => {
          const coin = result.find((c) => c.id === asset.id);

          return {
            grow: asset.price < coin.price,
            growPercent: percentDifference(asset.price, coin.price),
            totalAmount: asset.amount * coin.price,
            totalProfit: asset.amount * coin.price - asset.amount * asset.price,
            ...asset,
          };
        }),
      );

      setLoading(false);
    };

    preload();
  }, []);

  if (loading) {
    return <Spin fullscreen />;
  }

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
