'use client';
import { Descriptions } from 'antd';

export default () => {
  return (
    <div>
      <Descriptions title="设计模式">
        <Descriptions.Item label="观察者模式（发布 - 订阅模式）">
          观察者模式：观察者模式定义了一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都得到通知并被自动更新
          <a href="https://blog.csdn.net/Robinwang1128/article/details/135456535">
            链接
          </a>
        </Descriptions.Item>
        <Descriptions.Item label="策略模式">
          定义了一系列的算法，将每一个算法封装起来，并且使它们可以相互替换。在前端，比如表单验证策略。不同的表单字段可能有不同的验证规则，如用户名验证、密码验证等，可以使用策略模式来封装这些验证规则。
        </Descriptions.Item>
        <Descriptions.Item label="工厂模式">
          工厂模式是一种创建对象的设计模式，其主要目的是定义一个用于创建对象的接口，让子类决定实例化哪一个类。工厂模式使得对象的创建过程与具体实现分离，从而使代码更具灵活性和可维护性。
          工厂模式是一种创建对象的设计模式，它提供了一种创建对象的方式，将对象的创建和使用分离，
          <p>
            简单工厂模式
            在简单工厂模式中，工厂类根据传入的参数决定创建哪个具体类的实例。
          </p>
          <p>
            工厂方法模式
            工厂方法模式将对象的创建委托给子类，使得工厂类不再直接实例化具体的产品，而是通过子类来实现。
          </p>
          <p>
            抽象工厂模式
            抽象工厂模式用于创建一系列相关或相互依赖的对象，而无需指定具体类。
          </p>
        </Descriptions.Item>
        <Descriptions.Item label="单例模式">
          <p> 单例模式确保一个类只有一个实例，并提供一个全局访问点</p>
        </Descriptions.Item>
        <Descriptions.Item label="迭代器模式">
          <p>
            迭代器模式提供一种方法顺序访问一个聚合对象中的各个元素，而不暴露其内部的表示。
          </p>
        </Descriptions.Item>
        <Descriptions.Item label="装饰者模式">
          <p>
            装饰者模式动态地给一个对象添加一些额外的职责，就扩展功能而言，装饰者模式比生成子类更为灵活。
          </p>
        </Descriptions.Item>
        <Descriptions.Item label="适配器模式">
          <p>
            适配器模式是一种结构型设计模式，它的主要作用是将一个类的接口转换成客户期望的另一个接口，使得原本由于接口不兼容而不能一起工作的类可以协同工作
          </p>
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};
