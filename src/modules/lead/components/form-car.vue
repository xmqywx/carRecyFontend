<template>
	<div :id="'capture'" class="capture">
		<el-form
			ref="ruleFormRef"
			:model="form"
			:rules="rules"
			label-position="top"
			class="demo-form-inline"
		>
			<el-row :gutter="40">
				<el-col :span="24">
					<div style="width: 50%">
						<el-form-item
							label="Customer (type the name or phone to find existing customer or click on New customer button to create a new one）"
							v-if="!isEdit"
						>
							<vue3-simple-typeahead
								id="typeahead_id"
								placeholder="Choose..."
								:items="options"
								:minInputLength="1"
								@onInput="remoteMethod"
								@selectItem="selectCustomer"
								style="width: 50%"
								ref="inputRef"
								:itemProjection="
									(item) => {
										return (
											item.firstName +
											' ' +
											item.surname +
											item.phoneNumber +
											item.emailAddress
										);
									}
								"
							>
								<template #list-item-text="slot">
									<div>
										{{ slot.item.firstName }} {{ slot.item.surname }}
										<div style="float: right; font-size: 12px">
											{{ slot.item.phoneNumber }}
										</div>
									</div>
									<el-row>
										<el-col
											:span="12"
											style="float: right; font-size: 12px"
											v-if="slot.item.emailAddress"
										>
											{{ slot.item.emailAddress }}
										</el-col>
										<el-col
											:span="12"
											style="float: right; font-size: 12px; text-align: right"
											v-if="slot.item.address"
										>
											{{ slot.item.address }}
										</el-col>
									</el-row>
								</template>
							</vue3-simple-typeahead>
							<el-icon style="position: absolute; right: 50%; top: 10px"
								><search
							/></el-icon>
							<el-button link type="primary" @click="changeToNew"
								>New customer</el-button
							>
						</el-form-item>
					</div>
					<el-form
						:rules="rulesCustomer"
						ref="ruleFormCustomerRef"
						:model="formCustomer"
						label-position="top"
						class="demo-form-inline"
					>
						<el-row :gutter="20">
							<el-col :span="6">
								<el-form-item label="First name" prop="firstName">
									<el-input
										:disabled="!newCustomer"
										v-model="formCustomer.firstName"
									/>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item label="Surname" prop="surname">
									<el-input
										:disabled="!newCustomer"
										v-model="formCustomer.surname"
									/>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item label="Phone number" prop="phoneNumber">
									<el-input
										:disabled="!newCustomer"
										v-model="formCustomer.phoneNumber"
									/>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item label="Email" prop="emailAddress">
									<el-input
										:disabled="!newCustomer"
										v-model="formCustomer.emailAddress"
									/>
								</el-form-item>
							</el-col>
						</el-row>

						<el-form-item label="Physical Address" prop="address">
							<el-input :disabled="!newCustomer" v-model="formCustomer.address" />
						</el-form-item>
						<el-row :gutter="20">
							<el-col :span="12">
								<el-form-item label="Driver Licence / Photo ID" prop="licence">
									<el-input
										:disabled="!newCustomer"
										v-model="formCustomer.licence"
									/>
								</el-form-item>
							</el-col>
						</el-row>
					</el-form>
					<el-form-item label="Pickup Address" prop="pickupAddress">
						<el-input v-model="form.pickupAddress" />
					</el-form-item>
				</el-col>
				<el-divider></el-divider>
				<el-col :span="12">
					<div style="border: 1px solid #555555; padding: 10px">
						<el-form ref="ruleFormRegRef" :model="formReg" :rules="rulesReg">
							<el-row :gutter="20">
								<el-col :span="8">
									<el-form-item
										label="Registration Num"
										prop="registrationNumber"
									>
										<el-input v-model="formReg.registrationNumber"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label="State" prop="state">
										<el-select v-model="formReg.state">
											<el-option value="NSW">NSW</el-option>
											<el-option value="VIC">VIC</el-option>
											<el-option value="QLD">QLD</el-option>
											<el-option value="SA">SA</el-option>
											<el-option value="ACT">ACT</el-option>
											<el-option value="NT">NT</el-option>
											<el-option value="WA">WA</el-option>
											<el-option value="TAS">TAS</el-option>
										</el-select>
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
						<div style="margin-bottom: 20px">
							<el-avatar
								:size="'large'"
								:shape="'square'"
								:src="form.image"
							></el-avatar>
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
					</div>
				</el-col>
				<el-col :span="12">
					<el-form-item label="Plates returned">
						<el-radio-group v-model="form.platesReturned" class="ml-4">
							<el-radio-button label="1" size="large">Y</el-radio-button>
							<el-radio-button label="0" size="large">N</el-radio-button>
						</el-radio-group>
						<el-button link type="primary" @click="form.platesReturned = null"
							>Clear</el-button
						>
					</el-form-item>
					<el-form-item label="Registered">
						<el-radio-group v-model="form.registered" class="ml-4">
							<el-radio-button label="0" size="large">Deregistered</el-radio-button>
							<el-radio-button label="1" size="large">Registered</el-radio-button>
						</el-radio-group>
						<el-button link type="primary" @click="form.registered = null"
							>Clear</el-button
						>
					</el-form-item>
					<el-form-item label="Identification Sighted">
						<el-radio-group v-model="form.identificationSighted" class="ml-4">
							<el-radio-button label="1" size="large">Y</el-radio-button>
							<el-radio-button label="0" size="large">N</el-radio-button>
						</el-radio-group>
						<el-button link type="primary" @click="form.identificationSighted = null"
							>Clear</el-button
						>
					</el-form-item>
					<el-form-item label="Quoted Price" prop="recommendedPrice">
						<el-input-number v-model="form.recommendedPrice" :precision="2" :step="1" />
					</el-form-item>

					<el-form-item label="Note" prop="note">
						<el-input type="textarea" v-model="form.note" />
					</el-form-item>
				</el-col>
				<el-divider v-if="params.status === 1"></el-divider>
				<el-col :span="12" v-if="params.status === 1">
					<el-form-item label="Payment Price" prop="actualPaymentPrice">
						<el-radio-group v-model="form.payMethod" class="ml-4">
							<el-radio-button label="Cheque" size="large">Cheque</el-radio-button>
							<el-radio-button label="Cash" size="large">Cash</el-radio-button>
							<el-radio-button label="Direct Credit" size="large"
								>Direct Credit</el-radio-button
							>
						</el-radio-group>
					</el-form-item>
				</el-col>
				<el-col :span="12" v-if="params.status === 1">
					<el-form-item label="Payment Price" prop="actualPaymentPrice">
						<el-input-number
							v-model="form.actualPaymentPrice"
							:precision="2"
							:step="1"
						/>
					</el-form-item>
				</el-col>

				<el-col :span="24">
					<el-button
						style="float: right"
						type="success"
						@click="submitForm(ruleFormRef, ruleFormCustomerRef)"
					>
						{{ isEdit ? "Save" : "Create" }}
					</el-button>
				</el-col>
			</el-row>
		</el-form>
	</div>
</template>

<script lang="ts" name="Booking" setup>
import { storage, useCool } from "/@/cool";
const { service } = useCool();
import { reactive, ref } from "vue";
import CustomerProfileEntity = Eps.CustomerProfileEntity;
import type { FormRules } from "element-plus";
import { ElMessage, FormInstance } from "element-plus";
import { Search } from "@element-plus/icons-vue";
const emit = defineEmits(["addedLead"]);
const params = defineProps({
	id: {
		type: Number
	},
	status: {
		type: Number
	},
	item: {
		type: Object
	}
});
const options = ref<CustomerProfileEntity[]>([]);
const loading = ref(false);
let newCustomer = ref(true);

const inputRef = ref();
const ruleFormRef = ref<FormInstance>();
const ruleFormCustomerRef = ref<FormInstance>();
const ruleFormRegRef = ref<FormInstance>();
let customerSelected: any;
const isEdit = params.item ? true : false;
let form: any = reactive({
	recommendedPrice: 0,
	pickupAddress: "",
	note: "",
	name: "",
	colour: "",
	vinNumber: "",
	year: 0,
	model: "",
	brand: "",
	image: "",
	series: "",
	engine: "",
	bodyStyle: "",
	identificationSighted: null,
	registered: null,
	platesReturned: null,
	payMethod: "",
	actualPaymentPrice: 0
});

let formCustomer: CustomerProfileEntity = reactive({
	firstName: "",
	surname: "",
	emailAddress: "",
	phoneNumber: "",
	address: "",
	licence: ""
});
let formReg = reactive({
	state: "NSW",
	registrationNumber: "BEW76P"
});

if (isEdit) {
	form = reactive({
		recommendedPrice: params?.item?.recommendedPrice,
		pickupAddress: params?.item?.pickupAddress,
		note: params?.item?.note,
		name: params?.item?.name,
		colour: params?.item?.colour,
		vinNumber: params?.item?.vinNumber,
		year: params?.item?.year,
		model: params?.item?.model,
		brand: params?.item?.brand,
		image: params?.item?.image,
		series: params?.item?.series,
		engine: params?.item?.engine,
		bodyStyle: params?.item?.bodyStyle,
		identificationSighted: params?.item?.identificationSighted,
		registered: params?.item?.registered,
		platesReturned: params?.item?.platesReturned
	});

	formCustomer = reactive({
		firstName: params?.item?.firstName,
		surname: params?.item?.surname,
		emailAddress: params?.item?.emailAddress,
		phoneNumber: params?.item?.phoneNumber,
		address: params?.item?.address,
		licence: params?.item?.licence
	});

	formReg = reactive({
		state: params?.item?.state,
		registrationNumber: params?.item?.registrationNumber
	});
}

function selectCustomer(item: CustomerProfileEntity) {
	const { id, firstName, surname, emailAddress, phoneNumber, address, licence } = item;
	customerSelected = id;
	ruleFormCustomerRef.value?.clearValidate();
	formCustomer.firstName = firstName;
	formCustomer.surname = surname;
	formCustomer.emailAddress = emailAddress;
	formCustomer.phoneNumber = phoneNumber;
	formCustomer.address = address;
	formCustomer.licence = licence;
	newCustomer.value = false;
}

function changeToNew() {
	newCustomer.value = true;
	ruleFormCustomerRef.value?.resetFields();
	inputRef.value.clearInput();
}

const rules = reactive<FormRules>({
	model: [{ required: true, message: "Please input model", trigger: "blur" }],
	brand: [{ required: true, message: "Please input brand", trigger: "blur" }],
	year: [{ required: true, message: "Please input year", trigger: "blur" }],
	colour: [{ required: true, message: "Please input colour", trigger: "blur" }],
	recommendedPrice: [{ required: true, message: "Please input price", trigger: "blur" }]
	// pickupAddress: [{  message: "Please input address", trigger: "blur" }]
});
const rulesCustomer = reactive<FormRules>({
	firstName: [{ required: true, message: "Please input first name", trigger: "blur" }],
	surname: [{ required: true, message: "Please input surname", trigger: "blur" }],
	emailAddress: [{ required: true, message: "Please input email address", trigger: "blur" }],
	phoneNumber: [{ required: true, message: "Please input phone number", trigger: "blur" }]
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
const submitForm = async (
	formEl: FormInstance | undefined,
	formCustomerEl: FormInstance | undefined
) => {
	if (!formEl) return;
	if (!formCustomerEl) return;
	await formCustomerEl.validate(async (validCus) => {
		if (validCus) {
			await formEl.validate(async (valid, fields) => {
				if (valid) {
					if (!isEdit) {
						let customerID: any;
						const departmentId = storage.get("departmentID");
						if (newCustomer.value) {
							const customer = await service.customer.profile.add({
								...formCustomer,
								departmentId
							});
							customerID = customer.id;
						} else {
							customerID = customerSelected;
						}
						const car = await service.car.base.add({
							...form,
							customerID,
							registrationNumber: formReg.registrationNumber,
							state: formReg.state,
							departmentId
						});

						const order = await service.order.info.add({
							...form,
							customerID,
							departmentId,
							carID: car.id,
							status: 0
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
						let customerID = params?.item?.customerID;
						await service.customer.profile.update({
							id: Number(customerID),
							...formCustomer
						});
						await service.car.base.update({
							id: params?.item?.carID,
							...form,
							customerID
						});

						await service.order.info.update({
							...form,
							id: params?.id
						});

						await service.order.action.add({
							authorID: storage.get("userInfo").id,
							orderID: params?.id,
							timestamp: +new Date(),
							description: "Update lead",
							type: 0
						});
						emit("addedLead");
						ElMessage.success("Updated success");
					}
				} else {
					console.log("error submit!", fields);
				}
			});
		}
	});
};
function getUser(keyword: string) {
	return service.customer.profile.page({
		size: 10,
		keyWord: keyword
	});
}

const remoteMethod = (query: any) => {
	if (query.input) {
		loading.value = true;
		setTimeout(() => {
			getUser(query.input.toLowerCase()).then((res) => {
				options.value = res.list;
				loading.value = false;
			});
		}, 200);
	} else {
		options.value = [];
	}
};

// function open() {
// 	Form.value?.open({
// 		on: {
// 			submit(data, { close }) {
// 				// data 表单值
// 				// close 关闭表单
// 				// done 关闭加载中
// 				setTimeout(() => {
// 					service.customer.profile.add(data).then(() => {
// 						service.customer.profile
// 							.page({
// 								size: 10,
// 								keyword: data.firstName
// 							})
// 							.then((res) => {
// 								options.value = res.list;
// 								const cus: any = options.value.find(
// 									(item) => item.emailAddress == data.emailAddress
// 								);
// 								form.customerID = cus.customerID;
// 								// loading.value = false;
// 							});
// 						close();
// 					});
// 				}, 2000);
// 			}
// 		},
// 		items: [
// 			{
// 				label: "First Name",
// 				span: 12,
// 				prop: "firstName",
// 				required: true,
// 				component: {
// 					name: "el-input",
// 					props: {
// 						placeholder: "Please input first name"
// 					}
// 				}
// 			},
// 			{
// 				label: "Surname",
// 				span: 12,
// 				prop: "surname",
// 				required: true,
// 				component: {
// 					name: "el-input",
// 					props: {
// 						placeholder: "Please input surname"
// 					}
// 				}
// 			},
// 			{
// 				label: "Email",
// 				span: 12,
// 				prop: "emailAddress",
// 				component: {
// 					name: "el-input",
// 					props: {
// 						placeholder: "Please input email address"
// 					}
// 				}
// 			},
// 			{
// 				label: "Phone",
// 				span: 12,
// 				prop: "phoneNumber",
// 				props: {
// 					placeholder: "test",
// 					mergeProp: true,
// 					error: "Please input phone number"
// 				},
// 				// rules: { message: "Please input correct phone number." },
// 				component: {
// 					name: "el-input",
// 					props: {
// 						placeholder: "Please input phone number"
// 					}
// 				}
// 			},
// 			{
// 				label: "Address",
// 				prop: "address",
// 				component: {
// 					name: "el-input",
// 					props: {
// 						placeholder: "Please input address"
// 					}
// 				}
// 			},
// 			{
// 				label: "Licence",
// 				prop: "licence",
// 				component: {
// 					name: "el-input",
// 					props: {
// 						placeholder: "Please input licence code"
// 					}
// 				}
// 			}
// 		]
// 	});
// }
</script>
