<template>
	<div class="posts-create">
		<pre>{{ route }}</pre>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';
export default defineComponent({
	name: 'posts-create',
	components: {},
	props: {},
	setup() {
		const route = useRoute();
		return {
			route,
		};
	},
});
</script>

<style lang="less"></style>
