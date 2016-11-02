<template>
	<header>
		<div class="menu" role="button" @click="toggleMenu"></div>
		<img class="logo" :src="logo" alt="">
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
	methods: {
		toggleMenu() {
			this.isSmallScreen = !this.isSmallScreen
		},
		switchMenu(e, obj) {
			if (obj.canClick) {
				e.preventDefault()
				this.title = obj.name
				this.stage = this.data
				this.data = obj.childrens
			}
		},
		gobackMenu() {
			this.data = this.stage
			this.title = ''
		}
	},
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
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../styles/common';
$header-color: rgba(47,47,47,0.98);
$header-height: 56px;
$nav-color: #999;
$nav-hover-color: #ddd;
$nav-active-color: #fff;

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
		background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAOCAYAAADNGCeJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3NpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDphYzM3MTJiMC00N2NmLTQyNmItYjlkNi0yNWUxOTY2OTJkZjQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RjMxMjNERjBGNkUzMTFFMjk2RjFCQzM5RTYxRDAwREIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RjMxMjNERUZGNkUzMTFFMjk2RjFCQzM5RTYxRDAwREIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6YWMzNzEyYjAtNDdjZi00MjZiLWI5ZDYtMjVlMTk2NjkyZGY0IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOmFjMzcxMmIwLTQ3Y2YtNDI2Yi1iOWQ2LTI1ZTE5NjY5MmRmNCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgFVVlwAAAB1SURBVHjaYvj///9kIP79nzLwB2QOI5D4xMDAwMtAOfgMMiwNyEgGYmYKDPoLxHNBhjFQCzAxUBGwALEMELtB2ZR4cyfImzeBDDUqOOwWVb0Jcpks1JuUxuauwR2bqdBES2lszqFqdgJ5cxHUZAYKXbYIIMAAaelx1xS8vnsAAAAASUVORK5CYII=") no-repeat;
	}

	.logo {
		padding: 0 30px;
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

	@include max-screen(850px) {
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
					height: 45px;
					line-height: 45px;
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
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAO5JREFUOMuNkkEHAkEYhoeIiIglYk+dukZ0iugfdO0SRUSnTtG1Uz8mOrUiIjqVTp1iiSUiYtnT9E7ezWfspsNj7cz7zHzzzSjP8xQpgBm4Ak3OYAxyIqe01ir+qQJfCDZmgbItFsGNAfPtAhdUwBA8OXcEGSkuhOTIkohZ4MXMQIoBBzsJUsyEma0U43M4P8QaM/cksfRDbDATSNGX9acwZ2YVjynenRl8sBG2VAcRM30p5sGFE6Z7U9AEbe4UieOceH3fB+CyY/oPDuaV2WWNuEDIi1+DHthZ8j6tGTbmrW6EGH5am4YlZ8GS1bTeVpAIxYp5J9kAAAAASUVORK5CYII=);
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
				background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAQCAQAAABuQZ3IAAAAeUlEQVR4AWOYVjVjyyRRBmQwY8uM/zOuoAhOEp1xZcb/6ZfJFJwuRqLgESShCeLTr6IITZWYfg3owktwjf2S028AVVzsEYEKTJaacROo4vwUYZix0tNvAVWc6xOCOVNm+m2gwJlpggirdwG1nO4XQLJ6Wu70JSgCDACtpVM/hAka0AAAAABJRU5ErkJggg==") no-repeat;
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
			background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAQCAQAAABuQZ3IAAAAeUlEQVR4AWOYVjVjyyRRBmQwY8uM/zOuoAhOEp1xZcb/6ZfJFJwuRqLgESShCeLTr6IITZWYfg3owktwjf2S028AVVzsEYEKTJaacROo4vwUYZix0tNvAVWc6xOCOVNm+m2gwJlpggirdwG1nO4XQLJ6Wu70JSgCDACtpVM/hAka0AAAAABJRU5ErkJggg==") no-repeat;
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

	@include min-screen(850px) {
		display: none;
	}
}
</style>
