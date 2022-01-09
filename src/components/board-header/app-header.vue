<template>
	<header class="main-header flex align-center">
		<div class="logo-container">Trello</div>
		<nav class="main-nav">
			<button class="btn">
				<span>Worksapce</span>
				<div>icon</div>
			</button>
			<button class="btn">
				<span>Recent</span>
				<div>icon</div>
			</button>
			<button class="btn">
				<span>Starred</span>
				<div>icon</div>
			</button>
			<button class="btn">
				<span>Templates</span>
				<div>icon</div>
			</button>
			<button class="btn btn-create">Create</button>
		</nav>
		<div role="presentation">
			<input type="search" placeholder="Search" />
		</div>
	</header>
</template>

<script>
export default {
	name: 'appHeader',
	created() {},
};
</script>
<style></style>
