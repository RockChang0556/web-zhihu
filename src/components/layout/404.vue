<!--
 * @Author: Peng zhang
 * @Date: 2021-02-02 17:02:49
 * @LastEditTime: 2021-02-02 17:08:08
 * @Description: not found
-->

<template>
	<div class="empty-404 text-center h1 mt-4">
		页面找不到啦
		<router-link to="/" class="btn btn-link">返回首页</router-link>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
	name: 'empty-404',
	components: {},
	props: {},
	setup() {
		return {};
	},
});
</script>

<style lang="less"></style>
