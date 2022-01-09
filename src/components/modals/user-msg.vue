<template>
	<div class="monday-notice-container">
		<div class="user-msg-container">
			<div class="check-user-msg">
				<span><font-awesome-icon icon="check" /></span>
			</div>
			<div class="msg-content">
				<span>{{ msg }}</span>
			</div>
			<div class="undo-action">
				<button v-if="isUndo" class="undo-btn" @click="undo">Undo</button>
			</div>
			<button class="close-user-msg" @click="closeUserMsg">X</button>
		</div>
	</div>
</template>

<script>
export default {
	name: 'userMsg',
	props: {
		msg: {
			type: String,
			required: true,
		},
	},
	data() {
		return { isUndo: true };
	},
	created() {
		if (
			this.msg === 'We successfully restored the group' ||
			this.msg === 'We successfully restored the task'
		)
			this.isUndo = false;
	},
	methods: {
		closeUserMsg() {
			this.$emit('closeUserMsg');
		},
		undo() {
			this.$emit('undo');
		},
	},
	computed: {},
};
</script>
