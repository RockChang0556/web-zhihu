<!--
 * @Author: Peng zhang
 * @Date: 2021-02-14 11:37:34
 * @LastEditTime: 2021-02-26 10:28:37
 * @Description:  全局消息组件
-->

<template>
	<div :class="`r-message alert alert-${type}`" role="alert">
		<span>{{ message }}</span>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { messageType } from './index';

export default defineComponent({
	name: 'r-message',
	components: {},
	props: {
		type: {
			type: String as PropType<messageType>,
			default: 'primary',
		},
		message: {
			type: String,
			default: '',
		},
	},
	setup() {
		return {};
	},
});
</script>

<style lang="less">
.r-message {
	position: fixed;
	top: 30px;
	left: 50%;
	transform: translateX(-50%);
	z-index: 9999;
	display: inline-block;
	max-width: 90%;
	word-wrap: break-word;
}
</style>
