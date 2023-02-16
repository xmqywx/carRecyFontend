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
			<cl-table ref="Table">
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
		<el-row>
			<el-col :span="12">Price: <el-input-number :precision="2" v-model="form.price" /></el-col>
			<el-col :span="12">Weight: <el-input-number :precision="2" v-model="form.weight" /></el-col>
		</el-row>

	</cl-crud>
</template>

<script lang="ts" name="菜单名称" setup>
import { useCrud, useTable } from "@cool-vue/crud";
import { useCool } from "/@/cool";
const { service } = useCool();
import dayjs from "dayjs";
import {reactive, ref} from "vue";
const ORDER_STATUS = {
	[0]: "Unpaid",
	[1]: "Paid",
	[2]: "Canceled",
	[3]: "Sent"
};
const emit = defineEmits(["chooseCustomer"]);
const form = reactive({
	price: 0,
	weight: 0
});
const Table = useTable({
	autoHeight: false,
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
					label: "Choose",
					icon: "Message",
					onClick(options: { scope: obj }) {
						emit("chooseCustomer", options.scope.row);
					}
				}
			]
		}
	]
});
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
