'use client';

import { Modal, Form, Button, Space, Input } from 'antd';
import { useState } from 'react';
const { Item } = Form;

export default ({
  isOpen = true,
  setIsOpen,
  form,
  children,
  formItems = [],
  modalProps = {},
  formProps = {},
  onFinish,
}: any) => {
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };
  const tailLayout = {
    wrapperCol: { offset: 18, span: 6 },
  };
  const [isBtnLoading, setIsBtnLoading] = useState(false);

  const curOnFinish = async (values: any) => {
    setIsBtnLoading(true);
    const isFinished = await onFinish(values).finally(() => {
      setIsBtnLoading(false);
    });
    setIsOpen(false);
  };

  return (
    <Modal
      title="弹窗"
      open={isOpen}
      onOk={() => {}}
      footer={null}
      width={800}
      destroyOnClose
      onCancel={() => setIsOpen(false)}
      {...modalProps}
    >
      <Form {...layout} form={form} {...formProps} onFinish={curOnFinish}>
        {children}
        {formItems.map(({ name, children, ...rest }: any) => (
          <Item key={name} name={name} children={children} {...rest} />
        ))}
        <Item {...tailLayout}>
          <Space>
            <Button type="primary" htmlType="submit" loading={isBtnLoading}>
              提交
            </Button>
            <Button
              htmlType="button"
              onClick={() => {
                form?.resetFields();
                setIsOpen(false);
              }}
            >
              取消
            </Button>
          </Space>
        </Item>
      </Form>
    </Modal>
  );
};
