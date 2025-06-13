'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { CopyOutlined } from '@ant-design/icons';
import { Button, message, Tabs, Form } from 'antd';
import CustomedForm from './CustomedForm';
type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

import type { TabsProps } from 'antd';
interface taskItem {
  name: string;
  type: string;
  period: any[];
}

const label = '任务';
const maxCount = 10;
const defaultKey = 'newTab0';

const App: React.FC = () => {
  const ref = useRef();
  const formRef = useRef();
  const [activeKey, setActiveKey] = useState(defaultKey);
  const [items, setItems] = useState<any>([
    {
      key: defaultKey,
      label: '测试999',
      children: (
        <CustomedForm
          currentKey={defaultKey}
          changeKeyName={() => {}}
          defaultObj={{ name: '测试999', type: '', period: [] }}
          // curTitle={curTitle}
        />
      ),
    },
  ]);
  const newTabIndex = useRef(1);
  const [help, setHelp] = useState('');

  const onChange = (newActiveKey: string) => {
    setActiveKey(newActiveKey);
  };

  useEffect(() => {
    ref.current = items;
  }, [items]);

  //更改title
  const changeKeyName = useCallback(
    (key: string, name: string) => {
      setItems(
        ref?.current?.map((val: TabsProps['items']) =>
          val?.key === key ? { ...val, label: name } : val
        )
      );
    },
    [items, activeKey]
  );

  //添加任务
  const addTask = () => {
    const newIndex = newTabIndex.current++;
    const newActiveKey = `newTab${newIndex}`;
    const newPanes = [...items];
    const curTitle = `${label}${newIndex}`;
    newPanes.push({
      label: curTitle,
      children: (
        <CustomedForm
          currentKey={newActiveKey}
          changeKeyName={changeKeyName}
          defaultObj={{ name: curTitle, type: '', period: [] }}
        />
      ),

      // children: '000000',
      key: newActiveKey,
    });
    setItems(newPanes);
    setActiveKey(newActiveKey);
  };

  //复制任务
  const copyTask = () => {
    const newIndex = newTabIndex.current++;
    const newActiveKey = `newTab${newIndex}`;
    const copyKey = items.findIndex(
      ({ key }: { key: string }) => key === activeKey
    );
    const curTask = items[copyKey];
    const curTitle = `${curTask?.label}-copy`;
    const copyedData = formRef?.current[activeKey]?.getFieldsValue();
    const currentTask = {
      children: (
        <CustomedForm
          currentKey={newActiveKey}
          changeKeyName={changeKeyName}
          defaultObj={{ ...copyedData, name: curTitle }}
        />
      ),
      key: newActiveKey,
      label: curTitle,
    };
    const newPanes = [...items];
    newPanes.splice(copyKey + 1, 0, currentTask); //在复制的元素后面添加复制的任务
    setItems(newPanes);
    setActiveKey(newActiveKey);
  };

  /**
   * isAdd: 是否添加
   */
  const validateCount = (isAdd: boolean) => {
    if (items?.length >= maxCount) {
      message.warning(`当前任务数量，已经超过最大数量${10},不能继续添加了哦`);
    } else {
      isAdd && addTask();
      !isAdd && copyTask();
    }
  };
  // 添加
  const add = () => validateCount(true);

  //删除选择数据
  const removeTab = (targetKey: TargetKey) => {
    let newActiveKey = activeKey;
    let lastIndex = -1;
    items.forEach((item, i) => {
      if (item.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = items.filter((item) => item.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setItems(newPanes);
    setActiveKey(newActiveKey);
  };

  //判断是否是最后一条数据
  const remove = (targetKey: TargetKey) => {
    if (items?.length <= 1) {
      message.warning('请至少保留一组数据');
    } else {
      removeTab(targetKey);
    }
  };

  //删除或者增加
  const onEdit = (
    targetKey: React.MouseEvent | React.KeyboardEvent | string,
    action: 'add' | 'remove'
  ) => {
    if (action === 'add') {
      add();
    } else {
      remove(targetKey);
    }
  };

  //表单提交
  const submitForms = async (name, { values, forms }) => {
    setHelp('');
    const formNames = Object.keys(forms);
    let i = 0;

    const result: taskItem[] = [];

    while (i < formNames.length) {
      const formName = formNames[i];
      await forms[formName]
        .validateFields()
        .then((res: taskItem) => {
          result.push(res);
          i += 1;
        })
        .catch((errs) => {
          const txt = `【${items[i]?.label}】中有报错，请检查后再次提交`;
          setHelp(txt);
          i += formNames.length;
          return;
        });
    }
    console.log(result, '最后的结果');
  };

  return (
    <Form.Provider
      onFormFinish={submitForms}
      onFormChange={(name, { values, forms }) => {
        if (name === defaultKey) {
          const defaultValues = forms[defaultKey]?.getFieldsValue();
          const { name } = defaultValues;
          const arrItems = [...items];

          const arr = arrItems.map((val: any) => ({
            ...val,
            label: val.key === defaultKey ? name : val?.label,
          }));
          setItems(arr);
        }

        formRef.current = forms;
        setHelp('');
      }}
    >
      <Tabs
        type="editable-card"
        onChange={onChange}
        activeKey={activeKey}
        onEdit={onEdit}
        items={items}
        tabBarExtraContent={
          <Button type="text" block icon={<CopyOutlined />} onClick={copyTask}>
            复制
          </Button>
        }
      />
      <Form>
        <Form.Item
          help={
            <span style={{ color: 'red', justifyContent: 'flex-end' }}>
              {help}
            </span>
          }
        />
        <Form.Item>
          <Button htmlType="submit" type="primary">
            提交
          </Button>
        </Form.Item>
      </Form>
    </Form.Provider>
  );
};

export default App;
