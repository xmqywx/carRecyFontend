<template>
	<div class="sales-rank">
		<div class="sales-rank__header">
			<span>Yard order ranking</span>
		</div>

		<div class="sales-rank__container">
			<div class="sales-rank__filter">
				<ul>
					<li
						v-for="(item, index) in options.type"
						:key="index"
						:class="{
							active: item.value == type
						}"
						@click="changeDate(item.value)"
					>
						{{ item.label }}
					</li>
				</ul>

				<el-date-picker v-model="date" type="date" />
			</div>

			<ul class="sales-rank__list">
				<li>
					<span>1</span>
					<span>Wetherill Park</span>
					<span>123</span>
				</li>
				<li>
					<span>2</span>
					<span>Lizard Log, Western Sydney Parklands</span>
					<span>30</span>
				</li>
				<li>
					<span>3</span>
					<span>Prairiewood Leisure Centre</span>
					<span>20</span>
				</li>
				<li>
					<span>4</span>
					<span>Fairfield West</span>
					<span>3</span>
				</li>
				<li>
					<span>5</span>
					<span>Prairiewood west</span>
					<span>1</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";

// 日期
const date = ref();

// 类型
const type = ref("day");

// 选项
const options = reactive({
	type: [
		{
			label: "Today",
			value: "day"
		},
		{
			label: "Week",
			value: "week"
		},
		{
			label: "Month",
			value: "month"
		},
		{
			label: "Year",
			value: "year"
		}
	]
});

function changeDate(value: string) {
	type.value = value;
}
</script>

<style lang="scss" scoped>
.sales-rank {
	&__header {
		display: flex;
		align-items: center;
		height: 50px;
		font-size: 15px;
		font-weight: bold;
		padding: 0 20px;
	}

	&__container {
		padding: 0 20px;
	}

	&__filter {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 40px;

		ul {
			display: flex;
			align-items: center;
			margin-right: 20px;
			flex: 1;
			max-width: 220px;

			li {
				list-style: none;
				font-size: 14px;
				cursor: pointer;
				color: #d8d8d8;
				white-space: nowrap;
				margin-right: 10px;
				flex: 1;

				&.active {
					color: #000;
				}

				&:not(.active):hover {
					color: #999;
				}
			}
		}

		:deep(.el-date-editor) {
			width: 150px;
		}
	}

	&__list {
		height: 260px;

		li {
			display: flex;
			align-items: center;
			height: 51px;
			list-style: none;
			font-size: 13px;
			cursor: pointer;

			span {
				&:first-child {
					display: inline-block;
					height: 14px;
					width: 14px;
					border-radius: 14px;
					text-align: center;
					line-height: 14px;
					font-size: 12px;
				}

				&:nth-child(2) {
					flex: 1;
					margin: 0 10px;
					letter-spacing: 0.5px;
					color: #222;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 1;
				}
			}

			&:nth-last-child(n + 3) {
				span {
					&:first-child {
						background-color: #000;
						color: #fff;
					}
				}
			}

			&:hover {
				span:nth-child(2) {
					text-decoration: underline;
				}
			}
		}
	}
}
</style>
