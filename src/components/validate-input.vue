<!--
 * @Author: Peng zhang
 * @Date: 2021-02-01 14:57:44
 * @LastEditTime: 2021-02-02 11:04:05
 * @Description: 带校验的输入框
-->

<template>
	<div class="validate-input" :class="myclass">
		<input
			v-bind="$attrs"
			class="form-control"
			:class="
				inputValidation.validated
					? inputValidation.error
						? 'is-invalid'
						: 'is-valid'
					: ''
			"
			:value="inputVal"
			@input="onChangeInputVal"
			@blur="onValidate"
		/>
		<!-- 校验提示文案 -->
		<div class="invalid-feedback" v-if="inputValidation.error">
			{{ inputValidation.message }}
		</div>
		<!-- <template v-if="inputValidation.validated">
			<div class="valid-feedback" v-else>
				{{ inputValidation.message }}
			</div>
		</template> -->
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, reactive, onMounted } from 'vue';
import { mitter } from '@/components/validate-form.vue';

interface RuleProp {
	type: 'required' | 'email';
	message: string;
}
export type RuleProps = RuleProp[];

const emailValid = /^$|^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$/;
export default defineComponent({
	name: 'validate-input',
	components: {},
	props: {
		rules: {
			type: Array as PropType<RuleProps>,
		},
		modelValue: {
			type: String,
		},
		class: {
			type: String,
		},
	},
	inheritAttrs: false,
	setup(props, context) {
		// 输入框绑定值
		const inputVal = ref(props.modelValue || '');
		const onChangeInputVal = (e: KeyboardEvent) => {
			const val = (e.target as HTMLInputElement).value;
			inputVal.value = val;
			context.emit('update:modelValue', val);
		};

		// 输入框校验结果
		const inputValidation = reactive({
			validated: false, // 是否校验过
			error: false, // 是否错误
			message: '', // 错误信息 - 校验之前为成功文案
		});
		const onValidate = () => {
			if (props.rules?.length) {
				const allPassed = props.rules.every(v => {
					let passed = true;
					switch (v.type) {
						case 'required':
							passed = inputVal.value.trim() !== '';
							break;
						case 'email':
							passed = emailValid.test(inputVal.value);
							break;
						default:
							break;
					}
					// 校验失败, 赋值错误文案
					if (!passed) {
						inputValidation.message = v.message;
					}
					return passed;
				});

				// 校验结束
				inputValidation.validated = true;
				inputValidation.error = !allPassed;
				if (allPassed) {
					inputValidation.message = '校验通过';
				}
				return allPassed;
			}
			return true;
		};

		onMounted(() => {
			mitter.emit('form-item-created', onValidate);
		});
		return {
			myclass: props.class,
			inputVal,
			onChangeInputVal,
			inputValidation,
			onValidate,
		};
	},
});
</script>

<style lang="less"></style>
