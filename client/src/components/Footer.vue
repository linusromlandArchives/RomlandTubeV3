<template>
	<div class="bg-info d-flex text-light align-items-center px-3 py-3">
		<b-container>
			<b-row align-h="center" class="py-1">
				<img src="assets/logo-white_transparent.png" height="45px" class="d-inline-block align-top"
					alt="RomlandTube Logo" />
			</b-row>
			<b-row align-h="center" class="py-1">
				Copyright &copy; 2021 RomlandTube
			</b-row>
			<b-row align-h="center" class="py-1">
				<a href="https://github.com/linusromland/RomlandTube" class="text-light"><u>Source Code</u></a>
			</b-row>
		</b-container>
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