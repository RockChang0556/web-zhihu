<!--
 * @Author: Peng zhang
 * @Date: 2021-01-29 17:13:14
 * @LastEditTime: 2021-02-02 16:20:54
 * @Description: 
-->

<template>
	<div class="column-list row">
		<div
			class="col-4 card bc-white border-0 text-center"
			v-for="v in list"
			:key="v.id"
		>
			<div class="shadow mb-4 rounded">
				<div class="card-body">
					<img :src="v.avator" class="my-3 rounded-circle border" alt="" />
					<h5 class="card-title">{{ v.title }}</h5>
					<p class="card-text text-left">{{ v.description }}</p>
					<router-link :to="`/detail/${v.id}`" class="btn btn-outline-primary">
						浏览文章
					</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export interface ColumnProps {
	id: number;
	avator: string;
	title: string;
	description: string;
}
export default defineComponent({
	name: 'column-list',
	components: {},
	props: {
		list: {
			type: Array as PropType<ColumnProps[]>,
			required: true,
		},
	},
	setup() {
		return {};
	},
});
</script>

<style lang="less">
.column-list {
	.card-body {
		> img {
			width: 80px;
			height: 80px;
			object-fit: cover;
		}
	}
}
</style>
