'use client';
import { List, Collapse, Space } from 'antd';
import type { CollapseProps } from 'antd';

export default () => {
  const blank = ' ';
  const data = [
    '1.‌single-spa:Single-Spa是一个流行的微前端框架，它通过动态加载子应用来实现微前端架构。主应用通过路由代理动态加载不同的子应用，每个子应用独立运行在自己的上下文中',
    '2.Module Federation：是一种拆分和加载远程模块的机制',
    '3.iframe：它能够将另一个 HTML 页面嵌入到当前页面中,不存在跨域的问题',
  ];
  const qiankunData = [
    '1.优点：',
    '1) 技术栈无关',
    '2）独立开发、独立部署',
    '3）增量升级:在面对各种复杂场景时，我们通常很难对一个已经存在的系统做全量的技术栈升级或重构，而微前端是一种非常好的实施渐进式重构的手段和策略',
    '4）独立运行时:每个微应用之间状态隔离，运行时状态不共享',
    '2.官方文档：https://qiankun.umijs.org/zh/api',
    '3.通信：initGlobalState在主应用中使用，setGlobalState，onGlobalStateChange',
  ];

  const iframeData = [
    '缺点：',
    'url 不同步。浏览器刷新 iframe url 状态丢失、后退前进按钮无法使用',
    'UI 不同步，DOM 结构不共享',
    '全局上下文完全隔离，内存变量不共享',
    '慢。每次子应用进入都是一次浏览器上下文重建、资源重新加载的过程',
  ];
  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: '解决方案',
      children: (
        <List
          header={null}
          footer={null}
          dataSource={data}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      ),
    },
    {
      key: '2',
      label: '‌single-spa_qiankun',
      children: (
        <List
          header={null}
          footer={null}
          dataSource={qiankunData}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      ),
    },
    {
      key: '3',
      label: 'Iframe',
      children: (
        <List
          header={null}
          footer={null}
          dataSource={qiankunData}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      ),
    },
  ];

  return (
    <div>
      <h1 style={{ fontSize: '24px' }}>微前端：</h1>
      <p>
        一种将前端应用拆分成多个小型、独立、可独立开发、部署和运行的团队或项目的架构模式。每个团队或项目负责自己部分的业务逻辑和UI展示，通过某种方式集成到主应用中，形成一个完整的用户体验‌
      </p>
      <Collapse items={items} defaultActiveKey={['1']} />
    </div>
  );
};
