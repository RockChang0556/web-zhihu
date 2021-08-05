<template>
	<div class="detail">
		<pre>{{ route }}</pre>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';
export default defineComponent({
	name: 'detail',
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
