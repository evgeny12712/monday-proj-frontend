<template>
	<div class="column-menu-container dropdown-modal">
		<div class="ds-menu-section essential-section">
			<div class="essential-section-title"><h4>Essential</h4></div>
			<div class="status-box" @click="addColumn('status-picker')">
				<img src="@/assets/img/column-menu/status-picker.png" alt="" />
				<span>Status</span>
			</div>
			<div class="ds-content-title-content-wrapper" @click="addColumn('date-picker')">
				<div class="calendar-icon-box">
					<font-awesome-icon icon="calendar-minus" />
					<span>Date</span>
				</div>
			</div>
		</div>
		<div class="ds-menu-section useful-section">
			<div class="essential-section-title"><h4>Super useful</h4></div>
			<div class="tag-box" @click="addColumn('tag-picker')">
				<span>Tags</span>
			</div>
			<div class="ds-content-title-content-wrapper" @click="addColumn('timeline-picker')">
				<div class="calendar-icon-box">
					<font-awesome-icon icon="calendar-minus" />
					<span>Timeline</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'columnMenu',
	methods: {
		addColumn(columnType) {
			this.$emit('addColumn', columnType);
		},
	},
};
</script>
