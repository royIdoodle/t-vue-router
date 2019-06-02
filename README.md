## 手写框架系列——简易版VueRouter

本项目是为研究学习Vue-Router原理而写，达到理解原理、加强记忆的目的。

## Vue-Router原理

Hash模式下，底层依赖于浏览器的"hashChange"事件。所以主要实现思路如下：

* 通过Vue的mixin方法，向Vue原型上注入$router对象

* Router对象内部实现<router-view>和<router-link>两个组件

* <router-link>组件内部只有一个<a>标签，里面一个slot，:to属性的值可以赋值给<a>标签的href属性

* 通过监听"hashChange"事件，来动态加载路由表中的内容并听过render函数渲染对象组件
