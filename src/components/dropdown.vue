<!--
 * @Author: Peng zhang
 * @Date: 2021-02-01 11:02:54
 * @LastEditTime: 2021-02-26 10:37:07
 * @Description: 
-->

<template>
	<div class="r-dropdown dropdown" ref="dropdownRef">
		<span
			class="btn dropdown-toggle text-light"
			id="dropdownMenuButton"
			data-toggle="dropdown"
			aria-haspopup="true"
			aria-expanded="false"
			@click.prevent="toggleOpen"
		>
			<slot name="default">Dropdown button</slot>
		</span>
		<div
			class="dropdown-menu"
			aria-labelledby="dropdownMenuButton"
			v-show="isOpen"
		>
			<slot name="menu">
				<a class="dropdown-item" href="#">Action</a>
			</slot>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useClickOutside } from '@/hooks';
export default defineComponent({
	name: 'dropdown',
	components: {},
	props: {},
	setup() {
		const isOpen = ref(false);
		const toggleOpen = () => {
			console.log('', isOpen.value);
			isOpen.value = !isOpen.value;
		};

		// 点击下拉菜单外区域关闭下拉菜单
		const dropdownRef = ref<null | HTMLElement>(null);
		const { isClickOutside } = useClickOutside(dropdownRef);
		watch(isClickOutside, () => {
			if (isOpen.value && isClickOutside.value) {
				isOpen.value = false;
			}
		});
		return {
			isOpen,
			toggleOpen,
			dropdownRef,
		};
	},
});
</script>

<style lang="less">
.r-dropdown {
	.dropdown-toggle {
		outline: none;
	}
	.dropdown-menu {
		min-width: 8rem;
		display: block;
	}
}
</style>
