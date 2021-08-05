module.exports = {
	chainWebpack: config => {
		config.plugin('html').tap(args => {
			args[0].title = '之乎者也';
			return args;
		});
	},
	devServer: {
		proxy: {
			[process.env.VUE_APP_BASE_API]: {
				target: 'http://localhost:3000/',
				changeOrigin: true, // 是否改变域名
				ws: true,
			},
		},
	},
};
