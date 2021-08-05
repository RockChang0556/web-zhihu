<template>
	<div class="app">
		<global-header :user="currentUser"></global-header>
		<div class="container">
			<router-view />
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import GlobalHeader from '@/components/layout/header.vue';

export default defineComponent({
	name: 'app',
	components: {
		GlobalHeader,
	},
	props: {},
	setup() {
		const store = useStore();
		const currentUser = computed(() => store.state.user.userInfo);
		// 获取用户信息
		const getCurrentUser = async () => {
			const token = localStorage.getItem('token');
			if (token) {
				store.dispatch('user/getUserInfo');
			}
		};
		getCurrentUser();

		return {
			currentUser,
		};
	},
});
</script>
<style lang="less">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: left;
	color: #2c3e50;
}
.container {
	height: 3000px;
	padding-top: 56px;
}
</style>
