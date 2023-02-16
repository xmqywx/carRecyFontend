<template>
	<cl-crud ref="Crud">
		<el-row>
			<!-- 刷新按钮 -->
			<cl-refresh-btn />
			<!-- 新增按钮 -->
			<el-button
				type="primary"
				v-if="status < 1"
				@click="
					visibleOrder = true;
					bookTitle = 'New';
					selectedOrder = null;
				"
				>Add</el-button
			>

			<!-- 删除按钮 -->
			<cl-multi-delete-btn />
			<div style="margin-left: 10px">
				<el-date-picker
					v-model="dateFilter"
					@change="refresh"
					format="DD-MM-YYYY"
					type="daterange"
					unlink-panels
					range-separator="To"
					start-placeholder="Start date"
					end-placeholder="End date"
					:shortcuts="shortcuts"
				/>
			</div>

			<el-radio-group style="margin-left: 10px" v-model="status" @change="changeStatus">
				<el-radio-button :label="-1">All</el-radio-button>
				<el-radio-button :label="0">Lead</el-radio-button>
				<el-radio-button :label="1">Booked</el-radio-button>
			</el-radio-group>

			<cl-flex1 />
			<!-- 关键字搜索 -->
			<cl-search-key />
		</el-row>

		<el-row>
			<!-- 数据表格 -->
			<!--			{{ ORDER_STATUS[`${scope.row.status}`] }}-->
			<cl-table ref="Table">
				<template #column-status="{ scope }">
					<el-tag disable-transitions size="small" effect="dark">
						{{ ORDER_STATUS[`${scope.row.status}`] }}
					</el-tag>
				</template>
				<template #column-image="{ scope }">
					<el-avatar shape="square" :src="scope.row.image"></el-avatar>
				</template>
				<template #slot-edit="{ scope }">
					<el-button type="primary" @click="openEdit(scope.row)">Edit</el-button>
				</template>
				<template #slot-order="{ scope }">
					<el-button v-if="scope.row.status === 0" type="success" @click="open(scope.row)"
						>Book</el-button
					>
				</template>
			</cl-table>
			<cl-form ref="Form"></cl-form>
		</el-row>

		<el-row>
			<cl-flex1 />
			<!-- 分页控件 -->
			<cl-pagination />
		</el-row>

		<!-- 新增、编辑 -->
		<cl-upsert ref="Upsert" />
	</cl-crud>
	<!--	<cl-dialog title="Assign Driver" v-model="visible" :before-close="beforeClose">-->
	<!--		<form-user @choose="chooseUser" ref="userPopup" />-->
	<!--	</cl-dialog>-->
	<cl-dialog :title="bookTitle" width="80%" v-model="visibleOrder">
		<form-car @addedLead="addedLead" :id="orderID" :item="selectedOrder" :status="status" />
	</cl-dialog>
	<cl-dialog title="Actions" width="80%" v-model="visibleAction">
		<order-action :id="orderID" />
	</cl-dialog>
</template>

<script lang="ts" name="order-info" setup>
import { useCrud, useForm, useTable } from "@cool-vue/crud";
import { storage, useCool } from "/@/cool";
import FormCar from "../components/form-car.vue";
import OrderAction from "../components/order-action.vue";
const { service } = useCool();
import { reactive, ref } from "vue";
import dayjs from "dayjs";
import OrderInfoEntity = Eps.OrderInfoEntity;
import { ElMessage } from "element-plus";
import moment from "moment";
// let selectedOrder: any = {};
// const visible = ref<boolean>(false);
const visibleAction = ref<boolean>(false);
const visibleOrder = ref<boolean>(false);
const orderID = ref(null);
const dateFilter = ref("");
const status = ref(-1);
const bookTitle = ref("New");
const Form = useForm();
const selectedOrder = ref();
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
const ORDER_STATUS = {
	[0]: "Unpaid",
	[1]: "Paid",
	[2]: "Canceled",
	[3]: "Sent"
};

// cl-table 配置
const Table = useTable({
	columns: [
		{ type: "selection" },
		// { label: "ID", prop: "id" },
		// { label: "Car", prop: "carID", type: "expand", width: 50 },
		{
			label: "Customer",
			prop: "customerID",
			formatter: (row) => {
				return row.firstName + " " + row.surname;
			}
		},
		{
			label: "Image",
			prop: "image",
			component: {
				name: "img"
			}
		},
		{
			label: "Car name",
			prop: "name"
		},
		// {
		// 	label: "Brand",
		// 	prop: "brand"
		// },
		{
			label: "Year",
			prop: "year"
		},
		{
			label: "Series",
			prop: "series"
		},
		{
			label: "Vin Number",
			prop: "vinNumber"
		},
		// {
		// 	label: "Body style",
		// 	prop: "bodyStyle"
		// },
		{
			label: "Pickup Address",
			prop: "pickupAddress"
		},
		// { label: "Status", prop: "status" },
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
				return row.actualPaymentPrice ? "$" + Number(row.actualPaymentPrice).toFixed(2) : "";
			}
		},
		{
			label: "Pay Method",
			prop: "payMethod"
		},
		// {
		// 	label: "Payment Price",
		// 	prop: "actualPaymentPrice",
		// 	formatter: (row) => {
		// 		return row.actualPaymentPrice ? "$" + Number(row.actualPaymentPrice).toFixed(2) : "";
		// 	}
		// },
		// {
		// 	label: "Create Time",
		// 	prop: "createTime",
		// 	formatter: (row) => {
		// 		return dayjs(row.createTime).format("DD-MM-YYYY HH:mm");
		// 	}
		// },
		{
			label: "Update Time",
			prop: "updateTime",
			formatter: (row) => {
				return dayjs(row.updateTime).format("DD-MM-YYYY HH:mm");
			}
		},
		// { label: "更新时间", prop: "updateTime" },
		{
			label: "Options",
			type: "op",
			width: 250,
			align: "left",
			buttons: [
				"slot-edit",
				{
					label: "Action",
					icon: "Message",
					onClick(options: { scope: obj }) {
						// selectedOrder = options.scope.row;
						orderID.value = options.scope.row.id;
						visibleAction.value = true;
					}
				},
				"slot-order"
			]
		}
	]
});

function open(row: any) {
	Form.value?.open({
		title: "Confirm pickup address",
		width: "600px",
		op: {
			saveButtonText: "Book"
		},
		items: [
			{
				label: "Address",
				prop: "pickupAddress",
				required: true,
				value: row.pickupAddress,
				component: {
					name: "el-input",
					props: {
						placeholder: "Please input address"
					}
				}
			}
		],
		on: {
			submit(data, { close, done }) {
				service.order.info
					.update({
						id: row.id,
						pickupAddress: data.pickupAddress
					})
					.then(() => {
						transOrder(row);
						close();
					})
					.catch((err) => {
						console.error(err);
						ElMessage.error("Add pickup address failed");
						done();
					});
			}
		}
	});
}
function transOrder(row: OrderInfoEntity) {
	const departmentId = storage.get("departmentID");
	service.order.info
		.update({
			id: row.id,
			status: 1
		})
		.then(async () => {
			await service.order.action.add({
				authorID: storage.get("userInfo").id,
				orderID: row.id,
				timestamp: +new Date(),
				description: "Generated order",
				type: 0
			});

			await service.job.info.add({
				orderID: row.id,
				carID: row.carID,
				departmentId,
				status: 0
			});
			Crud.value?.refresh();
		});
}

function refresh() {
	Crud.value?.refresh();
}

function addedLead() {
	visibleOrder.value = false;
	Crud.value?.refresh();
}

function openEdit(item: any) {
	bookTitle.value = "Edit";
	visibleOrder.value = true;
	selectedOrder.value = item;
	orderID.value = item.id;
}
function changeStatus() {
	let hiddenColumn: string[] = [];
	Crud.value?.refresh({
		order: "updateTime"
	});
	const showColumn = ["payMethod", "actualPaymentPrice"];
	if (status.value === -1) {
		hiddenColumn = ["payMethod", "actualPaymentPrice"];
	}
	if (status.value === 0) {
		hiddenColumn = ["payMethod", "actualPaymentPrice"];
	}

	Table.value?.showColumn(showColumn);
	Table.value?.hideColumn(hiddenColumn);
}
// cl-crud 配置
const Crud = useCrud(
	{
		service: service.order.info,
		async onRefresh(params, { next }) {
			await next({
				...params,
				status: status.value === -1 ? null : status.value,
				startDate:
					dateFilter.value && dateFilter.value[0]
						? moment(dateFilter.value[0]).startOf("day").format("YYYY-MM-DD HH:mm:ss")
						: null,
				endDate:
					dateFilter.value && dateFilter.value[1]
						? moment(dateFilter.value[1]).endOf("day").format("YYYY-MM-DD HH:mm:ss")
						: null,
				departmentId: storage.get("departmentID")
			});
		}
	},

	(app) => {
		app.refresh({
			status: 0
		});
	}
);
</script>
