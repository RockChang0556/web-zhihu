<!--
 * @Author: Peng zhang
 * @Date: 2021-01-29 18:31:52
 * @LastEditTime: 2021-02-26 10:40:56
 * @Description: 
-->

<template>
	<div class="global-header fixed-top">
		<nav class="navbar navbar-dark bg-primary pr-4 pl-3">
			<router-link class="navbar-brand" to="/">之乎者也</router-link>
			<div v-if="!user.id">
				<router-link to="/login" class="btn btn-success mr-2">
					登录
				</router-link>
				<router-link to="/register" class="btn btn-outline-light">
					注册
				</router-link>
			</div>
			<dropdown v-else>
				{{ user.name }}
				<template #menu>
					<a class="dropdown-item" href="#" @click.prevent="logout">退出登录</a>
				</template>
			</dropdown>
		</nav>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { useStore } from 'vuex';
import { UserProps } from '@/store/modules/user';
import Dropdown from '@/components/dropdown.vue';

export default defineComponent({
	name: 'global-header',
	components: {
		Dropdown,
	},
	props: {
		user: {
			type: Object as PropType<UserProps>,
			default: () => ({}),
		},
	},
	setup() {
		const store = useStore();
		const logout = () => {
			store.dispatch('user/logout');
		};
		return {
			logout,
		};
	},
});
</script>

<style lang="less">
.global-header {
	.r-dropdown .dropdown-menu {
		min-width: 100px;
		max-width: 120px;
		left: -50px;
	}
}
</style>
