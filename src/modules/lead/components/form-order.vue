<template>
	<cl-crud ref="Crud">
		<el-row>
			<!-- 刷新按钮 -->
			<cl-refresh-btn />
<!--			<cl-add-btn>Add</cl-add-btn>-->
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
import dayjs from "dayjs";
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
	columns: [
		{ type: "selection" },
		// { label: "ID", prop: "id" },
		{ label: "Car", prop: "carID", type: "expand", width: 50 },
		{
			label: "Customer",
			prop: "customerID",
			formatter: (row) => {
				return row.firstName + " " + row.surname;
			}
		},
		{ label: "Status", prop: "status" },
		{
			label: "Quoted Price",
			prop: "recommendedPrice",
			formatter: (row) => {
				return row.recommendedPrice ? "$" + Number(row.recommendedPrice).toFixed(2) : "";
			}
		},
		{
			label: "Payment Price",
			prop: "actualPaymentPrice",
			formatter: (row) => {
				return row.actualPaymentPrice
					? "$" + Number(row.actualPaymentPrice).toFixed(2)
					: "";
			}
		},
		{
			label: "Pickup Address",
			prop: "pickupAddress"
		},
		{
			label: "Create Time",
			prop: "createTime",
			formatter: (row) => {
				return dayjs(row.createTime).format("DD-MM-YYYY HH:mm");
			}
		},
		// { label: "更新时间", prop: "updateTime" },
		{
			label: "Options",
			type: "op",
			width: 250,
			buttons: [
				{
					label: "Action",
					icon: "Message",
					onClick(options: { scope: obj }) {
						selectedOrder = options.scope.row;
						orderID.value = options.scope.row.id;
						visibleAction.value = true;
					}
				}
			]
		}
	]
});
// cl-crud 配置
const Crud = useCrud(
	{
		service: service.order.info
	},
	(app) => {
		app.refresh();
	}
);
</script>
