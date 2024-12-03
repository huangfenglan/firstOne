import { Form, Space, Button } from 'antd';
const { Item } = Form;

export default ({
  children,
  form = {},
  isBtnLoading = false, //form是否正在提交中
  ...rest
}: any) => {
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };
  const tailLayout = {
    wrapperCol: { offset: 18, span: 6 },
  };

  return (
    <Form {...layout} form={form} {...rest}>
      {children}
      <Item {...tailLayout}>
        <Space>
          <Button type="primary" htmlType="submit" loading={isBtnLoading}>
            提交
          </Button>
          <Button htmlType="button" onClick={() => form?.resetFields()}>
            取消
          </Button>
        </Space>
      </Item>
    </Form>
  );
};
