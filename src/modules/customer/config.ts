import { Merge, ModuleConfig } from "/@/cool";
import Crud from "@cool-vue/crud";
import "@cool-vue/crud/dist/index.css";
const en = {
	op: "Operation",
	add: "Add",
	delete: "Delete",
	multiDelete: "Delete",
	update: "Edit",
	refresh: "Refresh",
	info: "Info",
	search: "Search",
	reset: "Reset",
	clear: "Clear",
	save: "Save",
	close: "Close",
	confirm: "Confirm",
	advSearch: "Advanced Search",
	searchKey: "Search keyword",
	placeholder: "Please enter ",
	tips: "Warning",
	saveSuccess: "Save successful",
	deleteSuccess: "Delete successful",
	deleteConfirm: "Will permanently delete the data, continue?",
	empty: "Empty Data"
};
export default (): Merge<ModuleConfig, CrudOptions> => {
	return {
		options: {
			dict: {
				sort: {
					prop: "order",
					order: "sort"
				},
				label: en
			}
		},
		install: Crud.install
	};
};
