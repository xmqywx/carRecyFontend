<template>
	<div class="category-ratio">
		<div class="category-ratio__header">
			<span>Proportion of categories</span>
		</div>

		<div class="category-ratio__container">
			<v-chart :option="chartOption" autoresize />
		</div>
	</div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";

const chartOption = reactive({
	tooltip: {
		trigger: "item",
		formatter: "{a} <br/>{b}: {c} ({d}%)"
	},
	legend: {
		bottom: 30,
		left: "center",
		data: ["Body", "Engine", "Catelytic Converter"]
	},
	color: ["#3AA1FF", "#36CBCB", "#F2637B"],
	series: [
		{
			name: "Origin",
			type: "pie",
			radius: ["50%", "60%"],
			center: ["50%", "40%"],
			avoidLabelOverlap: false,
			label: {
				show: false,
				position: "center"
			},
			emphasis: {
				label: {
					show: true,
					fontSize: "30",
					fontWeight: "bold"
				}
			},
			labelLine: {
				show: false
			},
			data: [
				{ value: 335, name: "Body" },
				{ value: 310, name: "Engine" },
				{ value: 234, name: "Catelytic Converter" }
			],
			itemStyle: {
				borderColor: "#fff",
				borderWidth: 4
			},
			roundCap: 1
		}
	]
});
</script>

<style lang="scss" scoped>
.category-ratio {
	&__header {
		display: flex;
		align-items: center;
		height: 50px;
		font-size: 15px;
		font-weight: bold;
		padding: 0 20px;
	}

	&__container {
		height: 395px;
		padding: 0 20px;
		box-sizing: border-box;

		.echarts {
			width: 100%;
		}
	}
}
</style>
