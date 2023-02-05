<template>
	<div>
		<el-form ref="ruleFormRef" :rules="rules" label-width="120" status-icon :model="ruleForm">
			<el-form-item label="Time">
				<el-date-picker
					v-model="ruleForm.timestamp"
					type="datetime"
					placeholder="Select date and time"
					:shortcuts="shortcuts"
				/>
			</el-form-item>
			<el-form-item label="Description" prop="description">
				<el-input v-model="ruleForm.description" type="textarea" />
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm(ruleFormRef)"> Add action </el-button>
			</el-form-item>
		</el-form>
	</div>
	<div style="padding: 20px; background: #f7f7f7">
		<div style="font-size: 16px; font-weight: bold; margin-bottom: 20px">History</div>
		<el-timeline>
			<el-timeline-item
				center
				v-for="item in actionList"
				:timestamp="item.time"
				:key="item.id"
				placement="top"
			>
				<el-card v-if="item.type == 1">
					<h4>Comment by <span style="color:#6c757d">{{ item.username }}</span></h4>
					<p>{{ item.description }}</p>
				</el-card>
				<span v-if="item.type == 0">
					<el-tag type="success">System</el-tag>
					<span style="color:#6c757d">{{ item.username }}:</span>
					{{ item.description }}
				</span>
			</el-timeline-item>
		</el-timeline>
	</div>
</template>

<script lang="ts" name="菜单名称" setup>
import { useCool } from "/@/cool";
import { ref, reactive } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { ElMessage } from "element-plus";
const { service } = useCool();
const actionList = ref<any[]>([]);
import { storage } from "/@/cool/utils";
import dayjs from "dayjs";
const params = defineProps({
	id: {
		type: Number
	}
});
const shortcuts = [
	{
		text: "Today",
		value: new Date()
	},
	{
		text: "Yesterday",
		value: () => {
			const date = new Date();
			date.setTime(date.getTime() - 3600 * 1000 * 24);
			return date;
		}
	},
	{
		text: "A week ago",
		value: () => {
			const date = new Date();
			date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
			return date;
		}
	}
];
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
	description: "",
	timestamp: new Date()
});
const rules = reactive<FormRules>({
	description: [{ required: true, message: "Please input description", trigger: "blur" }]
});
const submitForm = async (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	await formEl.validate((valid, fields) => {
		if (valid) {
			service.order.action
				.add({
					authorID: storage.get("userInfo").id,
					orderID: params.id,
					description: ruleForm.description,
					timestamp: +ruleForm.timestamp,
					type: 1
				})
				.then(() => {
					getAction();
					ElMessage({
						message: "Congrats, added a success message.",
						type: "success"
					});
				});
		} else {
			console.log("error submit!", fields);
		}
	});
};
function getAction() {
	service.order.action
		.list({
			orderID: params.id
		})
		.then((res) => {
			actionList.value = (res || []).map((item) => {
				return {
					...item,
					time: dayjs(Number(item.timestamp)).format("DD-MM-YYYY HH:mm:ss")
				};
			});
		});
}
getAction();
</script>
