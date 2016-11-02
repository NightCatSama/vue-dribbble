<template>
	<footer>
		{{ msg }}.
	</footer>
</template>

<script>
export default {
	data() {
		return {
			msg: 'Footer.'
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../styles/util';
footer {
	height: 200px;
	@include flex-center;
	color: $font-color;
	font-size: 50px;
	color: $white;
	background-color: $sliver;
}
</style>
