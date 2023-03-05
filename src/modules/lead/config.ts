import { ModuleConfig, config } from "/@/cool";
import "./static/css/index.scss";

export default (): ModuleConfig => {
	return {
		order: 8,
		components: Object.values(import.meta.glob("./components/**/*")),
		install() {
			// 设置标题
			document.title = config.app.name;
		}
	};
};
