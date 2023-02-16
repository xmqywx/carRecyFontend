<template>
	<el-row :gutter="10" class="schedule-vue-sample">
		<el-col :span="20">
			<ejs-schedule
				height="550px"
				width="100%"
				ref="schedulerObject"
				:group="group"
				@cellClick="cellClick"
				@actionBegin="actionBegin"
				:selectedDate="selectedDate"
				:eventSettings="eventSettings"
				:dragStop="dragStop"
				:resizeStop="resizeStop"
			>
				<e-views>
					<e-view option="Week"></e-view>
					<e-view option="Month"></e-view>
					<e-view option="TimelineDay"></e-view>
					<e-view option="TimelineMonth"></e-view>
				</e-views>
				<e-resources>
					<e-resource
						field="OwnerId"
						title="Owner"
						name="Owners"
						:dataSource="ownerDataSource"
						textField="OwnerText"
						idField="Id"
						:allowMultiple="true"
						colorField="OwnerColor"
					>
					</e-resource>
				</e-resources>
			</ejs-schedule>
		</el-col>
		<el-col :span="4">
			<template #rowTemplate="{ data }">
				<div id="waiting">
					<div id="waitdetails">
						<div id="waitlist">{{ data.id }}</div>
						<div id="waitcategory">1</div>
					</div>
				</div>
			</template>
			<div class="treeview-container">
				<ejs-treeview
					id="Tree"
					:fields="treeviewFields"
					:nodeTemplate="treeTemplate"
					cssClass="treeview-external-drag"
					:allowDragAndDrop="true"
					:nodeDragStop="onTreeDragStop"
					ref="treeviewObject"
				>
				</ejs-treeview>
			</div>
		</el-col>
	</el-row>
</template>
<script lang="ts" name="job-info" setup>
import { storage, useCool } from "/@/cool";
import { TreeViewComponent as ejsTreeview } from "@syncfusion/ej2-vue-navigations";
import {
	ScheduleComponent as ejsSchedule,
	Day,
	Week,
	Month,
	Agenda,
	DragAndDrop,
	Resize,
	TimelineViews,
	TimelineMonth,
	ViewsDirective as eViews,
	ViewDirective as eView,
	ResourcesDirective as eResources,
	ResourceDirective as eResource
} from "@syncfusion/ej2-vue-schedule";
import { reactive, provide, ref, createApp } from "vue";
const { service } = useCool();
const app = createApp({
	template: ""
});
const treeVue = app.component("tree-template", {
	data() {
		return {
			data: {}
		};
	},
	template:
		'<div id="waiting"><div id="waitdetails"><div id="waitlist">{{data.pickupAddress}}</div>' +
		'<div id="waitcategory">{{data.brand}} - {{data.model}} - {{data.year}}</div></div></div>'
});
function treeTemplate() {
	return { template: treeVue };
}
provide("schedule", [Day, Week, Month, TimelineViews, TimelineMonth, Agenda, DragAndDrop, Resize]);
const ownerDataSource = ref<any>([
	{ OwnerText: "Nancy", Id: 1, OwnerColor: "#ffaa00" },
	{ OwnerText: "Steven", Id: 2, OwnerColor: "#f8a398" },
	{ OwnerText: "Michael", Id: 3, OwnerColor: "#7499e1" }
]);
const selectedDate = new Date();
// const allowMultiple = true;
const group = {
	allowGroupEdit: false,
	ignoreWhitespace: true,
	resources: ["Owners"]
};

async function getGroup() {
	service.base.sys.user
		.list({
			label: "driver",
			departmentIds: [storage.get("departmentID")]
		})
		.then((res) => {
			ownerDataSource.value = res.map((item) => {
				return {
					...item,
					OwnerText: item.username,
					Id: item.id
				};
			});
		});
}
getGroup();

const eventSettings = reactive({
	// allowAdding: false,
	// allowEditing: false,
	dataSource: []
});

const treeviewFields = reactive({
	dataSource: [],
	id: "id",
	text: "driverID"
});

function getToBeAssignedJobs() {
	service.job.info
		.list({
			status: 0,
			departmentId: storage.get("departmentID")
		})
		.then((res: any) => {
			let treeviewComponentObject = treeviewObject.value.ej2Instances;

			treeviewComponentObject.fields.dataSource = res || [];
		});
}

function getEvents() {
	service.job.info
		.list({
			date: selectedDate,
			departmentId: storage.get("departmentID")
		})
		.then((res: any) => {
			let schedulerComponentObject = schedulerObject.value.ej2Instances;
			schedulerComponentObject.eventSettings.dataSource = res.map((item: any) => {
				return {
					Id: Number(item.id),
					Subject: `${item.brand} - ${item.model} - ${item.year}`,
					Location: item.pickupAddress,
					StartTime: new Date(Number(item.schedulerStart)),
					EndTime: new Date(Number(item.schedulerEnd)),
					IsAllDay: false,
					EventType: "Requested",
					orderID: item.orderID,
					OwnerId: item.driverID
				};
			});
			// console.log(schedulerComponentObject.eventSettings.dataSource)
		});
}
getToBeAssignedJobs();
getEvents();
async function dragStop(event) {
	await service.job.info.update({
		id: event.data.Id,
		status: 1,
		schedulerStart: +event.data.StartTime,
		schedulerEnd: +event.data.EndTime
	});
}
async function resizeStop(event) {
	await service.job.info.update({
		id: event.data.Id,
		status: 1,
		schedulerStart: +event.data.StartTime,
		schedulerEnd: +event.data.EndTime
	});
}
const schedulerObject: any = ref();
const treeviewObject: any = ref();
function cellClick(args: any) {
	args.cancel = true;
}

async function actionBegin(args: any) {
	if (args.requestType === "eventRemove") {
		const deletedRecord = args.deletedRecords[0];
		await service.job.info.update({
			id: deletedRecord.Id,
			status: 0,
			driverID: null,
			schedulerStart: null,
			schedulerEnd: null
		});
		getToBeAssignedJobs();
	}
}
async function onTreeDragStop(args: any) {
	args.cancel = true;
	let schedulerComponentObject = schedulerObject.value.ej2Instances;
	let cellData = schedulerComponentObject.getCellDetails(args.target);
	let treeviewComponentObject = treeviewObject.value.ej2Instances;
	let filteredData = treeviewComponentObject.fields.dataSource.find(function (item: any) {
		return item.id === Number(args.draggedNodeData.id);
	});

	let eventData = {
		Id: Number(args.draggedNodeData.id),
		Subject: `${filteredData.brand} - ${filteredData.model} - ${filteredData.year}`,
		Location: filteredData.pickupAddress,
		StartTime: cellData.startTime,
		EndTime: cellData.endTime,
		IsAllDay: cellData.isAllDay,
		EventType: "Requested",
		OwnerId: ownerDataSource.value[cellData.groupIndex].Id
	};
	// console.log(eventData)
	schedulerComponentObject.addEvent(eventData);
	await service.job.info.update({
		id: eventData.Id,
		status: 1,
		driverID: eventData.OwnerId,
		schedulerStart: +cellData.startTime,
		schedulerEnd: +cellData.endTime
	});
	getToBeAssignedJobs();
	// schedulerComponentObject.openEditor(eventData, "Add", true);
}
</script>
<style>
@import "../../../../node_modules/@syncfusion/ej2-base/styles/material.css";
@import "../../../../node_modules/@syncfusion/ej2-buttons/styles/material.css";
@import "../../../../node_modules/@syncfusion/ej2-calendars/styles/material.css";
@import "../../../../node_modules/@syncfusion/ej2-dropdowns/styles/material.css";
@import "../../../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
@import "../../../../node_modules/@syncfusion/ej2-navigations/styles/material.css";
@import "../../../../node_modules/@syncfusion/ej2-popups/styles/material.css";
@import "../../../../node_modules/@syncfusion/ej2-vue-schedule/styles/material.css";
.schedule-vue-sample .drag-sample-wrapper {
	display: -ms-flexbox;
	display: flex;
}
.schedule-vue-sample .schedule-container {
	padding-right: 10px;
	width: 100%;
}

.schedule-vue-sample .title-container {
	padding-bottom: 10px;
}

.schedule-vue-sample .e-device-hover {
	background-color: #e0e0e0 !important;
}

.schedule-vue-sample .title-container {
	padding-bottom: 10px;
}

.schedule-vue-sample .treeview-external-drag #waiting {
	height: 100%;
	padding: 0;
}

.schedule-vue-sample .treeview-external-drag #waitdetails {
	width: 95%;
	float: left;
	height: 100%;
	padding: 0;
}

.schedule-vue-sample .title-text {
	font-size: 18px;
	margin: 0px;
	font-weight: bold;
	text-align: center;
}

.schedule-vue-sample .treeview-external-drag #waitlist {
	width: 100%;
	height: 50%;
	font-weight: bold;
	font-family: "Segoe UI";
	font-size: 12px;
	padding: 5px 0 0 10px;
	overflow: hidden;
	text-overflow: ellipsis;
}

.schedule-vue-sample .treeview-external-drag #waitcategory {
	height: 50%;
	font-family: "Segoe UI";
	font-size: 10px;
	opacity: 0.6;
	padding-left: 10px;
	padding-top: 5px;
	overflow: hidden;
	text-overflow: ellipsis;
}

.schedule-vue-sample .treeview-external-drag .e-list-text,
.schedule-vue-sample .treeview-external-drag.e-rtl .e-list-text,
.e-bigger .schedule-vue-sample .treeview-external-drag .e-list-text,
.e-bigger .schedule-vue-sample .treeview-external-drag.e-rtl .e-list-text {
	border: 0.5px solid #e1e7ec;
	height: 50px;
	line-height: 15px;
	padding: 0 5px;
	width: 200px;
}

.schedule-vue-sample .treeview-external-drag .e-list-parent,
.schedule-vue-sample .treeview-external-drag.e-rtl .e-list-parent,
.e-bigger .schedule-vue-sample .treeview-external-drag .e-list-parent,
.e-bigger .schedule-vue-sample .treeview-external-drag.e-rtl .e-list-parent {
	height: 100%;
	padding: 0 2px;
}

.schedule-vue-sample .treeview-external-drag .e-list-item,
.e-bigger .schedule-vue-sample .treeview-external-drag .e-list-item {
	height: 100%;
	padding: 0 0 5px 0;
	background: #f7f7f7;
}

.schedule-vue-sample .treeview-external-drag .e-fullrow,
.e-bigger .schedule-vue-sample .treeview-external-drag .e-fullrow {
	height: 55px;
}

.schedule-vue-sample .treeview-external-drag .e-list-item.e-hover > .e-fullrow,
.schedule-vue-sample .treeview-external-drag .e-list-item.e-active > .e-fullrow,
.schedule-vue-sample .treeview-external-drag .e-list-item.e-active.e-hover > .e-fullrow,
.e-bigger .schedule-vue-sample .treeview-external-drag .e-list-item.e-hover > .e-fullrow,
.e-bigger .schedule-vue-sample .treeview-external-drag .e-list-item.e-active > .e-fullrow,
.e-bigger .schedule-vue-sample .treeview-external-drag .e-list-item.e-active.e-hover > .e-fullrow {
	background-color: transparent;
	border-color: transparent;
	box-shadow: none !important;
}

.schedule-vue-sample .treeview-external-drag .e-text-content,
.e-bigger .schedule-vue-sample .treeview-external-drag .e-text-content,
.schedule-vue-sample .treeview-external-drag.e-rtl .e-text-content,
.e-bigger .schedule-vue-sample .treeview-external-drag.e-rtl .e-text-content {
	padding: 0;
	background-color: inherit;
	background: #fff;
}
.schedule-vue-sample .e-drag-item.e-treeview.treeview-external-drag,
.e-bigger .schedule-vue-sample .e-drag-item.e-treeview.treeview-external-drag {
	padding: 0 !important;
}

.schedule-vue-sample .e-schedule.schedule-drag-drop .e-timeline-view .e-resource-left-td,
.schedule-vue-sample .e-schedule.schedule-drag-drop .e-timeline-month-view .e-resource-left-td {
	width: 160px;
}

.schedule-vue-sample
	.e-schedule.schedule-drag-drop
	.e-resource-cells.e-parent-node
	.specialist-category {
	padding-left: 30px;
}

.e-schedule.schedule-drag-drop .e-resource-cells.e-parent-node .template-wrap {
	padding: 3px 0px;
}

.schedule-vue-sample
	.e-schedule.e-rtl.schedule-drag-drop
	.e-resource-cells.e-parent-node
	.specialist-category {
	padding-right: 30px;
}

.schedule-vue-sample
	.e-schedule.schedule-drag-drop
	.e-resource-cells.e-child-node
	.specialist-category,
.schedule-vue-sample
	.e-schedule.schedule-drag-drop
	.e-resource-cells.e-child-node
	.specialist-name {
	padding: 5px;
}

.tailwind
	.schedule-vue-sample
	.e-schedule.schedule-drag-drop
	.e-resource-cells.e-child-node
	.specialist-category,
.tailwind
	.schedule-vue-sample
	.e-schedule.schedule-drag-drop
	.e-resource-cells.e-child-node
	.specialist-name,
.tailwind-dark
	.schedule-vue-sample
	.e-schedule.schedule-drag-drop
	.e-resource-cells.e-child-node
	.specialist-category,
.tailwind-dark
	.schedule-vue-sample
	.e-schedule.schedule-drag-drop
	.e-resource-cells.e-child-node
	.specialist-name {
	padding: unset !important;
}

.schedule-vue-sample
	.e-schedule.schedule-drag-drop
	.e-resource-cells.e-parent-node
	.specialist-name {
	padding: 0 10px;
}

.schedule-vue-sample .e-schedule.schedule-drag-drop .specialist-name {
	font-size: 13px;
}
.schedule-vue-sample .e-schedule.schedule-drag-drop .specialist-designation {
	font-size: 10px;
}

.schedule-vue-sample .e-schedule.schedule-drag-drop .specialist-image {
	width: 45px;
	height: 40px;
	float: left;
	border-radius: 50%;
	margin-right: 10px;
	background-repeat: no-repeat;
	background-size: 45px;
}

@media (max-width: 550px) {
	.schedule-vue-sample .schedule-container {
		padding-bottom: 10px;
	}

	.schedule-vue-sample .treeview-external-drag.e-treeview,
	.e-bigger .schedule-vue-sample .treeview-external-drag.e-treeview {
		width: 250px;
	}

	.e-bigger .schedule-vue-sample .treeview-external-drag.e-treeview.e-drag-item {
		position: relative !important;
	}

	.schedule-vue-sample .drag-sample-wrapper {
		display: block;
	}
}
.e-disble-not-allowed {
	cursor: unset !important;
}
.e-drag-item.treeview-external-drag .e-icon-expandable {
	display: none;
}
</style>
