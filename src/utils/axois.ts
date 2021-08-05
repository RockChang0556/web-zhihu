/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { Method } from 'axios';
import qs from 'qs';
import { rmessage } from '@/components/message';

// const isProd = process.env.NODE_ENV === 'production';

interface FetchService {
	post(url: string, data?: any): Promise<any>;
	get(url: string, param?: any): Promise<any>;
	request(config: FetchRequest): Promise<any>;
}
interface FetchRequest {
	method: Method;
	url: string;
	params: any;
	payload: any;
	extends?: any;
}
// axios 配置
function getInstance(serverPath: string) {
	const http = axios.create({
		baseURL: serverPath,
		timeout: 50000,
		withCredentials: true,
		// headers: { version: 1 },
	});
	// request拦截器
	http.interceptors.request.use(
		(config: any) => {
			const token = localStorage.getItem('token');
			config.headers.common['Authorization'] = 'Bearer ' + token;
			//只针对get方式进行序列化
			if (config.method === 'get') {
				config.paramsSerializer = function(params: any) {
					return qs.stringify(params, { arrayFormat: 'repeat' });
				};
			}
			return config;
		},
		(error: any) => {
			Promise.reject(error);
		}
	);
	// respone拦截器
	http.interceptors.response.use(
		(res: any) => {
			if (res.data instanceof Blob) {
				return res;
			}
			if (res.data.code === 0) {
				return Promise.resolve(res);
			} else {
				rmessage.error(res.data.message || '服务器异常, 请稍后重试!');
				return Promise.reject(res.data);
			}
		},
		(error: any) => {
			const res = error.response;
			if (String(res?.status) === '401') {
				rmessage.error('token过期,请重新登陆!');
				localStorage.removeItem('token');
				// if (location.pathname.indexOf('/404') === -1) {
				// 	window.location.replace(`${location.origin}/404`);
				// }
			} else {
				switch (res.data?.code) {
					default:
						rmessage.error('网络连接出现错误, 请稍后重试!');
				}
				return Promise.reject(res.data);
			}
		}
	);
	return http;
}

class HttpClient implements FetchService {
	private $http: any;
	constructor(apiPath: string) {
		this.$http = getInstance(apiPath);
	}
	public async request(config: FetchRequest) {
		const result = await this.$http.request({
			url: config.url,
			method: config.method,
			params: config.params,
			data: config.payload,
			...config.extends,
		});
		return result.data;
	}
	public async post(url: string, data?: any) {
		const result = await this.$http.post(url, data);
		return result.data;
	}
	public async get(url: string, param?: any) {
		const result = await this.$http({
			url,
			method: 'get',
			params: param,
			withCredentials: true,
		});
		return result.data;
	}
}

export { HttpClient, FetchService };
