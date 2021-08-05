<!--
 * @Author: Peng zhang
 * @Date: 2021-02-01 18:08:11
 * @LastEditTime: 2021-02-18 09:51:49
 * @Description: 
-->

<template>
	<form class="validate-form">
		<slot></slot>
		<div class="validate-form-btns text-center">
			<div class="form-submit d-inline-block" @click.prevent="onSubmit">
				<slot name="submit">
					<button type="submit" class="btn btn-primary">提交</button>
				</slot>
			</div>
		</div>
	</form>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue';
import mitt from 'mitt';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mitter: any = mitt();
type formItemValidateProp = () => boolean;
const useFormItemValidateFuncs = () => {
	let formItemValidateArr: formItemValidateProp[] = [];
	const fallback = (itemRef: formItemValidateProp) => {
		formItemValidateArr.push(itemRef);
	};
	mitter.on('form-item-created', fallback);
	onUnmounted(() => {
		mitter.off('form-item-created', fallback);
		formItemValidateArr = [];
	});

	return formItemValidateArr;
};
export default defineComponent({
	name: 'validate-form',
	components: {},
	props: {},
	emits: ['submit'],
	setup(props, context) {
		const formItemValidateArr = useFormItemValidateFuncs();
		const onSubmit = () => {
			const valid = formItemValidateArr
				.map(func => func()) // 校验所有表单项
				.every(valid => valid); // 都为true才是true,false一个则停止循环
			context.emit('submit', valid);
		};

		return {
			onSubmit,
		};
	},
});
</script>

<style lang="less"></style>
