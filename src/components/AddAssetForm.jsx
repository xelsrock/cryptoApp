import React, { useState, useRef } from 'react';
import { useCrypto } from '../context';
import { Divider, Select, Space, Form, Button, InputNumber, DatePicker, Result } from 'antd';
import CoinInfo from './CoinInfo';

const validateMessage = {
  required: '${label} is required',
  types: { number: '${label} is not valid number' },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const AddAssetForm = ({ onClose }) => {
  const [form] = Form.useForm();
  const { crypto, addAsset } = useCrypto();
  const [coin, setCoin] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const assetRef = useRef();

  if (submitted) {
    return (
      <Result
        status="success"
        title="The coin has been successfully added to your wallet!"
        subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}`}
        extra={[
          <Button type="primary" key="console" onClick={onClose}>
            Good!
          </Button>,
        ]}
      />
    );
  }

  if (!coin) {
    return (
      <Select
        style={{
          width: '100%',
        }}
        onSelect={(value) => setCoin(crypto.find((c) => c.id === value))}
        placeholder="Select crypto"
        options={crypto.map((coin) => ({ value: coin.id, label: coin.name, icon: coin.icon }))}
        optionRender={(option) => (
          <Space>
            <img style={{ width: 20 }} src={option.data.icon} alt={option.data.label} />
            <span>{option.label}</span>
          </Space>
        )}
      />
    );
  }

  const onFinish = (values) => {
    const newAsset = {
      id: coin.id,
      amount: values.amount,
      price: values.price,
      date: values.date?.$d ?? new Date(),
    };

    assetRef.current = newAsset;
    addAsset(newAsset);
    setSubmitted(true);
  };

  const handleCoinAmount = (value) => {
    const price = form.getFieldValue('price');
    form.setFieldsValue({
      total: +(value * price).toFixed(2),
    });
  };

  const handleCoinPrice = (value) => {
    const amount = form.getFieldValue('amount');

    form.setFieldsValue({
      total: +(value * amount).toFixed(2),
    });
  };

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{
        span: 7,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        price: +coin.price.toFixed(2),
      }}
      onFinish={onFinish}
      validatemessage={validateMessage}>
      <CoinInfo coin={coin} />
      <Divider />

      <Form.Item
        label="Amount"
        name="amount"
        rules={[
          {
            required: true,
            type: 'number',
            min: 0,
          },
        ]}>
        <InputNumber
          placeholder="Enter coin amount"
          onChange={handleCoinAmount}
          style={{ width: '100%' }}
        />
      </Form.Item>

      <Form.Item label="Price" name="price">
        <InputNumber onChange={handleCoinPrice} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label="Date & Time" name="date">
        <DatePicker showTime />
      </Form.Item>

      <Form.Item label="Total" name="total">
        <InputNumber disabled style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Asset
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddAssetForm;
