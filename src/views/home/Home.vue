<template>
	<div class="home">
		<!-- 新建专栏 -->
		<router-link class="btn btn-primary my-4" to="/create">
			新建专栏
		</router-link>
		<!-- 专栏列表 -->
		<column-list :list="list"></column-list>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import ColumnList, { ColumnProps } from './column-list.vue';

const list: ColumnProps[] = [
	{
		id: 1,
		avator:
			'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3363295869,2467511306&fm=26&gp=0.jpg',
		title: '标题1',
		description:
			'With supporting text below as a natural lead-in to additional content',
	},
	{
		id: 2,
		avator:
			'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3363295869,2467511306&fm=26&gp=0.jpg',
		title: '标题2',
		description:
			'With supporting text below as a natural lead-in to additional content',
	},
	{
		id: 3,
		avator:
			'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3363295869,2467511306&fm=26&gp=0.jpg',
		title: '标题3',
		description:
			'With supporting text below as a natural lead-in to additional content',
	},
	{
		id: 4,
		avator:
			'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3363295869,2467511306&fm=26&gp=0.jpg',
		title: '标题4',
		description:
			'With supporting text below as a natural lead-in to additional content',
	},
];
export default defineComponent({
	name: 'Home',
	components: {
		ColumnList,
	},
	setup() {
		return {
			list,
		};
	},
});
</script>
