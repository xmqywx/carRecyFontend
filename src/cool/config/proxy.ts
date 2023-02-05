export const proxy = {
	"/dev": {
		target: "http://3.104.76.231:8001",
		changeOrigin: true,
		rewrite: (path: string) => path.replace(/^\/dev/, "")
	},

	"/prod": {
		target: "http://3.104.76.231:8001",
		changeOrigin: true,
		rewrite: (path: string) => path.replace(/^\/prod/, "/api")
	}
};
