<template>
	<div class="page-login">
		<div class="box">
			<div class="logo">
				<img src="/logo.png" alt="Logo" />
				<span>{{ app.info.name }}</span>
			</div>
			<p class="desc">Waste car recycling management system</p>

			<el-form label-position="top" class="form" :disabled="saving" size="large">
				<el-form-item label="User name">
					<input
						v-model="form.username"
						placeholder="Please input user name"
						maxlength="20"
						autocomplete="on"
					/>
				</el-form-item>

				<el-form-item label="Password">
					<input
						v-model="form.password"
						type="password"
						placeholder="Please input password"
						maxlength="20"
						autocomplete="off"
					/>
				</el-form-item>

				<div class="op">
					<el-button round :loading="saving" @click="toLogin">Login</el-button>
				</div>
			</el-form>
		</div>
	</div>
</template>

<script lang="ts" name="login" setup>
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import { useCool } from "/@/cool";
import { useBase } from "/$/base";
// import Captcha from "./components/captcha.vue";

const { refs, router, service } = useCool();
const { user, app } = useBase();

// 状态1
const saving = ref(false);

// 表单数据
const form = reactive({
	username: "",
	password: ""
});

// 登录
async function toLogin() {
	if (!form.username) {
		return ElMessage.error("Please input username");
	}

	if (!form.password) {
		return ElMessage.error("Please input password");
	}
	//
	// if (!form.verifyCode) {
	// 	return ElMessage.error("图片验证码不能为空");
	// }

	saving.value = true;

	try {
		// 登录
		await service.base.open.login(form).then((res) => {
			user.setToken(res);
		});

		// token 事件
		await Promise.all(app.events.hasToken.map((e) => e()));

		// 跳转
		router.push("/");
		saving.value = false;
	} catch (err: any) {
		// refs.value.captcha.refresh();
		saving.value = false;
		ElMessage.error(err.message);
	}

	saving.value = false;
}
</script>

<style lang="scss" scoped>
.page-login {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	width: 100%;
	position: relative;
	background-color: #2f3447;

	.box {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.logo {
			height: 50px;
			margin-bottom: 30px;
			display: flex;
			align-items: center;
			color: #fff;

			img {
				height: 50px;
			}

			span {
				font-size: 38px;
				margin-left: 10px;
				letter-spacing: 5px;
				font-weight: bold;
			}
		}

		.desc {
			color: #eee;
			font-size: 14px;
			letter-spacing: 1px;
			margin-bottom: 50px;
		}

		.el-form {
			width: 300px;

			:deep(.el-form-item) {
				margin-bottom: 20px;

				.el-form-item__label {
					color: #ccc;
				}
			}

			input {
				background-color: transparent;
				color: #fff;
				border: 0;
				height: 40px;
				width: calc(100% - 4px);
				margin: 0 2px;
				padding: 0 2px;
				box-sizing: border-box;
				-webkit-text-fill-color: #fff;
				font-size: 15px;
				border-bottom: 1px solid rgba(255, 255, 255, 0.5);

				&:-webkit-autofill {
					box-shadow: 0 0 0px 1000px transparent inset !important;
					transition: background-color 50000s ease-in-out 0s;
				}

				&::-webkit-input-placeholder {
					font-size: 12px;
				}

				&:focus {
					border-color: #fff;
				}
			}

			.row {
				display: flex;
				align-items: center;
				width: 100%;
				position: relative;

				.captcha {
					position: absolute;
					right: 0;
					bottom: 1px;
				}
			}
		}

		.op {
			display: flex;
			justify-content: center;
			margin-top: 50px;

			:deep(.el-button) {
				width: 140px;
			}
		}
	}
}
</style>
