
import { useState } from "react"
import {Form} from 'antd'

const useTaskHooks=()=>{
  const [isOpen,setIsOpen]=useState(false)
  // const [curRecord,setCurRecord]=useState<any>({})
  const [form] = Form.useForm();
  
  return {
    form,
    isOpen,
    setIsOpen,
    // setCurRecord
  }
}

export default useTaskHooks