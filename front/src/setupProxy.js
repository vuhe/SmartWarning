// eslint-disable-next-line @typescript-eslint/no-var-requires
const proxy = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    proxy.createProxyMiddleware({
      target: 'https://sw.zhuhe.site',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    }),
  );
};
