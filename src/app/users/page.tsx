"use client"

import CustomedTable from "@/Components/CustomedTable"
import {getcolumns,formLists} from './config'
import { useMemo } from "react"
import CustomModalForm from "@/Components/CustomModalForm"
import useTaskHooks from './hooks'
import { onFinish } from "@/services/user"

export default ()=>{
  const {
    form,
    isOpen,
    setIsOpen,
    // setCurRecord
  }=useTaskHooks()

  const columns=useMemo(()=>getcolumns({setIsOpen,form}),[])

  //table的配置
  const tableConfig={
    url:'/user/list',
    columns,
  }

  //form的配置
  const modalFormProps={
    isOpen,
    setIsOpen,
    form,
    formItems:formLists,
    onFinish:async(values:any)=>{
      const data=await onFinish(values)
      // console.log(data,"promise");
      return true
    }
  }
  
  return <>
    <CustomedTable {...tableConfig} />
    <CustomModalForm {...modalFormProps} />
  </>
}