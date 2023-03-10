<template>
	<cl-crud ref="Crud">
		<el-row>
			<!-- 刷新按钮 -->
			<cl-refresh-btn>Refresh</cl-refresh-btn>
			<!-- 新增按钮 -->
			<cl-add-btn>Add</cl-add-btn>
			<!-- 删除按钮 -->
<!--			<cl-multi-delete-btn>Delete</cl-multi-delete-btn>-->
			<cl-flex1 />
			<!--			<cl-filter label="Name">-->
			<!--				<el-input placeholder="Please input name" clearable v-model="form.name" size="mini"></el-input>-->
			<!--			</cl-filter>-->
			<!-- 关键字搜索 -->
			<cl-search-key placeholder="Search"></cl-search-key>
		</el-row>

		<el-row>
			<!-- 数据表格 -->
			<cl-table ref="Table" :context-menu="[]" stripe @expand-change="expandChange">
				<template #column-id="{ scope }">
					<div style="padding: 10px">
						<el-table size="small" :data="scope.row?.cars" :show-header="false">
							<el-table-column prop="model" label="Model" width="180" />
							<el-table-column prop="brand" label="Brand" width="180" />
							<el-table-column prop="year" label="Year" />
							<el-table-column prop="colour" label="Colour" />
						</el-table>
					</div>
				</template>
			</cl-table>
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

<script lang="ts" name="customer-profile" setup>
import { useCrud, useTable, useUpsert } from "@cool-vue/crud";
import { storage, useCool } from "/@/cool";
import dayjs from "dayjs";

const { service } = useCool();

// cl-upsert 配置
const Upsert = useUpsert({
	onSubmit(data: obj, event: { close: fn; done: fn; next: ClCrud.Service["api"]["update"] }) {
		const departmentId = storage.get("departmentID");
		event
			.next({
				...data,
				departmentId
			})
			.then(() => {
				Crud.value?.refresh();
				event.close();
			});
	},
	items: [
		{
			label: "First Name",
			span: 12,
			prop: "firstName",
			rules: [
				{
					required: true,
					message: "First name is required"
				}
			],
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
			rules: [
				{
					required: true,
					message: "Surname is required"
				}
			],
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
			rules: [
				{
					required: true,
					message: "Email is required"
				},
				{
					type: "email",
					message: "Please enter a valid email"
				}
			],
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
			rules: [
				{
					required: true,
					message: "Phone number is required"
				}
			],

			// rules: { type: "number", message: "Please input correct phone number." },
			component: {
				name: "el-input",
				props: {
					placeholder: "Please input phone number"
				}
			}
		},
		{
			label: "Address",
			prop: "address",
			component: {
				name: "el-input",
				props: {
					placeholder: "Please input address"
				}
			}
		},
		{
			label: "Licence",
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
	columns: [
		// { type: "selection" },
		// { label: "ID", prop: "id" },
		{ label: "First name", prop: "firstName" },
		{ label: "Surname", prop: "surname" },
		{ label: "Cars", prop: "id", type: "expand", width: 70 },
		{ label: "Email", prop: "emailAddress" },
		{ label: "Phone", prop: "phoneNumber" },
		{ label: "Address", prop: "address" },
		{ label: "Licence", prop: "licence" },
		{
			label: "Created time",
			prop: "createTime",
			formatter: (row) => {
				return dayjs(row.createTime).format("DD-MM-YYYY HH:mm");
			}
		},
		// {
		// 	label: "Updated time",
		// 	prop: "updateTime",
		// 	formatter: (row) => {
		// 		return dayjs(row.createTime).format("DD-MM-YYYY HH:mm");
		// 	}
		// },
		{
			type: "op",
			label: "Options",
			buttons: ["edit"]
		}
	]
});
async function expandChange(row: any, expand: any) {
	console.log(row, expand);
	if (expand.length) {
		row.cars = await service.car.base.list({
			customerID: row.id
		});
	}
}
// cl-crud 配置
const Crud = useCrud(
	{
		service: service.customer.profile,
		async onRefresh(params, { next }) {
			await next({
				...params,
				departmentId: storage.get("departmentID")
			});
		}
	},
	(app) => {
		app.refresh();
	}
);
</script>
