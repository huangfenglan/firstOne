"use client"

import CustomedTable from "@/Components/CustomedTable"
import {getcolumns} from './config'
import { useMemo } from "react"

export default ()=>{
  const columns=useMemo(()=>{
    return getcolumns()
  },[])

  const tableConfig={
    url:'/user/list',
    columns,
  }
  
  return <CustomedTable {...tableConfig} />
}