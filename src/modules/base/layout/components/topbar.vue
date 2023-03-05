<template>
	<a-menu v-if="app.info.menu.isGroup" />

	<div class="app-topbar">
		<div
			class="app-topbar__collapse"
			:class="{
				unfold: !app.isFold
			}"
			@click="app.fold()"
		>
			<i class="cl-iconfont cl-icon-fold"></i>
		</div>

		<!-- 路由导航 -->
		<route-nav />
		<div style="font-size: 14px">
			Yard:
			<el-select @change="changeYard" v-if="isAdmin" v-model="departmentID" style="width: 150px">
				<el-option
					v-for="item in departmentList"
					:key="item.id"
					:value="item.id"
					:label="item.name"
				></el-option>
			</el-select>
			<span v-if="!isAdmin">{{ departmentName }}</span>
		</div>
		<div class="flex1"></div>

		<!-- 工具栏 -->
		<!--		<ul class="app-topbar__tools">-->
		<!--			<li>-->
		<!--				<cl-theme />-->
		<!--			</li>-->
		<!--		</ul>-->

		<!-- 用户信息 -->
		<div class="app-topbar__user" v-if="user.info">
			<el-dropdown trigger="click" hide-on-click @command="onCommand">
				<span class="el-dropdown-link">
					<span class="name">{{ user.info.username }}</span>
					<img class="avatar" :src="user.info.headImg" />
				</span>

				<template #dropdown>
					<el-dropdown-menu>
						<el-dropdown-item command="my">
							<i class="cl-iconfont cl-icon-user"></i>
							<span>Profile</span>
						</el-dropdown-item>
						<el-dropdown-item command="exit">
							<i class="cl-iconfont cl-icon-exit"></i>
							<span>Logout</span>
						</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
		</div>
	</div>
</template>

<script lang="ts" name="topbar" setup>
import { useBase } from "/$/base";
import { useCool } from "/@/cool";
import RouteNav from "./route-nav.vue";
import AMenu from "./amenu.vue";
import { storage } from "/@/cool/utils";
import { ref } from "vue";
import BaseSysDepartmentEntity = Eps.BaseSysDepartmentEntity;
const { router, service } = useCool();
const { user, app } = useBase();
const departmentList = ref<BaseSysDepartmentEntity[]>([]);
const userInfo = storage.get("userInfo");

let departmentDefault = storage.get("departmentID");
const isAdmin = ref(userInfo?.roleLabel === "admin");
const departmentID: any = ref();
const departmentName = ref(userInfo ? userInfo.departmentName : "");
if (!departmentDefault && userInfo) {
	storage.set("departmentID", Number(userInfo.departmentId));
}
if (!userInfo) {
	service.base.comm.person().then((res) => {
		isAdmin.value = res.roleLabel === "admin";
		departmentName.value = res.departmentName;
		storage.set("departmentID", Number(res.departmentId));
		if (isAdmin.value) {
			getDepartments();
		}
	});
}
async function getDepartments() {
	service.base.sys.department.list().then((res) => {
		departmentList.value = res.filter((e) => e.id != 1);
		departmentID.value =
			departmentDefault && departmentDefault != 1
				? departmentDefault
				: departmentList.value[0].id;
		storage.set("departmentID", departmentID.value);
	});
}
if (isAdmin) {
	getDepartments();
}
// 跳转
async function onCommand(name: string) {
	switch (name) {
		case "my":
			router.push("/my/info");
			break;
		case "exit":
			await service.base.comm.logout();
			user.logout();
			break;
	}
}

function changeYard(value: any) {
	storage.set("departmentID", value);
	window.location.href = window.location.href;
}
</script>

<style lang="scss" scoped>
.app-topbar {
	display: flex;
	align-items: center;
	height: 50px;
	padding: 0 10px;
	background-color: #fff;
	margin-bottom: 10px;

	&__collapse {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 40px;
		width: 40px;
		cursor: pointer;
		transform: rotateY(180deg);

		&.unfold {
			transform: rotateY(0);
		}

		i {
			font-size: 20px;
		}
	}

	.flex1 {
		flex: 1;
	}

	&__tools {
		display: flex;
		margin-right: 20px;

		& > li {
			display: flex;
			justify-content: center;
			align-items: center;
			list-style: none;
			height: 45px;
			min-width: 45px;
			border-radius: 3px;
			cursor: pointer;
			margin-left: 10px;

			&:hover {
				background-color: rgba(0, 0, 0, 0.1);
			}
		}
	}

	&__user {
		margin-right: 10px;
		cursor: pointer;

		.el-dropdown-link {
			display: flex;
			align-items: center;
		}

		.avatar {
			height: 32px;
			width: 32px;
			border-radius: 32px;
		}

		.name {
			white-space: nowrap;
			margin-right: 15px;
		}

		.el-icon-arrow-down {
			margin-left: 10px;
		}
	}
}
</style>
