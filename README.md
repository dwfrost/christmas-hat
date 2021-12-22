# Vue 3 + Typescript + Vite

This template should help get you started developing with Vue 3 and Typescript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

-   [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's `.vue` type support plugin by running `Volar: Switch TS Plugin on/off` from VSCode command palette.

## 给头像戴个圣诞帽！

基于 https://github.com/252860883/Christmas-hat 项目，使用 vite2+vue3+ts 实现。

#### 上传图片，选择圣诞帽，支持拖拽移动、放大缩小、旋转

![image](http://wx4.sinaimg.cn/mw690/a73bc6a1ly1fnng3ax69ug209m0g8gzh.gif)

#### 调整好圣诞帽，点击保存，生成图片

![image](http://wx3.sinaimg.cn/mw690/a73bc6a1ly1fnnezcryy8g20ao0g8q6w.gif)
