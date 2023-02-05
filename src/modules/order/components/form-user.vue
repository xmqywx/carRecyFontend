<template>
	<cl-crud ref="Crud">
		<el-row>
			<!-- 刷新按钮 -->
			<cl-refresh-btn />
			<cl-flex1 />
			<cl-filter label="Role">
				<el-select size="mini" v-model="role" @change="filter()">
					<el-option value="" label="All"></el-option>
					<el-option
						v-for="(item, i) in roleList"
						:key="i"
						:value="item.id"
						:label="item.name"
					></el-option>
				</el-select>
			</cl-filter>
			<!-- 关键字搜索 -->
			<cl-search-key />
		</el-row>

		<el-row>
			<!-- 数据表格 -->
			<cl-table ref="Table" />
		</el-row>

		<el-row>
			<cl-flex1 />
			<!-- 分页控件 -->
			<cl-pagination />
		</el-row>
	</cl-crud>
</template>

<script lang="ts" name="菜单名称" setup>
import { useCrud, useTable } from "@cool-vue/crud";
import { useCool } from "/@/cool";
import { ref } from "vue";
const { service } = useCool();
const emit = defineEmits(["choose"]);
const role = ref("");
const roleList = ref<any[]>([]);

async function init() {
	await service.base.sys.role.list().then((res: any[]) => {
		roleList.value = res;
		role.value = roleList.value.find((e) => e.label === "driver").id;
		Crud.value?.refresh({
			roleId: role.value
		});
	});
}
init();
// cl-table 配置
const Table = useTable({
	autoHeight: false,
	columns: [
		{
			label: "Name",
			prop: "username"
		},
		{
			prop: "roleName",
			label: "Role",
			headerAlign: "center",
			minWidth: 120
		},
		{
			prop: "phone",
			label: "Phone",
			minWidth: 150
		},
		{
			prop: "remark",
			label: "Remark",
			minWidth: 150
		},
		{
			type: "op",
			buttons: [
				{
					label: "Choose",
					onClick(options: { scope: obj }) {
						emit("choose", options.scope.row);
					}
				}
			]
		}
	]
});
function filter() {
	Crud.value?.refresh({
		roleId: role
	});
}
// cl-crud 配置
const Crud = useCrud(
	{
		service: service.base.sys.user
	},
	(app) => {
		app.refresh();
	}
);
</script>
