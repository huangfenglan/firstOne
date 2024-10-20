"use client"
import {Table} from 'antd'
import { useState,memo, useEffect } from 'react'
import {fetch} from '@/utils/request'

const cTable= ({
  url,
  columns,
  params:extraParams={}, //除了current,pagesize这些参数以外的参数
  paginationProps={},
  ...rest
}:any)=>{
  const [params,setParams]=useState({...extraParams,current:1,pageSize:10})
  const [dataSource,setDataSource]=useState<any>({})

  const getTableData=async (param:any)=>{
    const result=await fetch({url,method:"get",data:{...param}})
    const {data:tableData}=result
    setDataSource(tableData)
  }

  useEffect(()=>{
    // getTableData(params)
  },[params])
  
  return <Table 
  // dataSource={dataSource?.items}
  dataSource={[
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
  ]}
  columns={columns}
  pagination={{
    current:params?.current,
    pageSize:params?.pageSize,
    showSizeChanger:true,
    showQuickJumper:true,
    // showTotal:(total) => `共 ${dataSource?.total} 条`
    showTotal:(total) => `共 ${100} 条`,
    total:100,
    // total:dataSource?.total,
    onChange:(current:number,pageSize:number)=>{
      setParams({...params,current,pageSize})
      
    },
    ...paginationProps
  }}
  {...rest} 
/>;
}

export default memo(cTable)