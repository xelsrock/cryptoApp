import React, { useEffect, useState } from 'react';
import { Layout, Select, Space, Button, Modal, Drawer } from 'antd';
import { useCrypto } from '../../context';
import CoinInfoModal from '../CoinInfoModal';
import AddAssetForm from '../AddAssetForm';

const headerStyle = {
  width: '100%',
  textAlign: 'center',
  height: 60,
  padding: '1rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const AppHeader = () => {
  const { crypto } = useCrypto();
  const [select, setSelect] = useState(false);
  const [modal, setModal] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [coin, setCoin] = useState(null);

  const handleSelect = (value) => {
    setCoin(crypto.find((c) => c.id === value));
    setModal(true);
  };

  const onClose = () => {
    setDrawer(false);
  };

  useEffect(() => {
    const keypress = (event) => {
      if (event.code === 'Slash') {
        setSelect((prev) => !prev);
      }
    };
    document.addEventListener('keypress', keypress);

    return () => document.removeEventListener('keypress', keypress);
  }, []);

  return (
    <Layout.Header style={headerStyle}>
      <Select
        style={{
          width: 250,
        }}
        open={select}
        onSelect={handleSelect}
        onClick={() => setSelect((prev) => !prev)}
        value="Crypto Info ( press / )"
        options={crypto.map((coin) => ({ value: coin.id, label: coin.name, icon: coin.icon }))}
        optionRender={(option) => (
          <Space>
            <img style={{ width: 20 }} src={option.data.icon} alt={option.data.label} />
            <span>{option.label}</span>
          </Space>
        )}
      />
      <Button type="primary" onClick={() => setDrawer(true)}>
        Add Coin
      </Button>

      <Modal open={modal} onOk={() => setModal(false)} onCancel={() => setModal(false)}>
        <CoinInfoModal coin={coin} />
      </Modal>

      <Drawer title="Add Coin" onClose={() => setDrawer(false)} open={drawer} destroyOnClose>
        <AddAssetForm onClose={onClose} />
      </Drawer>
    </Layout.Header>
  );
};

export default AppHeader;
