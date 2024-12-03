'use client';
import { Descriptions } from 'antd';

export default () => {
  return (
    <div>
      <Descriptions title="HTTP 与 HTTPS 的主要区别如下：">
        <Descriptions.Item label="安全性">
          https用tls加密数据，http不需要
        </Descriptions.Item>
        <Descriptions.Item label="端口">
          http的端口为443，https为80
        </Descriptions.Item>
        <Descriptions.Item label="url">https和http开头</Descriptions.Item>
        <Descriptions.Item label="证书">
          HTTPS 网站需要由受信任的证书颁发机构颁发的 SSL 证书
        </Descriptions.Item>
        <Descriptions.Item label="性能">
          HTTPS 通常比 HTTP 慢一点，因为加密和解密数据需要一些额外的时间。
        </Descriptions.Item>
      </Descriptions>
      ;
    </div>
  );
};
