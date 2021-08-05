<!--
 * @Author: Peng zhang
 * @Date: 2021-02-01 15:28:03
 * @LastEditTime: 2021-04-14 11:54:54
 * @Description: 登录
-->

<template>
	<div class="login">
		<validate-form
			class="needs-validation mx-auto shadow p-4"
			style="max-width: 540px"
			@submit="onSubmitForm"
		>
			<!-- 邮箱 -->
			<div class="form-group row mb-3">
				<label class="col-form-label">邮箱</label>
				<validate-input
					v-model="loginData.email"
					:rules="loginRules.email"
					placeholder="请输入邮箱"
				></validate-input>
			</div>
			<!-- 密码 -->
			<div class="form-group row mb-3">
				<label class="col-form-label">密码</label>
				<validate-input
					v-model="loginData.password"
					:rules="loginRules.password"
					placeholder="请输入密码"
					autocomplete="on"
					type="password"
				></validate-input>
			</div>
			<div class="row">{{ loginData }}</div>
			<template #submit>
				<span class="btn btn-primary">登录</span>
			</template>
		</validate-form>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { extendsServiceAuto } from '@/services';
import ValidateInput, { RuleProps } from '@/components/validate-input.vue';
import ValidateForm from '@/components/validate-form.vue';

interface Rules {
	[key: string]: RuleProps;
}
export default defineComponent({
	name: 'login',
	components: {
		ValidateInput,
		ValidateForm,
	},
	setup() {
		const router = useRouter();
		const store = useStore();

		const loginData = reactive({
			email: 'peng@163.com',
			password: '1',
		});
		const loginRules: Rules = reactive({
			email: [
				{ type: 'required', message: '邮箱必填' },
				{ type: 'email', message: '请输入正确的邮箱格式' },
			],
			password: [{ type: 'required', message: '密码必填' }],
		});

		const onSubmitForm = async (valid: boolean) => {
			if (valid) {
				// 登录
				const res = await extendsServiceAuto.login({ payload: loginData });
				if (res.code !== 0) {
					return;
				}
				localStorage.setItem('token', res.data?.token);
				store.dispatch('user/getUserInfo');
				router.push('/');
			}
		};
		return {
			loginData,
			loginRules,
			onSubmitForm,
		};
	},
});
</script>

<style lang="less">
.login {
	margin-top: 100px;
}
</style>
