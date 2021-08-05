/*
 * @Author: Peng zhang
 * @Date: 2021-01-06 10:12:49
 * @LastEditTime: 2021-04-25 10:11:30
 * @Description:
 */
import { FetchService } from '@/utils/axois';
/**
 * 数据交换格式: JSON
 * @class
 */
export default class {
	public http: FetchService;
	public constructor(http: FetchService) {
		this.http = http;
	}
	/**
	 * 登录
	 * @method
	 */
	public async login(params: { payload?: any; query?: {}; path?: {} }) {
		let path = '';
		path = '/user/login';
		let body: any;
		let queryParameters: any = {};

		if (params.query !== undefined) {
			queryParameters = params.query;
		}
		if (params.payload !== undefined) {
			body = params.payload;
		}

		const result: any = await this.http.request({
			method: 'POST',
			url: path,
			params: queryParameters,
			payload: body,
		});
		return result;
	}
	/**
	 * 获取用户信息
	 * @method
	 */
	public async getCurrentUser(params: {
		payload?: any;
		query?: {};
		path?: {};
	}) {
		let path = '';
		path = '/user/getCurrentUser';
		let body: any;
		let queryParameters: any = {};

		// if (params.path !== undefined) {
		// 	path = path.replace('{formKey}', `${params.path['formKey']}`);
		// }
		if (params.query !== undefined) {
			queryParameters = params.query;
		}
		if (params.payload !== undefined) {
			body = params.payload;
		}

		const result: any = await this.http.request({
			method: 'get',
			url: path,
			params: queryParameters,
			payload: body,
		});
		return result;
	}
}
