<template>
	<cl-crud ref="Crud">
		<el-row>
			<!-- 刷新按钮 -->
			<cl-refresh-btn />
			<el-button @click="getInfo()">test</el-button>
			<!-- 新增按钮 -->
			<!--			<el-button type="primary" @click="visibleOrder = true">Add</el-button>-->

			<!-- 删除按钮 -->
			<!--			<cl-multi-delete-btn />-->

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
				<template #column-carID="{ scope }">
					<div style="padding: 10px">
						<el-descriptions title="" size="small" column="5">
							<el-descriptions-item label="Model">{{
								scope.row.model
							}}</el-descriptions-item>
							<el-descriptions-item label="Brand">{{
								scope.row.brand
							}}</el-descriptions-item>
							<el-descriptions-item label="Year">{{
								scope.row.year
							}}</el-descriptions-item>
							<el-descriptions-item label="Colour">{{
								scope.row.colour
							}}</el-descriptions-item>

							<el-descriptions-item label="Pickup address">{{
								scope.row.pickupAddress
							}}</el-descriptions-item>
							<el-descriptions-item label="note">{{
								scope.row.note
							}}</el-descriptions-item>
						</el-descriptions>
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
	<!--	<cl-dialog title="Assign Driver" v-model="visible" :before-close="beforeClose">-->
	<!--		<form-user @choose="chooseUser" ref="userPopup" />-->
	<!--	</cl-dialog>-->
	<cl-dialog title="Create Order" width="70%" v-model="visibleOrder">
		<form-car :id="orderID" />
	</cl-dialog>
	<cl-dialog title="Create Order" width="80%" v-model="visibleAction">
		<order-action :id="orderID" />
	</cl-dialog>
</template>

<script lang="ts" name="order-info" setup>
import { useCrud, useTable } from "@cool-vue/crud";
import { useCool } from "/@/cool";
import FormCar from "../components/form-car.vue";
import OrderAction from "../components/order-action.vue";
const { service } = useCool();
import { ref } from "vue";
import dayjs from "dayjs";
let selectedOrder: any = {};
const visible = ref<boolean>(false);
const visibleAction = ref<boolean>(false);
const visibleOrder = ref<boolean>(false);
const orderID = ref(null);

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
				},
				{
					label: "Invoice",
					icon: "Message",
					onClick(options: { scope: obj }) {
						alert("Sending...");
					}
				}
			]
		}
	]
});
function beforeClose(done: any) {
	done();
}
function chooseUser(user: obj) {
	service.order.info
		.update({
			id: selectedOrder.id,
			driverID: user.id
		})
		.then(() => {
			Crud.value?.refresh();
			visible.value = false;
		});
}

function getInfo() {
	service.order.info.getCarInfo().then(() => {});
}
// cl-crud 配置
const Crud = useCrud(
	{
		service: service.order.info
	},
	(app) => {
		app.refresh({
			status: 1,
			sortBy: "updateTime"
		});
	}
);
</script>
