<template>
	<section class="add-task-btn-component flex align-center">
		<button class="btn btn-blue btn-size-small flex align-center" @click="addTask">New Item</button>
		<div
			class="dropdown-button small-btn"
			@click="toggleAddDropdown"
			:class="{ clicked: isAddDropdown }"
		>
			<ion-icon name="chevron-down-outline" />
			<div class="header-add-dropdown" v-click-outside="toggleAddDropdown" v-if="isAddDropdown">
				<div class="add-group-wrapper" @click.stop="addGroup">
					<span><ion-icon name="easel-outline"></ion-icon> New group of tasks</span>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	name: 'boardHeaderAddTask',
	data() {
		return {
			isAddDropdown: false,
		};
	},
	methods: {
		addTask() {
			this.$emit('addTask');
		},
		addGroup() {
			this.isAddDropdown = false;
			this.$emit('addGroup');
		},
		toggleAddDropdown() {
			this.isAddDropdown = !this.isAddDropdown;
		},
	},
};
</script>
