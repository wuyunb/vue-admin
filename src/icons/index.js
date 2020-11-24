import { Icon } from 'element-ui';
import Vue from 'vue';

import svgIcon from './svgConfig';
Vue.component('svg-icon',svgIcon)


/**
 * require.context:读取指定目录的所有文件
 * 第一个参数：文件目录
 * 第二个参数： 是否遍历子集目录
 * 第三：定义文件遍历规则
 * */ 
const req = require.context('./svg',false,/\.svg$/)

const requireAll = (requireContext)=>{
   console.log(213,requireContext.keys().map(requireContext))
   return requireContext.keys().map(requireContext)
}

requireAll(req)