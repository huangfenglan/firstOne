'use client';
import { Spin, Table } from 'antd';
import { useState, memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getMockResult } from '@/utils/request';
import { User } from '@/services/userTs';

interface TableTs {
  url: string;
  columns: any[];
  params: {
    [key: string]: any;
  };
  paginationProps: any;
  [key: string]: any;
}

interface CountTs {
  conut: { usersList: User[] };
}

const cTable = ({
  url,
  columns,
  params: extraParams = {}, //除了current,pagesize这些参数以外的参数
  paginationProps = {},
  ...rest
}: TableTs) => {
  const [isLoadingData, setIsLoadingData] = useState(false);
  const usersList = useSelector(
    ({ conut: { usersList } }: CountTs) => usersList
  );
  const [params, setParams] = useState({
    ...extraParams,
    current: 1,
    pageSize: 10,
  });
  const [dataSource, setDataSource] = useState<any[]>([]);

  const getTableData = async () => {
    setIsLoadingData(true);
    const result: any = (await getMockResult(usersList, '')) || [];
    setIsLoadingData(false);
    setDataSource(result);
  };

  useEffect(() => {
    getTableData();
  }, [usersList]);
  const total = !!usersList && usersList?.length;

  return (
    <Spin tip="加载中，请稍后" spinning={isLoadingData}>
      <Table
        dataSource={dataSource}
        columns={columns}
        scroll={{ x: 1300 }}
        pagination={{
          current: params?.current,
          pageSize: params?.pageSize,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total) => `共 ${total} 条`,
          total: total,
          onChange: (current: number, pageSize: number) => {
            setParams({ ...params, current, pageSize });
          },
          ...paginationProps,
        }}
        {...rest}
      />
    </Spin>
  );
};

export default memo(cTable);
