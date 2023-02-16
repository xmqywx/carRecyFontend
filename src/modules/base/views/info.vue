<template>
	<div class="view-my">
		<div class="title">Profile</div>

		<el-form label-width="100px" :model="form" :disabled="loading">
			<el-form-item label="Avatar">
				<cl-upload v-model="form.headImg" />
			</el-form-item>

			<el-form-item label="Username">
				<el-input v-model="form.nickName" placeholder="Please input username" />
			</el-form-item>

			<el-form-item label="Password">
				<el-input v-model="form.password" type="password" />
			</el-form-item>

			<el-form-item>
				<el-button type="primary" :disabled="loading" @click="save">Save</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script lang="ts" name="my-info" setup>
import { ElMessage } from "element-plus";
import { reactive, ref } from "vue";
import { useBase } from "/$/base";
import { useCool } from "/@/cool";
import { cloneDeep } from "lodash-es";

const { service } = useCool();
const { user } = useBase();

// 表单数据
const form = reactive<any>(cloneDeep(user.info));

// 保存状态
const loading = ref(false);

// 保存
async function save() {
	const { headImg, nickName, password } = form;

	loading.value = true;

	await service.base.comm
		.personUpdate({
			headImg,
			nickName,
			password
		})
		.then(() => {
			form.password = "";
			ElMessage.success("Updated");
			user.get();
		})
		.catch((err) => {
			ElMessage.error(err.message);
		});

	loading.value = false;
}
</script>

<style lang="scss">
.view-my {
	background-color: var(--el-bg-color);
	height: 100%;
	padding: 20px;
	box-sizing: border-box;

	.el-form {
		width: 400px;
		max-width: 100%;
	}

	.title {
		margin-bottom: 30px;
		font-size: 15px;
	}
}
</style>
