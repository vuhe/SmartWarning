import { ProxyTable } from '../typings/server';

const proxyTable: ProxyTable = {
  '/path_to_be_proxy': { target: 'https://sw.zhuhe.site/api/', changeOrigin: true },
};

export default proxyTable;
