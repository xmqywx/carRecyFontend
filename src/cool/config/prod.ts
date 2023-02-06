import { proxy } from "./proxy";

export default {
	// 根地址
	host: proxy["/dev"].target,

	// 请求地址
	baseUrl: "/dev"
};
