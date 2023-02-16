<template>
	<el-form label-width="auto" label-position="top">
		<el-form-item label="Customer">
			<el-select
				v-model="value"
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
	</el-form>
</template>

<script lang="ts" name="菜单名称" setup>
import { useCool } from "/@/cool";

const { service } = useCool();
const emit = defineEmits(["choose"]);

import { ref } from "vue";
import CustomerProfileEntity = Eps.CustomerProfileEntity;
import { useForm } from "@cool-vue/crud";

const options = ref<CustomerProfileEntity[]>([]);
const value = ref<string[]>([]);
const loading = ref(false);
const Form = useForm();
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
				rules: { type: "number", message: "Please input correct phone number." },
				component: {
					name: "el-input",
					props: {
						placeholder: "Please input phone number"
					}
				}
			},
			{
				label: "address",
				prop: "address",
				component: {
					name: "el-input",
					props: {
						placeholder: "Please input address"
					}
				}
			},
			{
				label: "licence",
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
		}, 200);
	} else {
		options.value = [];
	}
};
</script>
