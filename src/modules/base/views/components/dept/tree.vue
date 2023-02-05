<template>
	<div class="dept-tree">
		<div class="dept-tree__header">
			<div>Yards List</div>

			<ul class="dept-tree__op">
				<li @click="refresh()">
					<el-tooltip content="Refresh">
						<el-icon>
							<refresh-icon />
						</el-icon>
					</el-tooltip>
				</li>

				<li v-if="drag && !app.browser.isMini" @click="isDrag = true">
					<el-tooltip content="Drag move">
						<el-icon>
							<operation />
						</el-icon>
					</el-tooltip>
				</li>

				<li v-show="isDrag" class="no">
					<el-button @click="treeOrder(true)" size="small">Save</el-button>
					<el-button @click="treeOrder(false)" size="small">Cancel</el-button>
				</li>
			</ul>
		</div>

		<div class="dept-tree__container" @contextmenu.stop.prevent="onContextMenu">
			<el-scrollbar>
				<el-tree
					v-loading="loading"
					node-key="id"
					default-expand-all
					:data="list"
					:props="{
						label: 'name'
					}"
					:draggable="isDrag"
					:allow-drag="allowDrag"
					:allow-drop="allowDrop"
					:expand-on-click-node="false"
					@node-contextmenu="onContextMenu"
				>
					<template #default="{ node, data }">
						<div class="dept-tree__node">
							<span
								class="dept-tree__node-label"
								:class="{
									'is-active': data.id == info?.id
								}"
								@click="rowClick(data)"
								>{{ node.label }}</span
							>
							<span
								v-if="app.browser.isMini"
								class="dept-tree__node-icon"
								@click="onContextMenu($event, data, node)"
							>
								<el-icon>
									<more-filled />
								</el-icon>
							</span>
						</div>
					</template>
				</el-tree>
			</el-scrollbar>
		</div>

		<cl-form ref="Form" />
	</div>
</template>

<script lang="ts" name="dept-tree" setup>
import { inject, onMounted, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { useCool } from "/@/cool";
import { deepTree, revDeepTree } from "/@/cool/utils";
import { isArray } from "lodash-es";
import { ContextMenu, useForm } from "@cool-vue/crud";
import { Refresh as RefreshIcon, Operation, MoreFilled } from "@element-plus/icons-vue";
import { useBase, checkPerm } from "/$/base";

const props = defineProps({
	drag: {
		type: Boolean,
		default: true
	},
	level: {
		type: Number,
		default: 99
	}
});

const emit = defineEmits(["list-change", "row-click", "user-add"]);

const { service } = useCool();

const { app } = useBase();

// 树形列表
const list = ref<any[]>([]);

// 选中
const info = ref();

// 加载中
const loading = ref<boolean>(false);

// 是否能拖动
const isDrag = ref<boolean>(false);

// cl-form
const Form = useForm();

const viewGroup = inject<any>("viewGroup");

// 允许托的规则
function allowDrag({ data }: any) {
	return data.parentId;
}

// 允许放的规则
function allowDrop(_: any, dropNode: any) {
	return dropNode.data.parentId;
}

// 刷新
async function refresh() {
	loading.value = true;
	isDrag.value = false;

	await service.base.sys.department.list().then((res: any[]) => {
		list.value = deepTree(res);

		if (!info.value) {
			info.value = list.value[0];
		}

		// 模拟点击
		rowClick(info.value);
	});

	loading.value = false;
}

// 获取 ids
function rowClick(e: any) {
	if (e) {
		const ids = e.children ? revDeepTree(e.children).map((e) => e.id) : [];
		ids.unshift(e.id);
		info.value = e;
		viewGroup.checkExpand(false);
		emit("row-click", { item: e, ids });
	}
}

// 编辑部门
function rowEdit(e: any) {
	const method = e.id ? "update" : "add";

	Form.value?.open({
		title: "Edit yard",
		width: "550px",
		props: {
			labelWidth: "100px"
		},
		items: [
			{
				label: "Yard name",
				prop: "name",
				component: {
					name: "el-input"
				},
				required: true
			},
			{
				label: "Parent Name",
				prop: "parentName",
				component: {
					name: "el-input",
					props: {
						disabled: true
					}
				}
			},
			{
				label: "Sort",
				prop: "orderNum",
				component: {
					name: "el-input-number",
					props: {
						"controls-position": "right",
						min: 0,
						max: 100
					}
				}
			}
		],
		form: e,
		on: {
			submit(data, { done, close }) {
				service.base.sys.department[method]({
					id: e.id,
					parentId: e.parentId,
					name: data.name,
					orderNum: data.orderNum
				})
					.then(() => {
						ElMessage.success(`Created “${data.name}” success`);
						close();
						refresh();
					})
					.catch((err) => {
						ElMessage.error(err.message);
						done();
					});
			}
		}
	});
}

// 删除部门
function rowDel(e: any) {
	async function del(f: boolean) {
		await service.base.sys.department
			.delete({
				ids: [e.id],
				deleteUser: f
			})
			.then(() => {
				if (e.id == info.value.id) {
					info.value = null;
				}

				if (f) {
					ElMessage.success("Delete succsess");
				} else {
					ElMessageBox.confirm(
						`"All user which from ${e.name}" department have moved to "${e.parentName}" department`,
						"删除成功"
					);
				}
			});

		refresh();
	}

	ElMessageBox.confirm(
		`This operation will delete all users of "${e.name}" department. Are you sure?`,
		"Warning",
		{
			type: "warning",
			confirmButtonText: "Delete directly",
			cancelButtonText: "Keep users",
			distinguishCancelAndClose: true
		}
	)
		.then(() => {
			del(true);
		})
		.catch((action: string) => {
			if (action == "cancel") {
				del(false);
			}
		});
}

// 部门排序
function treeOrder(f: boolean) {
	if (f) {
		ElMessageBox.confirm(
			"The department structure has changed. Do you want to save it?",
			"Info",
			{
				type: "warning"
			}
		)
			.then(async () => {
				const ids: any[] = [];

				function deep(list: any[], pid: any) {
					list.forEach((e) => {
						e.parentId = pid;
						ids.push(e);

						if (e.children && isArray(e.children)) {
							deep(e.children, e.id);
						}
					});
				}

				deep(list.value, null);

				await service.base.sys.department
					.order(
						ids.map((e, i) => {
							return {
								id: e.id,
								parentId: e.parentId,
								orderNum: i
							};
						})
					)
					.then(() => {
						ElMessage.success("Update sort success.");
					})
					.catch((err) => {
						ElMessage.error(err.message);
					});

				refresh();
				isDrag.value = false;
			})
			.catch(() => null);
	} else {
		refresh();
	}
}

// 右键菜单
function onContextMenu(e: any, d?: any, n?: any) {
	if (!d) {
		d = list.value[0] || {};
	}

	// 权限
	const perm = service.base.sys.department.permission;

	ContextMenu.open(e, {
		list: [
			{
				label: "Add",
				hidden: (n && n.level >= props.level) || !checkPerm(perm.add),
				callback(done) {
					rowEdit({
						name: "",
						parentName: d.name,
						parentId: d.id
					});
					done();
				}
			},
			{
				label: "Edit",
				hidden: !checkPerm(perm.update),
				callback(done) {
					rowEdit(d);
					done();
				}
			},
			{
				label: "Delete",
				hidden: !d.parentId || !checkPerm(perm.delete),
				callback(done) {
					rowDel(d);
					done();
				}
			},
			{
				label: "Add user",
				hidden: !checkPerm(perm.add),
				callback(done) {
					emit("user-add", d);
					done();
				}
			}
		]
	});
}

onMounted(function () {
	refresh();
});
</script>

<style lang="scss" scoped>
.dept-tree {
	height: 100%;
	width: 100%;

	:deep(.el-tree-node__label) {
		display: block;
		height: 100%;
		width: 100%;
	}

	&__header {
		display: flex;
		align-items: center;
		height: 40px;
		padding: 0 10px;
		letter-spacing: 1px;
		position: relative;

		div {
			font-size: 14px;
			flex: 1;
			white-space: nowrap;
		}

		i {
			font-size: 18px;
			cursor: pointer;
		}
	}

	&__op {
		display: flex;

		li {
			display: flex;
			justify-content: center;
			align-items: center;
			list-style: none;
			margin-left: 5px;
			padding: 5px;
			cursor: pointer;

			&:not(.no):hover {
				background-color: #eee;
			}
		}
	}

	&__container {
		height: calc(100% - 40px);

		:deep(.el-tree-node__content) {
			height: 36px;
			margin: 0 5px;
		}
	}

	&__node {
		display: flex;
		align-items: center;
		height: 100%;
		width: 100%;
		box-sizing: border-box;

		&-label {
			display: flex;
			align-items: center;
			flex: 1;
			height: 100%;
			font-size: 14px;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;

			&.is-active {
				color: var(--color-primary);
				font-weight: bold;
			}
		}

		&-icon {
			height: 28px;
			width: 28px;
			line-height: 28px;
			text-align: center;
			margin-right: 5px;
		}
	}
}
</style>
