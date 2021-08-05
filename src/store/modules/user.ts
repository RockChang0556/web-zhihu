/* eslint-disable @typescript-eslint/no-explicit-any */
import { extendsServiceAuto } from '@/services';
import router from '@/router';

export interface UserProps {
	id?: number;
	name?: string;
	admin?: '0' | '1' | '2' | '3' | '4' | '5';
	email?: string;
}
interface StateProps {
	lang: string;
	userInfo: UserProps;
}
// initial state
const state: StateProps = {
	lang: 'zh',
	userInfo: {},
};

// getters
const getters = {};

// actions
const actions = {
	logout({ commit }: any) {
		commit('setUserInfo', {});
		localStorage.removeItem('token');
		router.push('/login');
	},
	async getUserInfo({ commit }: any) {
		const userInfo = await extendsServiceAuto.getCurrentUser({});
		if (userInfo && userInfo.code === 0 && userInfo.data.id) {
			commit('setUserInfo', userInfo.data);
		}
	},
};

// mutations
const mutations = {
	setUserInfo(state: StateProps, userInfo: UserProps) {
		state.userInfo = userInfo;
		sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
	},
	setLang(state: StateProps, lang: string) {
		state.lang = lang;
		sessionStorage.setItem('lang', lang);
	},
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
};
