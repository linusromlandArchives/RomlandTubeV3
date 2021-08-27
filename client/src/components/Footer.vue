<template>
	<div class="bg-info d-flex align-items-center justify-content-around p-3">
		<a href="https://github.com/linusromland/RomlandTube/blob/master/LICENSE" class="text-light"><u>Copyright &copy; 2021 RomlandTube</u></a>
		<a href="https://github.com/linusromland/RomlandTube" class="text-light"><u>Source Code</u></a>
	</div>
</template>

<script>
	export default {
		name: "Footer",
		data: () => {
			return {
				data: ""
			};
		}
	};
</script>

<style scoped>
	.bg-info {
		background-color: #107cf1 !important;
	}
</style>