<template>
	<cl-crud ref="Crud">
		<el-row>
			<!-- 刷新按钮 -->
			<cl-refresh-btn />
			<!-- 新增按钮 -->
			<cl-add-btn />
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
</template>

<script lang="ts" name="vehicle-index" setup>
import { useCrud, useTable, useUpsert } from "@cool-vue/crud";
import { useCool } from "/@/cool";

const { service } = useCool();

// cl-upsert 配置
const Upsert = useUpsert({
	items: [
		{ label: "Car", prop: "name", component: { name: "el-input" } },
		{ label: "Year", prop: "year", component: { name: "el-input" } },
		{ label: "Brand", prop: "brand", component: { name: "el-input" } },
		{ label: "Model", prop: "model", component: { name: "el-input" } },
		{ label: "Series", prop: "series", component: { name: "el-input" } },
		{ label: "Body style", prop: "bodyStyle", component: { name: "el-input" } },
		{ label: "Door", prop: "doors", component: { name: "el-input" } },
		{ label: "Seats", prop: "seats", component: { name: "el-input" } },
		{
			label: "Fuel Type",
			prop: "fuelType",
			component: {
				name: "el-radio-group",
				options: [
					{ label: "A", value: 1 },
					{ label: "B", value: 0 }
				]
			}
		},
		{ label: "Engine Size Cc", prop: "engineSizeCc", component: { name: "el-input" } },
		{ label: "Cylinders", prop: "cylinders", component: { name: "el-input" } },
		{ label: "Length", prop: "length", component: { name: "el-input" } },
		{ label: "Width", prop: "width", component: { name: "el-input" } },
		{ label: "Height", prop: "height", component: { name: "el-input" } },
		{ label: "TareWeight", prop: "tareWeight", component: { name: "el-input" } }
	]
});

// cl-table 配置
const Table = useTable({
	columns: [
		{ type: "selection" },
		{ label: "Car", prop: "name" },
		{ label: "Year", prop: "year" },
		{ label: "Brand", prop: "brand" },
		{ label: "Model", prop: "model" },
		{ label: "Series", prop: "series" },
		{ label: "Body", prop: "bodyStyle" },
		// { label: "Door", prop: "doors" },
		// { label: "Seats", prop: "seats" },
		{
			label: "Fuel",
			prop: "fuelType",
			dict: [
				{
					label: "Petrol",
					value: 1
				},
				{
					label: "Petrol",
					value: 0
				}
			]
		},
		{ label: "Engine", prop: "engineSizeCc" },
		{ label: "Cylinders", prop: "cylinders" },
		{ label: "Length", prop: "length" },
		{ label: "Width", prop: "width" },
		{ label: "Height", prop: "height" },
		{ label: "Tare Weight", prop: "tareWeight" },
		{ type: "op", buttons: ["edit", "delete"] }
	]
});

// cl-crud 配置
const Crud = useCrud(
	{
		service: service.vehicle.profile
	},
	(app) => {
		app.refresh();
	}
);
</script>
