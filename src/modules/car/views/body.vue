<template>
	<cl-crud ref="Crud">
		<el-row>
			<!-- 刷新按钮 -->
			<cl-refresh-btn />
			<!-- 新增按钮 -->
			<!--			<cl-add-btn />-->
			<el-button type="primary" @click="visible = true">Add</el-button>
			<!-- 删除按钮 -->
			<cl-multi-delete-btn />
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
	<cl-dialog title="Choose car" width="80%" v-model="visible">
		<form-order @choose="chooseOrder" />
	</cl-dialog>
</template>

<script lang="ts" name="car-body" setup>
import { useCrud, useTable, useUpsert } from "@cool-vue/crud";
import { useCool } from "/@/cool";
import FormOrder from "./components/form-order.vue";
import { ref } from "vue";

const { service } = useCool();
const visible = ref<boolean>(false);
// cl-upsert 配置
const Upsert = useUpsert({
	items: [
		{
			label: "Car",
			prop: "carID",
			required: true,
			component: { name: "slot-name" }
		},
		{
			label: "Price",
			prop: "Price",
			component: {
				name: "el-input-number",
				props: { min: 0 },
				placeholder: "Please input price"
			}
		},
		{
			label: "weight",
			prop: "weight",
			component: { name: "el-input-number", placeholder: "Please input weight" }
		}
	]
});

// cl-table 配置
const Table = useTable({
	columns: [
		{ type: "selection" },
		{ label: "ID", prop: "id" },
		{ label: "Car", prop: "carID" },
		{ label: "QrCode", prop: "qrCode" },
		{ label: "Price", prop: "price" },
		{ label: "Weight", prop: "weight" },
		{ type: "op", buttons: ["edit", "delete"] }
	]
});
function chooseOrder() {}
// cl-crud 配置
const Crud = useCrud(
	{
		service: service.car.body
	},
	(app) => {
		app.refresh();
	}
);
</script>
