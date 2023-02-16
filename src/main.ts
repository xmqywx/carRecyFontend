import { createApp } from "vue";
import App from "./App.vue";
import { bootstrap } from "./cool";
// @ts-ignore
import SimpleTypeahead from "vue3-simple-typeahead";
import "vue3-simple-typeahead/dist/vue3-simple-typeahead.css";
const app = createApp(App);
app.use(SimpleTypeahead);
// 启动
bootstrap(app)
	.then(() => {
		app.mount("#app");
	})
	.catch((err) => {
		console.error("Project start failed", err);
	});
