import { Card } from 'antd';

export default () => {
  const methods = [
    {
      title: '预加载',
      content: [
        '预加载就是提前加载需要用到的图片素材，在用户需要用的时候可以直接从本地缓存中获取并渲染',
        '利用`link`标签的`rel="preload"`属性（推荐）**',
      ],
    },
    {
      title: '懒加载',
      content: [
        '懒加载其实也叫做延迟加载、按需加载，在比较长的网页或应用中，如果图片有很多，一下子之间把所有的图片都加载出来的话，耗费很多性能，而且用户不一定会把图片全部看完。只有当图片出现在浏览器的可视区域内时，让图片显示出来，这就是图片懒加载',
        'getBoundingClientRect',
        'IntersectionObserver',
      ],
    },
    { title: '滚动加载' },
    { title: '虚拟加载' },
    // { title: '虚拟加载' },
  ];
  return (
    <div>
      <Card
        title="预加载------实现方式"
        extra={<a href="#">More</a>}
        style={{ width: 300 }}
      >
        <p>Card content</p>
      </Card>
    </div>
  );
};
