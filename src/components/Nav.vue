<template>
	<nav>
		{{ msg }}.
	</nav>
</template>

<script>
export default {
	data() {
		return {
			msg: 'Nav.'
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../styles/util';
nav {
	height: 50px;
	@include flex-center;
	font-size: 20px;
	color: $default;
	background-color: $white;
	border-bottom: 1px solid #eee;
}
</style>
