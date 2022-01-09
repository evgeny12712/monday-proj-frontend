<template>
	<div
		class="grid-cell-component-wrapper member-summary-container"
		:style="{ width: info.data.style.maxWidth }"
	>
		<!-- <div class="col-cell summary-container" :style="info.data.style"></div> -->
	</div>
</template>

<script>
export default {
	name: 'memberSummary',
	props: ['info'],
	data() {
		return {};
	},
	created() {},
	methods: {},
	computed: {},
};
</script>
