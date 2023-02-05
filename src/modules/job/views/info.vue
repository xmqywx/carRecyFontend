<template>
	<cl-crud ref="Crud">
		<el-row>
			<!-- 刷新按钮 -->
			<cl-refresh-btn />
			<el-radio-group style="margin-left: 10px" v-model="status" @change="changeStatus">
				<el-radio-button :label="-1">All</el-radio-button>
				<el-radio-button :label="0">To Assign</el-radio-button>
				<el-radio-button :label="1">Assigned</el-radio-button>
				<el-radio-button :label="2">Accepted</el-radio-button>
				<el-radio-button :label="3">Rejected</el-radio-button>
				<el-radio-button :label="4">Completed</el-radio-button>
			</el-radio-group>
			<!-- 新增按钮 -->
			<!--			<cl-add-btn />-->
			<!-- 删除按钮 -->
			<!--			<cl-multi-delete-btn />-->
			<cl-flex1 />
			<!-- 关键字搜索 -->
			<cl-search-key />
		</el-row>

		<el-row>
			<!-- 数据表格 -->
			<cl-table ref="Table">
				<template #column-orderID="{ scope }">
					<span>{{ scope.row.model }}-{{ scope.row.brand }}-{{ scope.row.year }}</span>
				</template>
				<template #column-status="{ scope }">
					<el-tag disable-transitions size="small" effect="dark">
						{{ JOB_STATUS[`${scope.row.status}`] }}
					</el-tag>
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

<script lang="ts" name="job-info" setup>
import { useCrud, useTable, useUpsert } from "@cool-vue/crud";
import { useCool } from "/@/cool";
import { ref } from "vue";
import dayjs from "dayjs";
const { service } = useCool();

// cl-upsert 配置
const Upsert = useUpsert({
	items: [
		{ label: "carID", prop: "orderID", component: { name: "el-input" } },
		{ label: "driverID", prop: "driverID", component: { name: "el-input" } },
		{ label: "status", prop: "status", component: { name: "el-switch" }, required: true }
	]
});
const status = ref(0);
const JOB_STATUS = {
	[0]: "To Be Assigned",
	[1]: "Assigned",
	[2]: "Accepted",
	[3]: "Rejected",
	[4]: "Complete"
};

// cl-table 配置
const Table = useTable({
	columns: [
		{ type: "selection" },
		// { label: "ID", prop: "id" },
		{ label: "Order", prop: "orderID" },
		{ label: "Pickup Address", prop: "pickupAddress" },
		{ label: "Expected Date", prop: "expectedDate" },
		{ label: "Driver", prop: "driverID" },
		{ label: "Status", prop: "status" },
		{
			label: "Scheduler Start",
			prop: "schedulerStart",
			formatter: (row) => {
				return dayjs(Number(row.schedulerStart)).format("DD-MM-YYYY HH:mm");
			}
		},
		{
			label: "scheduler End",
			prop: "schedulerEnd",
			formatter: (row) => {
				return dayjs(Number(row.schedulerEnd)).format("DD-MM-YYYY HH:mm");
			}
		},
		{
			label: "Actual start",
			prop: "start",
			formatter: (row) => {
				return dayjs(Number(row.start)).format("DD-MM-YYYY HH:mm");
			}
		},
		{
			label: "Actual end",
			prop: "end",
			formatter: (row) => {
				return dayjs(Number(row.end)).format("DD-MM-YYYY HH:mm");
			}
		},
		{ type: "op", buttons: ["edit", "delete"] }
	]
});
function changeStatus() {
	let hiddenColumn: string[] = [];
	Crud.value?.refresh({
		page: 1,
		status: status.value > -1 ? status.value : null
	});
	const showColumn = [
		"driverID",
		"schedulerStart",
		"schedulerEnd",
		"start",
		"end",
		"expectedDate"
	];
	if (status.value === 0) {
		hiddenColumn = ["driverID", "schedulerStart", "schedulerEnd", "start", "end"];
	}
	if (status.value === 1) {
		hiddenColumn = ["expectedDate", "start", "end"];
	}
	if (status.value === 2) {
		hiddenColumn = ["expectedDate", "start", "end"];
	}
	if (status.value === 3) {
		hiddenColumn = ["expectedDate", "start", "end"];
	}
	if (status.value === 4) {
		hiddenColumn = ["expectedDate"];
	}
	Table.value?.showColumn(showColumn);
	Table.value?.hideColumn(hiddenColumn);
}
// cl-crud 配置
const Crud = useCrud(
	{
		service: service.job.info
	},
	() => {
		// app.refresh({
		// 	status: status.value
		// });
		changeStatus();
	}
);
</script>
