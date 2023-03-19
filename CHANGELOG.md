# Changelog

## [3.14.0] - 2023-3-19
- 更新: @zenweb/body: ^3.6.0

## [3.13.1] - 2023-3-18
- 导出: RawBody, TextBody

## [3.13.0] - 2023-3-17
- 更新: @zenweb/body: ^3.5.0
  - 重构数据流读取, 新增 RawBody 和 TextBody，可扩展的解析器

## [3.12.2] - 2023-3-15
- 更新：@zenweb/body: ^3.2.2  xml 类型

## 3.12.1
- 导出: ParamHelper

## 3.12.0
- 更新: @zenweb/body: ^3.2.0  ObjectBody

## 3.11.1
> null 大检查! 所有项目强制开启 TS strict 模式，不再忽略 null 检查
- 更新：
  - @zenweb/body: ^3.1.1
  - @zenweb/controller: ^3.9.1
  - @zenweb/core: ^3.5.1
  - @zenweb/helper: ^3.3.1
  - @zenweb/log: ^3.2.1
  - @zenweb/messagecode: ^3.2.1
  - @zenweb/meta: ^2.4.1
  - @zenweb/result: ^3.0.1

## 3.11.0
- @zenweb/helper: ^3.3.0
  - 去除 Helper
  - 新增 QueryHelper, ParamHelper, TypeCastHelper
- @zenweb/body: ^3.1.0
  - 新增 BodyHelper 数据类型转换&校验

## 3.10.0
- update:
  - @zenweb/core: ^3.5.0
    - 新增: Core.moduleExists
    - 新增: SetupHelper.assertModuleExists
    - 修改: Core.setup 方法增加 name 参数
    - 删除: SetupHelper.checkCoreProperty
    - 删除: SetupHelper.checkContextProperty
  - @zenweb/body: ^3.0.0
    - 使用依赖注入重构，去除 xml 和 文件上传表单支持，取消的这两个作为独立模块分离。
  - @zenweb/helper: ^3.1.0
    - 使用依赖注入重构，不再支持 ctx.helper 调用
  - @zenweb/router: ^3.3.0
  - @zenweb/controller: ^3.9.0
  - @zenweb/messagecode: ^3.2.0
  - @zenweb/inject: ^3.18.0
