<template>
	<div id="waiting">
		<div id="waitdetails">
			<div id="waitlist">{{ data.Name }}</div>
			<div id="waitcategory">{{ data.DepartmentName }} - {{ data.Description }}</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
const data = {};
</script>
