<template>
	<div
		class="grid-cell-component-wrapper tag-summary-container"
		:style="{ width: info.data.style.maxWidth }"
	>
		<div v-if="tagTrimed && tagTrimed.length" class="col-cell" :style="info.data.style">
			<div v-for="(tag, idx) in tagTrimed" :key="idx" :style="tag.style" class="tag-txt-box">
				<span>
					{{ tagForDisplay(tag.txt) }}
				</span>
			</div>
			<div v-if="isMoreThan3" class="tags-counter-component">
				<span class="tags-counter-txt">+{{ tagsLeftCount }}</span>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'tagSummary',
	props: ['info'],
	data() {
		return {
			tags: null,
			tagTrimed: null,
			isMoreThan3: false,
			tagsLeftCount: 0,
		};
	},
	created() {
		this.tags = this.info.group.tasks
			.filter(({ tagPicker }) => tagPicker)
			.flatMap(({ tagPicker }) => tagPicker);
		let deleteCount = Math.min(3, this.tags.length);
		if (this.tags.length > 3) {
			deleteCount = 2;
			this.isMoreThan3 = true;
			this.tagsLeftCount = this.tags.length - deleteCount;
		}
		this.tagTrimed = this.tags.slice(0, deleteCount);
		// const clrs = this.$store.getters.clrs;
		// this.tagToEdit.style.color = clrs[utilService.getRandomInt(0, clrs.length - 1)];
	},
	methods: {
		tagForDisplay(txt) {
			return `#${txt}`;
		},
	},
};
</script>
