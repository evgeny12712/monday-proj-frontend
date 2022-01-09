<template>
	<el-dropdown>
		<span class="el-dropdown-link">
			Dropdown List<i class="el-icon-arrow-down el-icon--right"></i>
		</span>
		<el-dropdown-menu slot="dropdown">
			<el-dropdown-item v-for="(action, idx) in actions" :key="idx"> {{ action }}</el-dropdown-item>
			<!-- <el-dropdown-item divided>Action 5</el-dropdown-item> -->
		</el-dropdown-menu>
	</el-dropdown>
</template>

<script>
export default {
	name: 'customDropdown',
	props: ['actions'],
	created() {
		console.log(this.actions);
	},
};
</script>

<style load="scss">
.el-dropdown-link {
	cursor: pointer;
	color: #409eff;
}
.el-icon-arrow-down {
	font-size: 12px;
}
</style>
