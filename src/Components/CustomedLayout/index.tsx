'use client';

import {Layout,Menu,Button} from 'antd'
import {memo, useState} from 'react'
import {LAYOUTMENUS} from '../constant'
import { useRouter } from 'next/navigation'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
// import './index.less'

const { Header, Content, Footer, Sider } = Layout;

const layoutClass='custom'
const contentBgc='#fff'

const CustomedLayout= (props:any)=>{
  const [collapsed,setCollapsed]=useState(false)
  const [selectedKey,setSelectedKey]=useState([])

  const router = useRouter()
  const {children}=props
  
  return <Layout className={layoutClass} style={{height:"100vh"}}>
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <Header style={{ padding: 0}}>
        <div className={`${layoutClass}__siderHeader`} style={{display:"flex",alignItems:"center",width:"200px",overflow:"hidden"}}>
          <img src="https://github.githubassets.com/favicons/favicon.png" style={{height:"50px"}} />
          <h2 style={{color:"#fff",fontSize:"18px",marginLeft:collapsed?"30px":"10px"}}>用户管理</h2>
        </div>
      </Header> 
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        items={[...LAYOUTMENUS]}
        onSelect={(props:any)=>{
          const keypath=props?.item?.props?.keypath
          const {key}=props
          setSelectedKey([key])
          router.push(keypath)
        }}
      />
    </Sider>
    <Layout>
      <Header style={{ padding: 0, background:contentBgc }}>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: '16px',
            width: 64,
            height: 64,
          }}
        />
      </Header> 
      <Content style={{ margin: '24px 16px 0'}}>
        <div
          style={{
            padding: 24,
            height:"calc(100vh - 112px)",
            // minHeight: 3000,
            background: contentBgc,
            borderRadius: '10px',
          }}
        >
            {children}
        </div>
      </Content>
    </Layout>
  </Layout>
}

export default memo(CustomedLayout)