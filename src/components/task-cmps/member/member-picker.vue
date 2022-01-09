<template>
	<div
		class="grid-cell-component-wrapper member-picker-component"
		:class="[{ selected: isSelected }, { 'dropdown-open': showOptions }]"
		@click="toggleSelected"
		:style="{ width: info.data.style.maxWidth }"
	>
		<div class="col-cell" @click="toggleOptions">
			<div class="members-icon flex align-center">
				<img
					:src="
						require(`@/assets/${
							selectedMember ? `img/members/${selectedMember}.png` : 'dapulse-person-column.svg'
						}`)
					"
					aria-hidden="true"
					class="person-bullet-image person-bullet-component"
				/>
			</div>
			<button class="btn btn-icon btn-add">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="hero-icon"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fill-rule="evenodd"
						d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
						clip-rule="evenodd"
					/>
				</svg>
			</button>
			<!-- <span>{{ infoForDisplay }} </span> -->
		</div>
		<div
			v-if="showOptions"
			class="dropdown-modal picker-dropdown-component"
			v-click-outside="closeOptions"
		>
			<div class="picker-dropdown-inner-container">
				<div class="member-input-container">
					<input type="text" v-model="memberName" placeholder="Enter name" />
				</div>
				<div class="member-list-container flex column">
					<div class="member-list-title">
						<span>People</span>
					</div>
					<div class="member-list-container">
						<div class="member-row-container" @click="choseMember('efrat')">
							<div class="member-row flex align-center">
								<div class="member-img">
									<img src="@/assets/img/members/efrat.png" />
								</div>
								<div class="username-box">
									<span>Efrat Zuri</span>
								</div>
							</div>
						</div>
						<div class="member-row-container" @click="choseMember('nir')">
							<div class="member-row flex align-center">
								<div class="member-img">
									<img src="@/assets/img/members/nir.png" />
								</div>
								<div class="username-box">
									<span>Nir Labinski</span>
								</div>
							</div>
						</div>
						<div class="member-row-container" @click="choseMember('evg')">
							<div class="member-row flex align-center">
								<div class="member-img">
									<img src="@/assets/img/members/evg.png" />
								</div>
								<div class="username-box">
									<span>Evgeny Mashkevich</span>
								</div>
							</div>
						</div>
					</div>
					<!-- <ul v-if="opts && opts.length" class="clean-list member-list">
						<li v-for="(member, idx) in opts" :key="idx" class="member-row">
							TODO:add user image
							<img :src="member.imgUrl" alt="">
							<span>{{ member.username }}</span>
						</li>
					</ul> -->
					<!-- <p v-else>No members to show...</p> -->
					<div class="picker-dropdown-footer">
						<button class="btn">Invite a new member by email</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'memberPicker',
	props: ['info'],

	// (){},
	data() {
		return {
			selectedCopy: {},
			isSelected: false,
			showOptions: false,
			memberName: '',
			opts: null,
			members: null,
			selectedMember: null,
		};
	},
	created() {
		this.selectedCopy = JSON.parse(JSON.stringify(this.info.selected));
		if (this.selectedCopy.length) this.selectedMember = this.selectedCopy;
		this.opts = this.info.data.opts;
		this.members = [
			{ imgName: `@/assets/img/members/efrat.png`, username: 'Efrat Zuri' },
			{ imgName: `@/assets/img/members/evg.png`, username: 'Evgeny Mashkevich' },
			{ imgName: `@/assets/img/members/nir.png`, username: 'Nir Labinski' },
		];
	},
	methods: {
		update(memberName) {
			this.$emit('update', memberName);
		},
		toggleOptions() {
			this.showOptions = !this.showOptions;
		},
		closeOptions() {
			this.showOptions = false;
		},
		toggleSelected() {
			this.isSelected = !this.isSelected;
		},
		choseMember(memberName) {
			this.selectedMember = memberName;
			this.toggleOptions();
			this.update(memberName);
		},
	},
	computed: {
		infoForDisplay() {
			return this.selectedCopy.name === 'default' ? '' : this.selectedCopy.name;
		},
		getMember() {
			return !this.selectedMember
				? '@/assets/dapulse-person-column.svg'
				: `@/assets/img/members/${this.selectedMember}.png`;
		},
	},
};
</script>
