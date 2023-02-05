<template>
	<div class="dept-move">
		<cl-form ref="Form" />
	</div>
</template>

<script lang="ts" name="dept-move" setup>
import { useCool } from "/@/cool";
import { ElMessage, ElMessageBox } from "element-plus";
import { useCrud, useForm } from "@cool-vue/crud";
import DeptSelect from "./select.vue";

const { service } = useCool();

// cl-form
const Form = useForm();

// cl-crud
const Crud = useCrud();

// 打开
async function open(ids: any[]) {
	Form.value?.open({
		title: "Move yard",
		width: "600px",
		props: {
			labelWidth: "80px"
		},
		items: [
			{
				label: "Yard",
				prop: "departmentId",
				component: {
					vm: DeptSelect
				}
			}
		],
		on: {
			submit(data, { done, close }) {
				if (!data.departmentId) {
					ElMessage.warning("Please choose yard");
					return done();
				}

				ElMessageBox.confirm("Do you want move to this yard?", "Warning", {
					type: "warning"
				})
					.then(() => {
						service.base.sys.user
							.move({
								...data,
								userIds: ids
							})
							.then(() => {
								ElMessage.success("Move success");
								Crud.value?.refresh();
								close();
							})
							.catch((err) => {
								ElMessage.error(err.message);
								done();
							});
					})
					.catch(() => null);
			}
		}
	});
}

defineExpose({
	open
});
</script>
