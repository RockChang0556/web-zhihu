/*
 * @Author: Peng zhang
 * @Date: 2021-02-14 11:37:40
 * @LastEditTime: 2021-02-26 10:30:35
 * @Description: 将全局消息组件处理成函数式调用
 */

import { createApp } from 'vue';
import RMessage from './message.vue';

export type messageType = 'success' | 'warning' | 'primary' | 'danger';

let timer: number | null = null;
const messageFn = (type: messageType, message: string, timeout = 2000) => {
	// 防抖, 只能同时出现一个提示
	if (timer) return;

	// 创建挂载dom
	const messageNode = document.createElement('div');
	messageNode.className = 'message';
	document.body.appendChild(messageNode);

	// 实例化提示组件
	const messageInstance = createApp(RMessage, {
		type,
		message,
	});
	messageInstance.mount(messageNode);

	// 延时关闭提示
	timer = setTimeout(() => {
		messageInstance.unmount(messageNode);
		document.body.removeChild(messageNode);
		timer = null;
	}, timeout);
};

export const rmessage = {
	primary: (message: string, timeout?: number) =>
		messageFn('primary', message, timeout),
	success: (message: string, timeout?: number) =>
		messageFn('success', message, timeout),
	error: (message: string, timeout?: number) =>
		messageFn('danger', message, timeout),
	warning: (message: string, timeout?: number) =>
		messageFn('warning', message, timeout),
};
