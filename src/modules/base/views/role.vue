<template>
	<cl-crud ref="Crud">
		<el-row>
			<cl-refresh-btn />
			<cl-add-btn />
			<cl-multi-delete-btn />
			<cl-flex1 />
			<cl-search-key />
		</el-row>

		<el-row>
			<cl-table
				ref="Table"
				:default-sort="{
					prop: 'createTime',
					order: 'descending'
				}"
			/>
		</el-row>

		<el-row>
			<cl-flex1 />
			<cl-pagination />
		</el-row>

		<cl-upsert ref="Upsert">
			<template #slot-relevance="{ scope }">
				<el-switch
					v-model="scope.relevance"
					:active-value="1"
					:inactive-value="0"
					@change="onRelevanceChange"
				/>
				<span
					:style="{
						marginLeft: '10px',
						fontSize: '12px'
					}"
					>是否关联上下级</span
				>
			</template>
		</cl-upsert>
	</cl-crud>
</template>

<script lang="ts" name="sys-role" setup>
import { useTable, useUpsert, useCrud } from "@cool-vue/crud";
import { useCool } from "/@/cool";
import MenuCheck from "./components/menu/check.vue";
import DeptCheck from "./components/dept/check.vue";

const { service } = useCool();

// cl-crud 配置
const Crud = useCrud({ service: service.base.sys.role }, (app) => {
	app.refresh();
});

// cl-upsert 配置
const Upsert = useUpsert({
	dialog: {
		width: "800px"
	},

	items: [
		{
			prop: "name",
			label: "Name",
			span: 12,
			rules: [
				{
					required: true,
					message: "Name is required"
				}
			],
			component: {
				name: "el-input",
				props: {
					placeholder: "Please input role name"
				}
			}
		},
		{
			prop: "label",
			label: "Label",
			span: 12,
			rules: [
				{
					required: true,
					message: "Label is required"
				}
			],
			component: {
				name: "el-input",
				props: {
					placeholder: "Please input label"
				}
			}
		},
		{
			prop: "remark",
			label: "Remark",
			span: 24,
			component: {
				name: "el-input",
				props: {
					type: "textarea",
					placeholder: "Please input remark",
					rows: 4
				}
			}
		},
		{
			label: "Menu List",
			prop: "menuIdList",
			value: [],
			component: {
				vm: MenuCheck
			}
		},
		{
			label: "Relevance",
			prop: "relevance",
			flex: false,
			component: {
				name: "slot-relevance"
			}
		},
		{
			label: "",
			prop: "departmentIdList",
			value: [],
			component: {
				vm: DeptCheck,
				style: {
					marginTop: "-10px"
				}
			}
		}
	],

	onOpened(data) {
		onRelevanceChange(data.relevance || 0);
	}
});

// cl-table 配置
const Table = useTable({
	columns: [
		{
			type: "selection",
			width: 60
		},
		{
			prop: "name",
			label: "Name",
			minWidth: 150
		},
		{
			prop: "label",
			label: "Label",
			minWidth: 120
		},
		{
			prop: "remark",
			label: "Remark",
			showOverflowTooltip: true,
			minWidth: 150
		},
		{
			prop: "createTime",
			label: "Create Time",
			sortable: "custom",
			minWidth: 160
		},
		{
			prop: "updateTime",
			label: "Update Time",
			sortable: "custom",
			minWidth: 160
		},
		{
			label: "Options",
			type: "op",
			buttons: ["edit", "delete"]
		}
	]
});

// 是否关联上下级
function onRelevanceChange(val: number | string | boolean) {
	Upsert.value?.setProps("departmentIdList", {
		checkStrictly: val == 0
	});
}
</script>
