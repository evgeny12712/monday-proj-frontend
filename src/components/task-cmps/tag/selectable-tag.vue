<template>
	<section class="selectable-tag">
		<ul class="clean-list flex gap">
			<li v-for="(tag, idx) in tags" :key="idx" class="flex align-center gap">
				<label>{{ tag }}</label>
				<input type="checkbox" />
			</li>
		</ul>
	</section>
</template>

<script>
export default {
	name: 'selectableTag',
	props: {
		tags: {
			type: Array,
			required: true,
		},
	},
};
</script>
