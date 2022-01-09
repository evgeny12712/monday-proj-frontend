<template>
	<section class="move-to-opts-container">
		<div v-if="!showOpts">
			<button class="btn opt-item">Move to top</button>
			<button class="btn opt-item">Move to group</button>
			<button class="btn opt-item">Move to board</button>
		</div>
		<div v-else>
			<h4>Move to</h4>
			<input type="text" v-model="searchStr" />
			<ul class="clean-list">
				<li v-for="(opt, idx) in optsToShow" :key="idx">{{ opt }}</li>
			</ul>
		</div>
	</section>
</template>

<script>
export default {
	name: 'moveToOpts',
	props: {
		task: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			showOpts: false,
			searchStr: '',
			moveTo: '',
		};
	},
	methods: {},
	computed: {
		optsToShow() {
			const names = this.$store.getters[`${this.moveTo}Names`];
			if (!this.searchStr) return names;
			return names.filter((name) => name.toLowerCase().includes(this.searchStr.toLowerCase()));
		},
	},
};
</script>
