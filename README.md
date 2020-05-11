# Uploader

## Des

本项目为一个网盘系统，大致支持用户上传文件、预览文件、下载文件。  
线上地址：[欢迎体验](http://120.77.208.81)

## Feature

### Done

1. 支持文件断点上传，本质上是将文件分片进行传输。
2. 新建文件夹

### Todo

1. 文件夹上传
2. 错误处理

## Core

在设计上，实现了三个层次的抽象概念

1. uploader层，作为顶级对象层，包含 task 列表属性，单例。
2. task 层，作为中级对象层 核心，包含 taskLint 列表属性，item 为 taskSubItem， 用来控制任务的暂停、开始、重试等。
3. taskSubItem 层，作为底层对象，分为两类：file、dir 向上暴露 上传 接口，向下的话，file 需要封装与 chunk 的逻辑。

特殊的，在 file 上传过程中，需要实现 chunk, 也就是数据的上传。

## 技术栈

1. 尝试 hooks 真香
2. 使用 hox 管理全局 state
