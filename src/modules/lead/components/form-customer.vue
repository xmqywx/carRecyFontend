<template>
	<cl-crud ref="Crud">
		<el-row>
			<!-- 刷新按钮 -->
			<cl-refresh-btn />
			<cl-add-btn>Add</cl-add-btn>
			<cl-flex1 />
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
		<!-- 新增、编辑 -->
		<cl-upsert ref="Upsert" />
	</cl-crud>
</template>

<script lang="ts" name="菜单名称" setup>
import { useCrud, useTable, useUpsert } from "@cool-vue/crud";
import { useCool } from "/@/cool";
const { service } = useCool();
const emit = defineEmits(["chooseCustomer"]);
const Upsert = useUpsert({
	items: [
		{
			label: "First Name",
			span: 12,
			prop: "firstName",
			required: true,
			component: {
				name: "el-input",
				props: {
					placeholder: "Please input first name"
				}
			}
		},
		{
			label: "Surname",
			span: 12,
			prop: "surname",
			required: true,
			component: {
				name: "el-input",
				props: {
					placeholder: "Please input surname"
				}
			}
		},
		{
			label: "Email",
			span: 12,
			prop: "emailAddress",
			component: {
				name: "el-input",
				props: {
					placeholder: "Please input email address"
				}
			}
		},
		{
			label: "Phone",
			span: 12,
			prop: "phoneNumber",
			props: {
				placeholder: "test",
				mergeProp: true,
				error: "Please input phone number"
			},
			rules: { type: "number", message: "Please input correct phone number." },
			component: {
				name: "el-input",
				props: {
					placeholder: "Please input phone number"
				}
			}
		},
		{
			label: "address",
			prop: "address",
			component: {
				name: "el-input",
				props: {
					placeholder: "Please input address"
				}
			}
		},
		{
			label: "licence",
			prop: "licence",
			component: {
				name: "el-input",
				props: {
					placeholder: "Please input licence code"
				}
			}
		}
	]
});
// cl-table 配置
const Table = useTable({
	autoHeight: false,
	columns: [
		{
			label: "Name",
			prop: "username",
			formatter: (row) => {
				return row.firstName + " " + row.surname;
			}
		},
		{ label: "Email", prop: "emailAddress" },
		{ label: "phone", prop: "phoneNumber" },
		{ label: "address", prop: "address" },
		{ label: "licence", prop: "licence" },
		{
			type: "op",
			buttons: [
				{
					label: "Choose",
					type: "primary",
					icon: "Check",
					onClick(options: { scope: obj }) {
						emit("chooseCustomer", options.scope.row);
					}
				}
			]
		}
	]
});

// cl-crud 配置
const Crud = useCrud(
	{
		service: service.customer.profile
	},
	(app) => {
		app.refresh();
	}
);
</script>
