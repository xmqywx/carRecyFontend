import { proxy } from "./proxy";

export default {
	// 根地址
	host: proxy["/dev"].target,

	// 请求地址
	baseUrl: "http://3.104.76.231:8001/dev"
};
