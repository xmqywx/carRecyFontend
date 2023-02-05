<template>
	<el-form
		ref="ruleFormRef"
		:model="form"
		:rules="rules"
		label-position="top"
		class="demo-form-inline"
	>
		<el-row :gutter="40">
			<el-col :span="12">
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

				<el-space fill>
					<el-alert
						style="margin-bottom: 10px"
						type="warning"
						show-icon
						:closable="false"
					>
						<p>
							This parameter 'State' should contain the 2-3 letter abbreviation of the
							australian state to where the vehicle is registered, those are NSW (New
							South Wales) and VIC (Victoria), QLD (Queensland incl. North
							Queensland), SA (South Australia), ACT (Canberra), NT (Northern
							Territory), WA (Western Australia) and TAS (Tasmania).
						</p>
					</el-alert>
					<el-form ref="ruleFormRegRef" :model="formReg" :rules="rulesReg">
						<el-row :gutter="20">
							<el-col :span="8">
								<el-form-item label="Registration Num" prop="registrationNumber">
									<el-input v-model="formReg.registrationNumber"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="State" prop="state">
									<el-input v-model="formReg.state"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-button
									type="primary"
									style="margin-top: 15px"
									@click="searchCarInfo(ruleFormRegRef)"
									>Search</el-button
								>
							</el-col>
						</el-row>
					</el-form>
				</el-space>

				<el-form-item label="Quoted Price" prop="recommendedPrice">
					<el-input-number v-model="form.recommendedPrice" :precision="2" :step="1" />
				</el-form-item>

				<el-form-item label="Note" prop="note">
					<el-input type="textarea" v-model="form.note" />
				</el-form-item>
			</el-col>
			<el-col :span="12">
				<div style="margin-bottom: 20px">
					<el-avatar :size="'large'" :shape="'square'" :src="form.image"></el-avatar>
				</div>
				<el-form-item label="Description" prop="note">
					<el-input v-model="form.name" />
				</el-form-item>
				<el-row :gutter="20">
					<el-col :span="8">
						<el-form-item label="Brand" prop="brand">
							<el-input v-model="form.brand" />
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="Model" prop="model">
							<el-input v-model="form.model" />
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="Year" prop="year">
							<el-input-number v-model="form.year" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="8">
						<el-form-item label="Series" prop="series">
							<el-input v-model="form.series" />
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="Engine" prop="engine">
							<el-input v-model="form.engine" />
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="Colour" prop="note">
							<el-input v-model="form.colour" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="Body Style" prop="bodyStyle">
							<el-input v-model="form.bodyStyle" />
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="Vin Number" prop="vinNumber">
							<el-input v-model="form.vinNumber" />
						</el-form-item>
					</el-col>
				</el-row>
				<!--			<cl-crud ref="Crud">-->
				<!--				<el-row>-->
				<!--					&lt;!&ndash; 数据表格 &ndash;&gt;-->
				<!--					<cl-table-->
				<!--						size="small"-->
				<!--						stripe-->
				<!--						:border="false"-->
				<!--						show-overflow-tooltip-->
				<!--						ref="Table"-->
				<!--					/>-->
				<!--				</el-row>-->

				<!--				<el-row>-->
				<!--					<cl-flex1 />-->
				<!--					&lt;!&ndash; 分页控件 &ndash;&gt;-->
				<!--					<cl-pagination small />-->
				<!--				</el-row>-->
				<!--				&lt;!&ndash; 新增、编辑 &ndash;&gt;-->
				<!--				<cl-upsert ref="Upsert" />-->
				<!--			</cl-crud>-->
			</el-col>
			<el-col :span="24">
				<el-button style="float: right" type="success" @click="submitForm(ruleFormRef)">
					Create
				</el-button>
			</el-col>
		</el-row>
	</el-form>
</template>

<script lang="ts" name="菜单名称" setup>
import { useForm } from "@cool-vue/crud";
import { storage, useCool } from "/@/cool";
const { service } = useCool();
import { reactive, ref } from "vue";
import CustomerProfileEntity = Eps.CustomerProfileEntity;
import type { FormRules } from "element-plus";
import { ElMessage, FormInstance } from "element-plus";
const emit = defineEmits(["addedLead"]);

const options = ref<CustomerProfileEntity[]>([]);
const loading = ref(false);
const Form = useForm();

const ruleFormRef = ref<FormInstance>();
const ruleFormRegRef = ref<FormInstance>();
const form = reactive({
	customerID: null,
	recommendedPrice: 0,
	pickupAddress: "",
	note: "",
	expectedDate: null,
	name: "",
	colour: "",
	vinNumber: "",
	year: 0,
	model: "",
	brand: "",
	image: "",
	series: "",
	engine: "",
	bodyStyle: ""
});

const formReg = reactive({
	state: "NSW",
	registrationNumber: "BEW76P"
});

const rules = reactive<FormRules>({
	customerID: [{ required: true, message: "Please input customer", trigger: "blur" }],
	model: [{ required: true, message: "Please input model", trigger: "blur" }],
	brand: [{ required: true, message: "Please input brand", trigger: "blur" }],
	year: [{ required: true, message: "Please input year", trigger: "blur" }],
	colour: [{ required: true, message: "Please input colour", trigger: "blur" }],
	recommendedPrice: [{ required: true, message: "Please input price", trigger: "blur" }]
	// pickupAddress: [{  message: "Please input address", trigger: "blur" }]
});
const rulesReg = reactive<FormRules>({
	registrationNumber: [
		{ required: true, message: "Please input registration number", trigger: "blur" }
	],

	state: [{ required: true, message: "Please input state", trigger: "blur" }]
	// pickupAddress: [{  message: "Please input address", trigger: "blur" }]
});

const searchCarInfo = async (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	await formEl.validate(async (valid, fields) => {
		if (valid) {
			const res = await service.order.info.getCarInfo({
				...formReg
			});
			form.vinNumber = res.VechileIdentificationNumber;
			form.year = Number(res.RegistrationYear);
			form.engine = res.Engine;
			form.brand = res.CarMake.CurrentTextValue;
			form.model = res.ModelDescription.CurrentTextValue;
			form.bodyStyle = res.BodyStyle.CurrentTextValue;
			form.series = res.extended.series;
			form.colour = res.Colour;
			form.name = res.Description;
			form.image = res.ImageUrl;
			// form.vinNumber = res.VechileIdentificationNumber;
		} else {
			console.log("error search", fields);
		}
	});
};
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

			await service.order.action.add({
				authorID: storage.get("userInfo").id,
				orderID: order.id,
				timestamp: +new Date(),
				description: "Created lead",
				type: 0
			});
			emit("addedLead");
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
</script>
