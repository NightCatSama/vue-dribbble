<template>
	<header>
		<div class="menu" role="button" @click="toggleMenu"></div>
		<a href="/" class="logo">
			<img :src="logo" alt="">
		</a>
		<ul class="nav" role="navigation">
			<li v-for="(item, index) in data">
				<a :href="item.link">{{ item.name }}</a>
				<ul v-if="item.childrens" class="tab">
					<li v-for="(obj, i) in item.childrens" :class="{ 'spearate': obj.spearate }">
						<a :href="obj.link">{{ obj.name }}</a>
					</li>
				</ul>
			</li>
		</ul>
		<div class="right-nav">
			<a href="https://dribbble.com/signup">Sign up</a>
			<a class="sign-in" href="https://dribbble.com/session/new">Sign in</a>
			<div class="search">
				<input type="text" placeholder="Search">
			</div>
		</div>
		<ul v-if="isSmallScreen" class="mobile-menu">
			<li v-if="title" class="title" @click="gobackMenu">
				{{ title }}
			</li>
			<li v-else class="search">
				<input type="text" placeholder="Search">
			</li>
			<li v-for="(item, index) in data" :class="{ 'spearate': item.spearate, 'right-arrow' : item.canClick }" @click="switchMenu($event, item)">
				<a :href="item.link">{{ item.otherName || item.name }}</a>
				<ul v-if="item.childrens" class="tab">
					<li v-for="(obj, i) in item.childrens" :class="{ 'spearate': obj.spearate }">
						<a :href="obj.link">{{ obj.name }}</a>
					</li>
				</ul>
			</li>
		</ul>
	</header>
</template>

<script>
export default {
	name: 'header',
	data() {
		return {
			isSmallScreen: false,
			title: '',
			stage: [],
			logo: require('../assets/logo-small.png'),
			data: [{
				name: 'Shots',
				link: '/shots',
				childrens: [{
					name: 'Popular',
					link: '/shots'
				}, {
					name: 'Recent',
					link: '/shots?sort=recent'
				}, {
					name: 'Debuts',
					link: '/shots?list=debuts'
				}, {
					name: 'Teams',
					link: '/shots?list=teams'
				}, {
					name: 'Playoffs',
					link: '/shots?list=playoffs'
				}, {
					name: 'Highlights',
					link: '/highlights',
					spearate: true
				}, {
					name: 'Projects',
					link: '/projects'
				}, {
					name: 'Goods by Designers',
					link: '/goods'
				}]
			}, {
				name: 'Designers',
				link: '/designers',
				childrens: [{
					name: 'All',
					link: '/designers'
				}, {
					name: 'For Hire',
					link: '/designers?for_hire=on'
				}, {
					name: 'Community',
					link: '/places',
					spearate: true
				}]
			}, {
				name: 'Teams',
				link: '/teams',
				childrens: [{
					name: 'All',
					link: '/teams'
				}, {
					name: 'Hiring Designers',
					link: '/teams?hiring=on'
				}, {
					name: 'Design Teams for Hire',
					link: '/teams?for_hire=on'
				}, {
					name: 'Add Your Design Team',
					link: '/teams/info',
					spearate: true
				}]
			}, {
				name: 'Community',
				link: '/places',
				canClick: true,
				childrens: [{
					name: 'Places',
					link: '/places'
				}, {
					name: 'Meetups',
					link: '/meetups'
				}, {
					name: 'Stories',
					link: '/stories',
					spearate: true
				}, {
					name: 'Podcast',
					link: '/stories/categories/overtime'
				}, {
					name: 'Testimonials',
					link: '/testimonials'
				}, {
					name: 'Guidelines',
					link: '/guidelines',
					spearate: true
				}]
			}, {
				name: 'Jobs',
				link: '/jobs',
				childrens: [{
					name: 'All',
					link: '/jobs'
				}, {
					name: 'Remote / Anywhere',
					link: '/jobs?location=Anywhere'
				}, {
					name: 'Teams Hiring',
					link: '/jobs?teams_only=true'
				}, {
					name: 'Post a Job',
					link: '/jobs/info',
					spearate: true
				}]
			}, {
				name: '···',
				otherName: 'More',
				canClick: true,
				link: '/about',
				childrens: [{
					name: 'About',
					link: '/about'
				}, {
					name: 'Shop',
					link: 'http://shop.dribbble.com/'
				}, {
					name: 'Support',
					link: 'http://help.dribbble.com/'
				}, {
					name: 'Buckets',
					link: '/buckets',
					spearate: true
				}, {
					name: 'Colors',
					link: '/colors'
				}, {
					name: 'Tags',
					link: '/tags'
				}, {
					name: 'Training',
					link: '/training'
				}, {
					name: 'Twitter',
					link: 'http://twitter.com/dribbble',
					spearate: true
				}, {
					name: 'Facebook',
					link: 'http://facebook.com/dribbble'
				}, {
					name: 'Integrations',
					link: '/integrations'
				}]
			}]
		}
	},
	methods: {
		toggleMenu() {
			this.isSmallScreen = !this.isSmallScreen
		},
		switchMenu(e, obj) {
			if (obj.canClick) {
				e.preventDefault()
				this.title = obj.otherName || obj.name
				this.stage = this.data
				this.data = obj.childrens
			}
		},
		gobackMenu() {
			this.data = this.stage
			this.title = ''
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../styles/common';
@import '../styles/base64';

header {
	position: relative;
	width: 100%;
	height: $header-height;
	color: $white;
	background-color: $header-color;
	z-index: 9996;
	font-size: 14px;
	@include flex-v-center;

	.menu {
		width: 16px;
		height: 16px;
		position: absolute;
		left: 15px;
		opacity: 0.5;
		cursor: pointer;
		display: none;
		background: url($menu_img) no-repeat;
	}

	.logo {
		padding: 0 30px;

		img {
			display: block;
		}
	}

	.nav {
		list-style: none;
		display: flex;
		cursor: pointer;

		>li {
			position: relative;

			>a {
				color: $nav-color;
				padding: 0 6px;
				display: block;
				height: $header-height;
				line-height: $header-height;
				text-decoration: none;

				&:hover {
					color: $nav-hover-color;
				}
			}

			&:hover .tab {
				display: flex;
			}
		}
	}

	@include max-screen($moblie-width) {
		position: fixed;
		top: 0;
		left: 0;
		height: $mobile-header-height;
		flex-direction: column;
		justify-content: center;
		overflow: visibile;

		.nav {
			position: absolute;
			flex-direction: column;
			top: 100%;
			width: 100%;
			color: #777;
			display: none;
			background-color: $header-color;

			li {
				a {
					height: $mobile-header-height;
					line-height: $mobile-header-height;
					padding-left: 15px;
					border-top: 1px solid rgba(255,255,255,0.08);
				}

				.tab {
					display: none!important;
				}
			}
		}

		.right-nav {
			margin-right: 5px;
			a, div {
				display: none;
			}
			.sign-in {
				display: block;
			}
		}

		.menu {
			display: block;
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
	background-color: $header-color;
	border-radius: 0 0 6px 6px;
	box-shadow: 1px 1px 1px rgba(0,0,0,0.3);

	li {
		width: 100%;

		&.spearate {
			margin: 4px 0 0 0;
			padding: 4px 0 0 0;
			border-top: 1px solid rgba(255,255,255,0.15);
		}

		a {
			width: 100%;
			color: $nav-color;
			display: block;
			padding: 5px 15px;
			text-decoration: none;
			white-space: nowrap;

			&:hover {
				color: $nav-hover-color;
				background-color: rgba(255,255,255,0.1);
			}
		}
	}
}

.right-nav {
	height: $header-height;
	@include flex-v-center;
	position: absolute;
	top: 0;
	right: 0;
	margin-right: 20px;

	a {
		height: $header-height;
		line-height: $header-height;
		margin-right: 20px;
		color: $nav-color;
		display: block;
		text-decoration: none;

		&:hover {
			color: $nav-hover-color;
		}
	}

	@include max-screen(850px) {
		height: $mobile-header-height;
		line-height: $mobile-header-height;
	}
}

.search input {
	width: 190px;
	padding: 5px 5px 5px 25px;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 13px;
    font-weight: 500;
    vertical-align: middle;
    color: #bbb;
    border: none;
    background-color: #fff;
    background-repeat: no-repeat;
    background-position: 7px 50%;
    background-image: url($search_img);
    border-radius: 4px;

	@include max-screen(1050px) {
		width: 120px;
	}
}

.mobile-menu {
	list-style: none;
	display: flex;
	cursor: pointer;
	position: absolute;
	flex-direction: column;
	top: 100%;
	width: 100%;
	color: #777;
	background-color: $header-color;

	li {
		position: relative;

		a {
			color: $nav-color;
			display: block;
			text-decoration: none;
			height: 45px;
			line-height: 45px;
			padding-left: 15px;
			border-top: 1px solid rgba(255,255,255,0.08);
		}

		&.spearate {
			border-top: 1px solid rgba(255,255,255,0.35);
		}

		&.search {
			padding: 10px;

			input {
				padding-top: 10px;
				padding-bottom: 10px;
				width: 100%;
			}
		}

		&.title {
			height: 45px;
			line-height: 45px;
			font-size: 16px;
			font-weight: bold;
			color: $white;
			text-align: center;
			border-top: 1px solid rgba(255,255,255,0.08);

			&::after {
				content: '';
				background: url($right-arrow_img) no-repeat;
				background-size: contain;
				width: 16px;
				height: 16px;
				position: absolute;
				left: 10px;
				top: 50%;
				font-size: 24px;
				transform: translateY(-50%) rotate(180deg);
			}
		}

		&.right-arrow::after {
			content: '';
			background: url($right-arrow_img) no-repeat;
			background-size: contain;
			width: 16px;
			height: 16px;
			position: absolute;
			right: 10px;
			top: 50%;
			font-size: 24px;
			transform: translateY(-50%);
		}
	}

	@include min-screen($moblie-width) {
		display: none;
	}
}
</style>
