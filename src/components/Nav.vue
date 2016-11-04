<template>
	<nav>
		<ul class="nav" role="navigation">
			<li v-for="(item, index) in data">
				<a :href="item.link">{{ item.name }}</a>
				<ul v-if="item.childrens" class="tab">
					<li v-for="(obj, i) in item.childrens">
						<a :href="obj.link">{{ obj.name }}</a>
					</li>
				</ul>
			</li>
		</ul>
		<div class="display-setting">
			<div class="display-setting-btn">Action</div>
			<div class="display-setting-group">
				<h3>DISPLAY OPTIONS</h3>
				<ul class="layout-group">
					<li :class="{ active: active === 1 }" @click="$emit('callback', 1)">
						<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" width="72" height="72" viewBox="0 0 72 72">
						<path d="M48.992,53.0045 L23.009,53.0045 C21.358,53.0045 20.01,51.6595 20.01,50.0035 L20.01,21.9965 C20.01,20.3375 21.358,18.9955 23.009,18.9955 L48.992,18.9955 C50.649,18.9955 51.99,20.3375 51.99,21.9965 L51.99,50.0035 C51.99,51.6595 50.649,53.0045 48.992,53.0045 L48.992,53.0045 L48.992,53.0045 Z M27.989,47.9995 L43.989,47.9995 C45.094,47.9995 45.989,47.1045 45.989,45.9995 C45.989,44.8945 45.094,43.9995 43.989,43.9995 L27.989,43.9995 C26.884,43.9995 25.989,44.8945 25.989,45.9995 C25.989,47.1045 26.884,47.9995 27.989,47.9995 L27.989,47.9995 L27.989,47.9995 Z M45.993,24.9965 L26.008,24.9965 L26.008,39.0025 L45.993,39.0025 L45.993,24.9965 L45.993,24.9965 Z" fill="#333333"></path>
						</svg>
					</li>
					<li :class="{ active: active === 2 }" @click="$emit('callback', 2)">
						<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" width="72" height="72" viewBox="0 0 72 72">
						<path d="M56.992,61.0045 L15.009,61.0045 C13.358,61.0045 12.01,59.6595 12.01,58.0035 L12.01,13.9965 C12.01,12.3375 13.358,10.9955 15.009,10.9955 L56.992,10.9955 C58.649,10.9955 59.99,12.3375 59.99,13.9965 L59.99,58.0035 C59.99,59.6595 58.649,61.0045 56.992,61.0045 L56.992,61.0045 Z M19.989,55.9995 L51.989,55.9995 C53.094,55.9995 53.989,55.1045 53.989,53.9995 C53.989,52.8945 53.094,51.9995 51.989,51.9995 L19.989,51.9995 C18.884,51.9995 17.989,52.8945 17.989,53.9995 C17.989,55.1045 18.884,55.9995 19.989,55.9995 L19.989,55.9995 Z M53.993,16.9965 L18.008,16.9965 L18.008,47.0025 L53.993,47.0025 L53.993,16.9965 L53.993,16.9965 Z" fill="#333333"></path>
						</svg>
					</li>
					<li :class="{ active: active === 3 }" @click="$emit('callback', 3)">
						<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" width="72" height="72" viewBox="0 0 72 72">
						<path d="M48.992,49.0045 L23.009,49.0045 C21.358,49.0045 20.01,47.6595 20.01,46.0035 L20.01,25.9965 C20.01,24.3375 21.358,22.9955 23.009,22.9955 L48.992,22.9955 C50.649,22.9955 51.99,24.3375 51.99,25.9965 L51.99,46.0035 C51.99,47.6595 50.649,49.0045 48.992,49.0045 L48.992,49.0045 Z M45.993,28.9965 L26.008,28.9965 L26.008,43.0025 L45.993,43.0025 L45.993,28.9965 L45.993,28.9965 Z" fill="#333333"></path>
						</svg>
					</li>
					<li :class="{ active: active === 4 }" @click="$emit('callback', 4)">
						<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" width="72" height="72" viewBox="0 0 72 72">
						<path d="M56.992,57.0045 L15.009,57.0045 C13.358,57.0045 12.01,55.6595 12.01,54.0035 L12.01,17.9965 C12.01,16.3375 13.358,14.9955 15.009,14.9955 L56.992,14.9955 C58.649,14.9955 59.99,16.3375 59.99,17.9965 L59.99,54.0035 C59.99,55.6595 58.649,57.0045 56.992,57.0045 L56.992,57.0045 Z M53.993,20.9965 L18.008,20.9965 L18.008,51.0025 L53.993,51.0025 L53.993,20.9965 L53.993,20.9965 Z" fill="#333333"></path>
						</svg>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</template>

<script>
export default {
	data() {
		return {
			data: [{
				name: 'Popular',
				link: '/shots',
				childrens: [{
					name: 'Recent',
					link: '/shots?sort=recent'
				}, {
					name: 'Most Viewed',
					link: '/shots?sort=views'
				}, {
					name: 'Most Commented',
					link: '/shots?sort=comments'
				}]
			}, {
				name: 'Shots',
				link: '/shots',
				childrens: [{
					name: 'Debuts',
					link: '/shots?list=debuts'
				}, {
					name: 'Team Shots',
					link: '/shots?list=teams'
				}, {
					name: 'Playoffs',
					link: '/shots?list=playoffs',
					spearate: true
				}, {
					name: 'Rebounds',
					link: '/shots?list=rebounds'
				}, {
					name: 'Animated GIFs',
					link: '/shots?list=animated'
				}, {
					name: 'Shots with Attachments',
					link: '/shots?list=attachments',
					spearate: true
				}]
			}, {
				name: 'Now',
				link: '/shots',
				childrens: [{
					name: 'This Past Week',
					link: '/shots?timeframe=week'
				}, {
					name: 'This Past Month',
					link: '/shots?timeframe=month'
				}, {
					name: 'This Past Year',
					link: '/shots?timeframe=year',
					spearate: true
				}, {
					name: 'All Time',
					link: '/shots?timeframe=ever'
				}]
			}]
		}
	},
	props: ['active']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../styles/util';
@import '../styles/common';
@import '../styles/base64';

nav {
	height: $nav-height;
	@include flex-center;
	font-size: 20px;
	color: $default;
	font-size: 14px;
	background-color: $white;
	border-bottom: 1px solid #eee;

	.nav {
		list-style: none;
		display: flex;
		cursor: pointer;

		>li {
			position: relative;
			margin: 0 10px;
			padding-right: 23px;
			background-repeat: no-repeat;
			background-position: 100% 50%;
			background-image: url($bottom-arrow_img);

			>a {
				color: $font-color;
				display: block;
				height: $nav-height;
				line-height: $nav-height;
				text-decoration: none;

				@include max-screen($moblie-width) {
					height: $mobile-nav-height;
					line-height: $mobile-nav-height;
				}
			}

			&:hover .tab {
				display: flex;
			}
		}
	}

	@include max-screen($moblie-width) {
		height: $mobile-nav-height;
		font-size: 14px;

		.nav {

			>li {
				margin: 0 5px;

				a {
					height: $mobile-header-height;
					line-height: $mobile-header-height;
				}

				.tab {
					display: none!important;
				}
			}
		}
	}
}

.tab {
	position: absolute;
	width: 180px;
	flex-direction: column;
	top: 100%;
	left: 0;
	padding: 0 0 10px 0;
	display: none;
	z-index: 9997;
	font-size: 13px;
	background-color: $white;
	border-radius: 0 0 6px 6px;
	box-shadow: 1px 1px 1px rgba(0,0,0,0.3);

	li {
		width: 100%;

		a {
			width: 100%;
			color: $nav-color;
			display: block;
			padding: 5px 15px;
			text-decoration: none;
			white-space: nowrap;

			&:hover {
				color: #333;
				background-color: #eee;
			}
		}
	}

	@include max-screen($moblie-width) {
		display: none!important;
	}
}

.display-setting {
	position: absolute;
	right: 20px;
	padding: 8px;
	border-radius: 5px 5px 0 0;
	z-index: 9995;

	.display-setting-btn {
	    height: 16px;
	    padding-left: 16px;
	    text-indent: -9999px;
	    box-sizing: content-box;
	    background-repeat: no-repeat;
	    background-position: 0 -32px;
	    background-image: url($display-setting_img);
	}

	.display-setting-group {
		display: none;
		position: absolute;
		top: 100%;
		right: 0;
		color: $white;
		padding: 8px;
    	background-color: #333;
		border-radius: 8px 0 8px 8px;

		h3 {
			padding: 0;
			font-size: 12px;
			font-weight: 500;
			white-space: nowrap;
			letter-spacing: .01em;
			color: #ccc;
		}

		.layout-group {
			display: flex;

			li {
				height: 42px;
				width: 100%;
				flex: 1;
				margin: 5px;
				background: #505050;
				border-radius: 5px;
				overflow: hidden;
				cursor: pointer;

				&.active {
					background-color: #999;

					svg path {
						fill: #fff;
					}
				}

				&:hover {
					svg {
						background-color: #999;
					}
				}

				@include max-screen(530px) {
					svg {
						width: 64px;
						height: 42px;
					}
					&:nth-child(1), &:nth-child(4) {
						display: none;
					}
				}
			}

			svg {
				width: 42px;
				height: 42px;
			}
		}
	}

    &:hover {
    	background-color: #333;
    	.display-setting-btn {
    		background-position: 0 0;
    	}

    	.display-setting-group {
    		display: block;
    	}
    }

    @include max-screen($moblie-width) {
    	right: 10px;
    }
}
</style>
