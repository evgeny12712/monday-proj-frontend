<template>
	<div class="box">
		<div :class="info.orientation">
			<el-tooltip class="item" effect="dark" :content="info.content" :placement="info.placement">
				<slot></slot>
				<!-- <el-button></el-button> -->
			</el-tooltip>
		</div>
	</div>
</template>

<script>
export default {
	name: 'customToolTip',
	props: ['info'],
	created() {},
};
</script>
