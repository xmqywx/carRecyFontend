<template>
	<cl-crud ref="Crud">
		<el-row>
			<!-- 刷新按钮 -->
			<cl-refresh-btn />
			<el-radio-group style="margin-left: 10px" v-model="status" @change="changeStatus">
				<el-radio-button :label="-1">All</el-radio-button>
				<el-radio-button :label="0">To Assign</el-radio-button>
				<el-radio-button :label="1">Assigned</el-radio-button>
				<!--				<el-radio-button :label="2">Accepted</el-radio-button>-->
				<!--				<el-radio-button :label="3">Rejected</el-radio-button>-->
				<el-radio-button :label="4">Completed</el-radio-button>
			</el-radio-group>

			<div style="margin-left: 10px">
				<el-date-picker
					v-model="dateFilter"
					@change="refresh"
					type="daterange"
					unlink-panels
					format="DD-MM-YYYY"
					range-separator="To"
					start-placeholder="Start date"
					end-placeholder="End date"
					:shortcuts="shortcuts"
				/>
			</div>
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
				<template #slot-edit="{ scope }">
					<el-button type="primary" @click="openEdit(scope.row)">{{
						!scope.row.driverID ? "Schedule" : "Edit"
					}}</el-button>
				</template>
			</cl-table>
		</el-row>

		<el-row>
			<cl-flex1 />
			<!-- 分页控件 -->
			<cl-pagination />
		</el-row>

		<cl-dialog :title="title" width="300px" v-model="visible">
			<el-form
				ref="ruleFormRef"
				:model="form"
				:rules="rules"
				label-position="top"
				class="demo-form-inline"
			>
				<el-form-item label="Driver" prop="driverID">
					<el-select
						v-model="form.driverID"
						filterable
						remote
						reserve-keyword
						placeholder="Please enter user name"
						remote-show-suffix
						:remote-method="remoteMethod"
						:loading="loading"
					>
						<el-option
							v-for="item in options"
							:key="item.id"
							:label="item.username"
							:value="item.id"
							>{{ item.username }}</el-option
						>
					</el-select>
				</el-form-item>
				<el-form-item label="Start Datetime" prop="date">
					<el-date-picker
						:default-time="new Date('1990-01-01 08:00:00')"
						type="datetime"
						v-model="form.date"
						clearable="false"
						format="DD-MM-YYYY HH:mm"
					></el-date-picker>
				</el-form-item>
				<el-form-item label="Duration(h)" prop="date">
					<el-input-number
						step="0.1"
						:min="0.5"
						v-model="form.duration"
					></el-input-number>
				</el-form-item>
			</el-form>
			<div style="height: 35px">
				<el-button style="float: right" @click="updateJob(ruleFormRef)" type="primary"
					>Schedule</el-button
				>
			</div>
		</cl-dialog>
		<!-- 新增、编辑 -->
		<cl-upsert ref="Upsert" />
	</cl-crud>
</template>

<script lang="ts" name="job-info" setup>
import { useCrud, useTable, useUpsert } from "@cool-vue/crud";
import { storage, useCool } from "/@/cool";
import { reactive, ref } from "vue";
import dayjs from "dayjs";
import moment from "moment";
import { FormInstance, FormRules } from "element-plus";
import BaseSysUserEntity = Eps.BaseSysUserEntity;
const { service } = useCool();
const dateFilter = ref("");
const visible = ref(false);
const ruleFormRef = ref<FormInstance>();
const loading = ref(false);
const title = ref("Assign driver");
const options = ref<BaseSysUserEntity[]>([]);
let selectedJob: any;
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
const form = reactive({
	driverID: null,
	date: new Date(),
	duration: 1
});
const rules = reactive<FormRules>({
	driverID: [{ required: true, message: "Please choose a driver", trigger: "blur" }]
	// recommendedPrice: [{ required: true, message: "Please input price", trigger: "blur" }]
	// pickupAddress: [{  message: "Please input address", trigger: "blur" }]
});
const remoteMethod = (query: string) => {
	if (query) {
		loading.value = true;
		setTimeout(() => {
			getUser(query.toLowerCase()).then((res) => {
				options.value = res.list;
				loading.value = false;
			});
		}, 200);
	} else {
		options.value = [];
	}
};
async function openEdit(item: any) {
	visible.value = true;
	selectedJob = item;
	if (!item.driverID) {
		ruleFormRef.value?.resetFields();
		title.value = "Schedule";
	} else {
		title.value = "Update schedule";
		const res = await service.base.sys.user.info({
			id: item.driverID
		});

		options.value = [res];
		form.driverID = item.driverID;
		form.date = new Date(Number(item.schedulerStart));
		form.duration = moment(new Date(Number(item.schedulerEnd))).diff(
			new Date(Number(item.schedulerStart)),
			"hours",
			true
		);
		form.duration = form.duration.toFixed(2);
	}
}

async function updateJob(formEl: any) {
	if (!formEl) return;
	await formEl.validate(async (valid: any) => {
		if (valid) {
			await service.job.info.update({
				id: selectedJob.id,
				driverID: form.driverID,
				schedulerStart: +form.date,
				status: 1,
				schedulerEnd: +new Date(
					moment(form.date).add(form.duration, "hours").format("YYYY-MM-DD HH:mm")
				)
			});
			visible.value = false;
			refresh();
		}
	});
}

function getUser(keyword: string) {
	return service.base.sys.user.page({
		size: 10,
		label: "driver",
		keyWord: keyword
	});
}
const shortcuts = [
	{
		text: "Today",
		value: () => {
			const end = new Date();
			const start = new Date();
			return [start, end];
		}
	},
	{
		text: "3d",
		value: () => {
			const end = new Date();
			const start = new Date();
			start.setTime(start.getTime() - 3600 * 1000 * 24 * 2);
			return [start, end];
		}
	},
	{
		text: "7d",
		value: () => {
			const end = new Date();
			const start = new Date();
			start.setTime(start.getTime() - 3600 * 1000 * 24 * 6);
			return [start, end];
		}
	},
	{
		text: "Week",
		value: () => {
			const end = new Date();
			const start = new Date(moment().startOf("week").format("YYYY-MM-DD"));

			return [start, end];
		}
	},
	{
		text: "Month",
		value: () => {
			const end = new Date();
			const start = new Date(moment().startOf("month").format("YYYY-MM-DD"));

			return [start, end];
		}
	}
];
// cl-table 配置
const Table = useTable({
	columns: [
		{ type: "selection" },
		// { label: "ID", prop: "id" },
		{ label: "Order", prop: "orderID" },
		{ label: "Pickup Address", prop: "pickupAddress" },
		{ label: "Driver", prop: "username" },
		{ label: "Status", prop: "status" },
		{
			label: "Scheduler Start",
			prop: "schedulerStart",
			formatter: (row) => {
				return dayjs(Number(row.schedulerStart)).format("DD-MM-YYYY HH:mm");
			}
		},
		{
			label: "Scheduler End",
			prop: "schedulerEnd",
			formatter: (row) => {
				return dayjs(Number(row.schedulerEnd)).format("DD-MM-YYYY HH:mm");
			}
		},
		{
			label: "Actual start",
			prop: "start",
			formatter: (row) => {
				return row.start ? dayjs(Number(row.start)).format("DD-MM-YYYY HH:mm") : null;
			}
		},
		{
			label: "Actual end",
			prop: "end",
			formatter: (row) => {
				return row.end ? dayjs(Number(row.end)).format("DD-MM-YYYY HH:mm") : null;
			}
		},
		{
			label: "Update time",
			prop: "updateTime",
			formatter: (row) => {
				return dayjs(row.updateTime).format("DD-MM-YYYY HH:mm");
			}
		},
		{
			label: "Options",
			type: "op",
			buttons: ["slot-edit"]
		}
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
function refresh() {
	Crud.value?.refresh();
}
// cl-crud 配置
const Crud = useCrud(
	{
		service: service.job.info,
		async onRefresh(params, { next }) {
			await next({
				...params,
				startDate:
					dateFilter.value && dateFilter.value[0]
						? +new Date(
								moment(dateFilter.value[0])
									.startOf("day")
									.format("YYYY-MM-DD HH:mm:ss")
						  )
						: null,
				endDate:
					dateFilter.value && dateFilter.value[1]
						? +new Date(
								moment(dateFilter.value[1])
									.endOf("day")
									.format("YYYY-MM-DD HH:mm:ss")
						  )
						: null,
				departmentId: storage.get("departmentID"),
				order:
					status.value === -1
						? "status"
						: status.value === 0
						? "updateTime"
						: "schedulerStart"
			});
		}
	},
	() => {
		// app.refresh({
		// 	status: status.value
		// });
		changeStatus();
	}
);
</script>
