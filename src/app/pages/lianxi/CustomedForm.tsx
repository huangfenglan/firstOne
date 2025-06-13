'use client';
import { Form, Card, Input, Select, DatePicker } from 'antd';
import { useEffect, useMemo, forwardRef } from 'react';
const { Item } = Form;
const { RangePicker } = DatePicker;
import { DateTime } from 'luxon';
interface Propstype {
  currentKey: string;
  // curTitle: string;
  defaultObj: { name: string; type: string; period: any[] };
  changeKeyName: (key: string, name: string) => void;
}

export default ({ currentKey, changeKeyName, defaultObj }: Propstype) => {
  const [form] = Form.useForm();
  const period = Form.useWatch('period', form);
  const name = Form.useWatch('name', form);

  //将所有区域的时间戳改为北京时间
  const beijinTime = useMemo(() => {
    if (!period?.length) return;
    if (!!period?.length) {
      return period.map((val) => {
        const timTem = val.valueOf(); //时间戳
        // 使用luxon转换为北京时间
        const dt = DateTime.fromMillis(timTem).setZone('Asia/Shanghai');
        // 格式化输出
        const formatted = dt.toFormat('yyyy-MM-dd HH:mm:ss');
        return formatted;
      });
    }
  }, [period]);

  //更改标题
  useEffect(() => {
    !!name && changeKeyName(currentKey, name);
  }, [name]);

  useEffect(() => {
    form.setFieldsValue({ ...defaultObj });
  }, [defaultObj]);

  const formItems = [
    {
      label: '任务名称',
      name: 'name',
      key: 'name',
      rules: [
        {
          required: true,
          message: '请输入任务名称',
        },
      ],
      children: (
        <Input
          placeholder="请输入任务名称"
          count={{
            show: true,
            max: 64,
          }}
        />
      ),
    },
    {
      label: '玩法类型',
      name: 'type',
      key: 'type',
      rules: [
        {
          required: true,
          message: '请选择玩法类型',
        },
      ],
      children: (
        <Select
          placeholder="请选择玩法类型"
          options={[
            { value: 'code', label: 'code' },
            { value: 'JSON', label: 'JSON' },
            { value: 'PYTHON', label: 'PYTHON' },
          ]}
        />
      ),
    },
    {
      label: '任务有效期(PST)',
      name: 'period',
      key: 'period',
      rules: [
        {
          required: true,
          message: '请选择任务有效期(PST)',
        },
      ],
      children: <RangePicker showTime allowClear />,
      help: !!beijinTime?.length && (
        <span>
          对应北京时间：{beijinTime[0]}-{beijinTime[1]}
        </span>
      ),
    },
  ];
  return (
    <Card
      title="任务基本信息"
      bordered={null}
      //   extra={<a href="#">More</a>}
      //   style={{ width: 300 }}
    >
      <Form name={currentKey} layout="vertical" form={form}>
        {formItems.map(({ key, ...rest }) => (
          <Item key={key} {...rest} />
        ))}
      </Form>
    </Card>
  );
};
