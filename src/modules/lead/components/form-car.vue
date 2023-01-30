<template>
	<el-row>
		<el-col :span="10">
			<el-form
				ref="ruleFormRef"
				:model="form"
				:rules="rules"
				label-position="top"
				class="demo-form-inline"
			>
				<el-form-item label="Customer" prop="customerID">
					<el-select
						v-model="form.customerID"
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
							:label="item.firstName + ' ' + item.surname"
							:value="item.id"
						>
							<div style="line-height: 15px; padding-top: 2px">
								<span>{{ item.firstName + " " + item.surname }}</span>
							</div>

							<div
								style="
									color: var(--el-text-color-secondary);
									font-size: 12px;
									line-height: 15px;
								"
							>
								{{ item.address }}
							</div>
						</el-option>
					</el-select>
					<cl-form ref="Form"></cl-form>
					<el-button link type="primary" @click="open()">New customer</el-button>
				</el-form-item>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="Brand" prop="brand">
							<el-input v-model="form.brand" @input="search('brand', $event)" />
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="Model" prop="model">
							<el-input v-model="form.model" @input="search('model', $event)" />
						</el-form-item>
					</el-col>
				</el-row>

				<el-row :gutter="20">
					<el-col :span="8">
						<el-form-item label="Year" prop="year">
							<el-input-number v-model="form.year" @input="search('year', $event)" />
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="Colour" prop="colour">
							<el-input v-model="form.colour" />
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="VIN" prop="vinNumber">
							<el-input v-model="form.vinNumber" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="Pickup address" prop="pickupAddress">
							<el-input v-model="form.pickupAddress" />
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="Expect pickup date" prop="expectedDate">
							<el-date-picker v-model="form.expectedDate" />
						</el-form-item>
					</el-col>
				</el-row>

				<el-form-item label="Note" prop="note">
					<el-input type="textarea" v-model="form.note" />
				</el-form-item>

				<el-space fill>
					<el-alert
						style="margin-bottom: 10px"
						type="warning"
						show-icon
						:closable="false"
					>
						<p>
							First fill in the brand, model and year information of the vehicle, and
							then calculate the appropriate price by referring to the vehicle
							database on the right
						</p>
					</el-alert>
					<el-form-item label="Quoted Price" prop="recommendedPrice">
						<el-input-number v-model="form.recommendedPrice" :precision="2" :step="1" />
					</el-form-item>
				</el-space>
			</el-form>
			<el-button style="float:right" type="primary" @click="submitForm(ruleFormRef)">Create</el-button>
		</el-col>
		<el-col :span="14">
			<cl-crud ref="Crud">
				<el-row>
					<!-- 数据表格 -->
					<cl-table
						size="small"
						stripe
						:border="false"
						show-overflow-tooltip
						ref="Table"
					/>
				</el-row>

				<el-row>
					<cl-flex1 />
					<!-- 分页控件 -->
					<cl-pagination small />
				</el-row>
				<!-- 新增、编辑 -->
				<cl-upsert ref="Upsert" />
			</cl-crud>
		</el-col>
	</el-row>
</template>

<script lang="ts" name="菜单名称" setup>
import { useCrud, useForm, useTable } from "@cool-vue/crud";
import { storage, useCool } from "/@/cool";
const { service } = useCool();
import { reactive, ref } from "vue";
import CustomerProfileEntity = Eps.CustomerProfileEntity;
import type { FormRules } from "element-plus";
import { ElMessage, FormInstance } from "element-plus";
const options = ref<CustomerProfileEntity[]>([]);
const loading = ref(false);
const Form = useForm();
const ruleFormRef = ref<FormInstance>();
const form = reactive({
	customerID: null,
	model: "",
	vinNumber: "",
	brand: "",
	year: null,
	colour: "",
	recommendedPrice: 0,
	pickupAddress: "",
	note: "",
	expectedDate: null
});

const rules = reactive<FormRules>({
	customerID: [{ required: true, message: "Please input customer", trigger: "blur" }],
	model: [{ required: true, message: "Please input model", trigger: "blur" }],
	brand: [{ required: true, message: "Please input brand", trigger: "blur" }],
	year: [{ required: true, message: "Please input year", trigger: "blur" }],
	colour: [{ required: true, message: "Please input colour", trigger: "blur" }],
	recommendedPrice: [{ required: true, message: "Please input price", trigger: "blur" }],
	// pickupAddress: [{  message: "Please input address", trigger: "blur" }]
});
const submitForm = async (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	await formEl.validate(async (valid, fields) => {
		if (valid) {
			const car = await service.car.base.add({
				...form
			});
			const order = await service.order.info.add({
				...form,
				carID: car.id,
				status: 0,
				expectedDate: form.expectedDate ? +form.expectedDate : null
			});

			await service.job.info.add({
				orderID: order.id,
				carID: car.id,
				status: 0
			});

			await service.order.action.add({
				authorID: storage.get("userInfo").id,
				orderID: order.id,
				timestamp: +new Date(),
				description: "Created order",
				type: 0
			});
			ElMessage.success("Created success");
		} else {
			console.log("error submit!", fields);
		}
	});
};
function getUser(keyword: string) {
	return service.customer.profile.page({
		size: 10,
		keyword: keyword
	});
}

const remoteMethod = (query: string) => {
	if (query) {
		loading.value = true;
		setTimeout(() => {
			getUser(query.toLowerCase()).then((res) => {
				options.value = res.list;
				loading.value = false;
			});
			// options.value = list.value.filter((item) => {
			// 	return item.label.toLowerCase().includes(query.toLowerCase());
			// });
		}, 200);
	} else {
		options.value = [];
	}
};
function search(type: string, value: any) {
	Crud.value?.refresh({
		[type]: value
	});
}
function open() {
	Form.value?.open({
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
				// rules: { message: "Please input correct phone number." },
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
}
// cl-table 配置
const Table = useTable({
	autoHeight: false,
	columns: [
		{ label: "Year", prop: "year" },
		{ label: "Brand", prop: "brand", width: 90, showOverflowTooltip: true },
		{ label: "Model", prop: "model", width: 50 },
		{ label: "Series", prop: "series", showOverflowTooltip: true },
		{ label: "Body", prop: "bodyStyle", showOverflowTooltip: true },
		// { label: "Door", prop: "doors", width: 50 },
		// { label: "Seats", prop: "seats", width: 50 },
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
		// { label: "Length", prop: "length" },
		// { label: "Width", prop: "width" },
		// { label: "Height", prop: "height" },
		{ label: "TareWeight", prop: "tareWeight" },
		{ label: "Price", prop: "tareWeight" }
	]
});

// cl-crud 配置
const Crud = useCrud(
	{
		service: service.vehicle.profile
	},
	(app) => {
		app.refresh({
			size: 10
		});
	}
);
</script>
