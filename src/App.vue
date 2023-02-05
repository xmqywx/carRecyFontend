<template>
	<el-config-provider :locale="en">
		<router-view />
	</el-config-provider>
</template>
<script lang="ts" setup>
import { ElConfigProvider } from "element-plus";
import en from "element-plus/lib/locale/lang/en";
</script>
<style>

</style>
