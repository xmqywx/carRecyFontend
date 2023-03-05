<template>
	<div class="count-effect">
		<div class="card">
			<div class="card__header">
				<span class="label">Count jobs</span>
				<span class="value">{{ count.all }}</span>
			</div>

			<div class="card__container">
				<el-progress
					:percentage="(count.countAssigned / count.all) * 100"
					:stroke-width="8"
				/>
			</div>

			<div class="card__footer">
				<ul class="count-effect__cop">
					<li>
						<span>Assigned</span>

						<div class="fall">
							<i class="el-icon-bottom-right"></i>
							<span>{{ count.countAssigned }}</span>
						</div>
					</li>

					<li>
						<span>To Assign</span>

						<div class="rise">
							<i class="el-icon-top-right"></i>
							<span>{{ count.countTobe }}</span>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { storage, useCool } from "/@/cool";
import { ref } from "vue";

const { service } = useCool();
const count: any = ref({
	all: 0,
	countTobe: 0,
	countAssigned: 0
});
// const params = defineProps({
// 	status: {
// 		type: Number
// 	}
// });
async function getCount() {
	service.order.info
		.getCountJob({
			departmentId: storage.get("departmentID")
		})
		.then((res: any) => {
			count.value.all = res;
		});
}
async function getAssignCount() {
	service.order.info
		.getCountJob({
			departmentId: storage.get("departmentID"),
			status: 1
		})
		.then((res: any) => {
			console.log(res)
			count.value.countAssigned = res;
		});
}
async function getAssignTobeCount() {
	service.order.info
		.getCountJob({
			departmentId: storage.get("departmentID"),
			status: 0
		})
		.then((res: any) => {
			count.value.countTobe = res;
		});
}
getCount();
getAssignCount();
getAssignTobeCount();
</script>

<style lang="scss" scoped>
.count-effect {
	&__cop {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;

		li {
			display: flex;
			list-style: none;
			flex: 1;
			color: #d8d8d8;

			.fall,
			.rise {
				display: flex;
				align-items: center;
				margin-left: 10px;
			}

			.fall {
				color: #13ae7c;
			}

			.rise {
				color: #f21e37;
			}
		}
	}

	.card__container {
		padding-top: 15px;
		padding-right: 10px;
		box-sizing: border-box;
	}
}
</style>
