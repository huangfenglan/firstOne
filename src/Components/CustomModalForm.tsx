"use client"

import {Modal,Form,Button,Space} from 'antd'
import { useState } from 'react'
const {Item}=Form

export default ({
  isOpen=true,
  setIsOpen,
  form,
  children,
  formItems=[],
  modalProps={},
  formProps={},
  onFinish
}:any)=>{
  const [isBtnLoading,setIsBtnLoading]=useState(false)

  const curOnFinish=async (values:any)=>{
    setIsBtnLoading(true)
    const isFinished=await onFinish(values)
    isFinished&&setIsBtnLoading(false)
    setIsOpen(false)
  }

  return <Modal   
    title="弹窗"
    open={isOpen} 
    onOk={()=>{}}
    footer={null}
    onCancel={()=>setIsOpen(false)}
    {...modalProps}
    >
      <Form form={form} onFinish={curOnFinish} {...formProps}>
        {formItems.map((itemProps:any)=><Item key={itemProps?.key} {...itemProps} />)}
        {children}
        <Form.Item wrapperCol={{ offset:16, span: 8 }}>
          <Space>
            <Button type="primary" htmlType="submit" loading={isBtnLoading}>
              提交
            </Button>
            <Button onClick={()=>setIsOpen(false)}>取消</Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
}