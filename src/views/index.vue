<template>
	<div id="app">
		<v-header></v-header>
		<v-nav :active="mode" @callback="switchMode"></v-nav>
		<div class="container">
			<ul :class="['list', mode === 2 || mode === 4 ? 'large-mode' : 'small-mode', { 'contracted': mode === 3 || mode === 4 }]">
				<li v-for="(obj, i) in data">
					<div class="card">
						<div class="main">
							<span v-if="obj.animated" class="gif-indicator-target" @mouseenter="startAnimated($event, i, obj)" @mouseleave="endAnimated"></span>
							<span v-if="obj.animated && animated !== i" :class="['gif-indicator', { 'isLoading': loadingGif && loadingGif === i }]"></span>
							<img v-if="animated === i" :src="obj.images.hidpi || obj.images.normal" :alt="obj.title">
							<img v-else :src="mode === 2 || mode === 4 ? obj.images.normal : obj.images.teaser" :alt="obj.title">
							<a v-if="loadingGif !== i && animated !== i" :href="obj.html_url" class="info">
								<strong v-html="obj.title"></strong>
								<small v-html="htmlToText(obj.description)"></small>
								<em v-html="format(obj.created_at)"></em>
							</a>
						</div>
						<div class="tools-group">
							<div class="tools-group-left">
								<a v-if="obj.rebounds_count" :href="obj.rebounds_url" class="rebound-mark tooltip" original-title="This shot has rebounds.">{{ obj.rebounds_count }}</a>
								<a v-if="!obj.rebounds_count && obj.rebound_source_url" :href="obj.html_url" class="rebound tooltip" original-title="This shot is a rebound (reply) of another shot. View the original."></a>
								<span v-if="obj.attachments_count" class="attachments tooltip" original-title="This shot has attachments"></span>
							</div>
							<span class="view">{{ numberFormat(obj.views_count) }}</span>
							<span class="cmnt">{{ numberFormat(obj.comments_count) }}</span>
							<span class="fav">{{ numberFormat(obj.likes_count) }}</span>
						</div>
					</div>
					<div class="attribution" @mouseenter="enterAttribution($event, i, obj)" @mouseleave="leaveAttribution">
						<div v-if="obj.team" class="info">
							<img :src="obj.team.avatar_url" alt="head-img">
							<a href="/RypeArts" class="name">{{ obj.team.name }}</a>
							<a class="badge team-badge" href="teams">team</a>
						</div>
						<div v-else class="info">
							<img :src="obj.user.avatar_url" alt="head-img">
							<a href="/RypeArts" class="name">{{ obj.user.name }}</a>
							<a class="badge" href="/pro" v-if="obj.user.pro">pro</a>
						</div>
						<div :class="['hover-card', { top: _top, center: _left }]" v-if="current_hover === i && hover_card_data[i] && hover_card_data[i].loading === false">
							<a class="hover-shots" :href="data[i].user.username">
								<img v-for="index in hover_card_data[i].shots.length > 4 ? 4 : hover_card_data[i].shots.length" :src="hover_card_data[i].shots[index-1].images.teaser" :alt="hover_card_data[i].shots[index-1].title">
							</a>
							<div class="profile-head">
								<img :src="data[i].user.avatar_url" :alt="data[i].user.name" class="head-img">
								<h1>{{ data[i].user.name }}</h1>
								<h3>{{ data[i].user.location }}</h3>
								<div v-if="hover_card_data[i].team_member" class="img-group">
									<img v-for="img_obj in hover_card_data[i].team_member" :src="img_obj.avatar_url" :alt="img_obj.name" :title="img_obj.name">
								</div>
							</div>
							<div class="hover-stats">
								<a v-if="data[i].team" class="badge team-badge" href="teams">team</a>
								<a v-else class="badge" href="/pro" v-if="obj.user.pro">pro</a>
								<a class="count" :href="data[i].user.username">
									<span>{{ numberFormat(data[i].user.shots_count) }}</span>Shots
								</a>
								<a class="count" :href="`${data[i].user.username}/followers`">
									<span>{{ numberFormat(data[i].user.followers_count) }}</span>Followers
								</a>
								<div v-if="hover_card_data[i].teams.length" class="on-teams">
									<strong>Teams</strong>
									<a v-for="index in hover_card_data[i].teams.length > 4 ? 4 : hover_card_data[i].teams.length" :title="hover_card_data[i].teams[index-1].name" :href="hover_card_data[i].teams[index-1].html_url">
										<img :src="hover_card_data[i].teams[index-1].avatar_url" alt="hover_card_data[i].teams[index-1].title">
										<span class="vertical-middle"></span>
									</a>
								</div>
							</div>
						</div>
					</div>
				</li>
			</ul>
			<div v-if="isLoad" class="loading-more">
				<img src="../assets/load-more.gif" height="32" width="32" alt="">
				Loading more…
			</div>
			<div v-if="this.current >= total_page && !isLoad" class="infinite">
				<a class="sign-up-a" href="/signup">Sign up to continue</a>
				<a class="sign-in-a" href="/session/new">or sign in</a>
			</div>
		</div>
		<v-footer></v-footer>
	</div>
</template>

<script>
import fetch from 'isomorphic-fetch'
import { vHeader, vFooter, vNav } from '../components/'

export default {
	name: 'app',
	data() {
		return {
			data: [],
			current: 1,
			Timer: null,
			current_hover: false,
			hover_card_data: {},
			mode: 1,
			isLoad: true,
			loadingGif: false,
			animated: null,
			_left: false,
			_top: false,
			per_page: 20,
<<<<<<< HEAD
			total_page: 1,
=======
			total_page: 10,
>>>>>>> master
			lazyLoadPos: 2000,
			scrollTop: 0
		}
	},
	components: {
		vHeader,
		vFooter,
		vNav
	},
	watch: {
		scrollTop: function(top) {
			let SCREEN_HEIGHT = document.body.scrollHeight
			if (top > SCREEN_HEIGHT - this.lazyLoadPos && !this.isLoad && this.current < this.total_page) {
				this.isLoad = true
				this.current++
				this.loadList()
			}
		}
	},
	methods: {
		format(date) {
			date = date.split('T')[0].split('-')
			let month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
			return `${month[+date[1]]} ${date[2]}, ${date[0]}`
		},
		numberFormat(num) {
			let arr
			let str = ('' + num)
			if (str.length > 6) {
				arr = str.split('').reverse()
				arr.splice(6, 0, ',')
				arr.splice(3, 0, ',')
			}
			else if (str.length > 3) {
				arr = str.split('').reverse()
				arr.splice(3, 0, ',')
			}
			else {
				return num
			}
			return arr.reverse().join('')
		},
		htmlToText(str) {
			return str && str.replace(/<.*?>/g, '')
		},
		startAnimated(e, i, obj) {
			if (this.loadingGif && this.loadingGif === i) {
				return false
			}
			/* global Image */
			let img = new Image()
			img.onload = () => {
				this.animated = i
				this.loadingGif = false
			}
			this.loadingGif = i
			img.src = obj.images.hidpi || obj.images.normal
		},
		endAnimated() {
			this.animated = false
			this.loadingGif = false
		},
		loadList() {
			fetch(`https://api.dribbble.com/v1/shots?access_token=3ec6a30b7a0ab9fd9f0020e238ec546a72362b008c88c8ce5d0365a9ed125b6f&page=${this.current}&per_page=${this.per_page}`)
			.then((data) => data.json())
			.then((data) => {
				this.data = this.data.concat(data)
				this.isLoad = false
			})
		},
		switchMode(i) {
			if ((this.mode - i) % 2) {
				this.data = []
				this.isLoad = true
				this.loadList()
			}
			this.mode = i
		},
		scroll(e) {
			this.scrollTop = document.body.scrollTop
		},
		enterAttribution(e, i, obj) {
			let offset = e.target.getBoundingClientRect()
			if (offset.top < 320) this._top = true
			if (document.body.clientWidth - offset.left < 450) this._left = true
			this.getHoverCardData(obj.user.id, i)
			this.Timer = setTimeout(() => {
				this.current_hover = i
			}, 1000)
		},
		leaveAttribution() {
			clearTimeout(this.Timer)
			this._top = false
			this._left = false
			this.current_hover = false
		},
		getHoverCardData(id, index) {
			if (this.hover_card_data[index]) {
				return false
			}
			this.hover_card_data[index] = {
				loading: true
			}
			let num = 0

			const isCompleted = i => {
				this.hover_card_data[i].loading = false
				this.hover_card_data = Object.assign({}, this.hover_card_data)
			}

			fetch(`https://api.dribbble.com/v1/users/${id}/shots?access_token=3ec6a30b7a0ab9fd9f0020e238ec546a72362b008c88c8ce5d0365a9ed125b6f`)
			.then((data) => data.json())
			.then((data) => {
				this.hover_card_data[index].shots = data
				++num === 2 && isCompleted(index)
			})
			fetch(`https://api.dribbble.com/v1/users/${id}/teams?access_token=3ec6a30b7a0ab9fd9f0020e238ec546a72362b008c88c8ce5d0365a9ed125b6f`)
			.then((data) => data.json())
			.then((data) => {
				this.hover_card_data[index].teams = data
				++num === 2 && isCompleted(index)
			})
			if (this.data[index].team) {
				fetch(`${this.data[index].team.members_url}?access_token=3ec6a30b7a0ab9fd9f0020e238ec546a72362b008c88c8ce5d0365a9ed125b6f`)
				.then((data) => data.json())
				.then((data) => {
					this.hover_card_data[index].team_member = data
				})
			}
		}
	},
	mounted() {
		this.loadList()
		document.addEventListener('scroll', this.scroll, false)
	}
}
</script>

<style lang="scss">
@import '../styles/util';
@import '../styles/reset';
@import '../styles/base64';
@import '../styles/common';

body {
	background-color: #fff;
	@include max-screen($moblie-width) {
		padding-top: $mobile-header-height;
	}
}

.container {
	@include flex-h-center;
	flex-direction: column;
	flex-wrap: wrap;
	// padding: 30px 80px;
	padding: 30px 30px 40px 30px;
	background-color: #f4f4f4;

	@include max-screen(920px) {
	    padding: 20px 30px;
	}

	@include max-screen(530px) {
	    padding: 10px 0;
	}

	.list {
		display: flex;
		flex-wrap: wrap;
		margin: 0 auto;

		>li {
			margin-bottom: 15px;
			width: 220px;
			margin: 0 15px 15px 15px;

			@include max-screen(577px) {
				margin: 5px;
			    width: calc(50% - 10px);

			    .tools-group, .attribution {
			    	display: none;
			    }
			}

			&:hover {
				.badge {
					opacity: 1;
				}
			}
		}

		&.small-mode {
			@include min-screen(2059px) {
			    width: auto;
			    max-width: auto;
			    @include flex-h-center;
			}

			@include max-screen(2059px) {
			    max-width: 1750px;
			}

			// @include max-screen(1927px) {
			@include max-screen(1830px) {
			    max-width: 1500px;
			}

			// @include max-screen(1677px) {
			@include max-screen(1580px) {
			    max-width: 1250px;
			}

			// @include max-screen(1427px) {
			@include max-screen(1330px) {
			    max-width: 1000px;
			}

			// @include max-screen(1177px) {
			@include max-screen(1080px) {
			    max-width: 750px;
			}

			// @include max-screen(810px) {
			@include max-screen(830px) {
			    max-width: 500px;
			}
		}

		&.large-mode {
			// width: 400px;

			li {
				width: 400px;
				@include min-screen(2280px) {
				   width: calc(16.6% - 30px);
				}
				@include max-screen(2279px) {
				   width: calc(20% - 30px);
				}

				@include max-screen(1910px) {
				    width: calc(25% - 30px);
				}

				@include max-screen(1530px) {
				    width: calc(33% - 30px);
				}

				@include max-screen(1177px) {
				    width: calc(50% - 30px);
				}

				@include max-screen(577px) {
					margin: 15px;
				    width: calc(100% - 30px);
				}
			}
		}

		&.contracted {
			.tools-group, .attribution {
		    	display: none;
		    }
		}
	}

	.card {
		box-shadow: 0 0 1px 0px rgba(0, 0, 0, 0.16);
		width: 100%;
		display: flex;
		flex-direction: column;
		background-color: $white;
		padding: 10px;
	}
}

.main {
	position: relative;
	cursor: pointer;
	height: 0;
	overflow: hidden;
	text-align: center;
	padding-bottom: 75%;
	img {
		max-width: 100%;
	}

	.gif-indicator {
		position: absolute;
		top: 6px;
		right: 6px;
		width: 23px;
		height: 14px;
		opacity: .75;
		background-position-y: 0px;
		background-image: url("../assets/gif-indicator.png");

		&.isLoading {
			animation: loading 1s steps(1) infinite .2s;
		}

		@keyframes loading {
			0%{ background-position-y: 56px; }
			33.3%{ background-position-y: 42px; }
			66.6%{ background-position-y: 28px; }
			100%{ background-position-y: 14px; }
		}
	}

	.gif-indicator-target {
		position: absolute;
	    top: 0;
	    right: 0;
	    width: 100%;
	    height: 152px;
	    cursor: pointer;
	    z-index: 999;
	    @at-root .small-mode & {
			height: 80px;
	    }
	}

	.info {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		padding: 15px;
		opacity: 0;
		display: flex;
		flex-direction: column;
		z-index: 99;
		background-color: rgba(255,255,255,0.96);
		transition: all 0.25s;

		strong {
			font-weight: 500;
			font-size: 14px;
			line-height: 1.2;
			color: #444;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
		}

		small {
			margin-top: 10px;
			font-size: 12px;
			@include line-ellipsis(5, 1.4);
			color: #777;

			@at-root .large-mode & {
				@include line-ellipsis(8, 1.4);
			}
		}



		em {
			position: absolute;
			bottom: 10px;
			left: 15px;
			margin-top: 3px;
			font-size: 12px;
			font-weight: normal;
			font-style: normal;
			line-height: 1;
			color: #777;
			flex-shrink: 0;
		}
	}

	&:hover .info {
		opacity: 1;
	}
}

.tools-group {
	@include flex-h-center;
	justify-content: flex-end;
	font-size: 12px;
	padding: 8px 0 0 0;
	color: #aaa;
	position: relative;

	span {
		background-position: 0 1px;
		background-repeat: no-repeat;
		margin-left: 10px;
	}

	.tools-group-left {
		position: absolute;
		left: 0;
		@include flex-center;
	}

	.rebound {
		display: inline-block;
		width: 16px;
		height: 16px;
		margin-right: 5px;
		background-size: contain;
		background-image: url('../assets/rebound-round.png');
	}

	.rebound-mark {
		display: inline-block;
		width: 16px;
		height: 16px;
		padding: 2px 0 0 12px;
		margin-right: 5px;
		color: #7bbb5e;
		background: url('../assets/rebound.png') no-repeat;
		background-size: contain;
	}

	.attachments {
		display: inline-block;
		margin: -2px 0 0 0;
		background-size: contain;
		width: 16px;
		height: 17px;
		background-image: url('../assets/attach.png');
	}

	.view {
		padding-left: 18px;
		background-image: url($view_img);
	}

	.cmnt {
		padding-left: 14px;
		background-image: url($cmnt_img);
	}

	.fav {
		padding-left: 14px;
		background-image: url($fav_img);
	}
}

.attribution {
	font-size: 14px;
	padding: 10px 5px;
	color: #aaa;
	position: relative;

	.info {
		@include flex-v-center;

		img {
			width: 16px;
			height: 16px;
			border-radius: 50%;
		}

		.name {
			color: $blue;
			margin: 0 3px;
		}

		&:hover {
			img {
				opacity: .8;
			}
			a.name {
				color: $dark-blue;
			}
		}
	}

	.badge {
		padding: 1px 3px;
		font-family: Helvetica;
		font-size: 10px;
		font-weight: bold;
		line-height: 1;
		text-transform: uppercase;
		color: $white;
		background: #ccc;
		border-radius: 3px;
		opacity: 0;
		transition: all .2s;

		&:hover {
			background-color: $light-blue;
		}

		&.team-badge:hover {
			background-color: $blue;
		}
	}
}

.loading-more {
	color: #777;
	margin: 20px 0;
	font-size: 14px;
	@include flex-center;
}

.infinite {
    text-align: center;
    margin: 20px;

    a.sign-up-a {
		display: block;
		width: 400px;
		margin: 0 auto;
		padding: 15px 12px;
		font-size: 14px;
		font-weight: 500;
		color: $white;
		border-radius: 4px;
		background-image: linear-gradient(0deg, #ea4c89, #ff72a9);

		&:hover {
			background-image: linear-gradient(0deg, darken(#ea4c89, 2%), darken(#ff72a9, 2%));
		}

		&:active {
			box-shadow: inset 0 2px 3px 0 rgba(0,0,0,.36);
		}

		@include max-screen($moblie-width) {
		    width: 200px;
		}
    }

    a.sign-in-a {
    	color: $blue;
    	margin-top: 20px;
    	display: block;

    	&:hover {
    		color: darken($blue, 30%);
    	}
    }
}

.hover-card {
	background-color: $white;
    padding: 20px 20px 15px;
    width: 374px;
    position: absolute;
    z-index: 9998;
    margin-left: -5px;
    box-shadow: 0 1px 12px rgba(0,0,0,0.2);
    border-radius: 6px;
    bottom: 100%;
    left: 0;
    box-sizing: content-box;

    &::after {
		content: "";
		position: absolute;
		width: 0;
		height: 0;
		bottom: -14px;
		left: 7px;
		box-sizing: border-box;
		border-width: 8px;
		border-style: solid;
		border-color: $tr $tr $white $white;
		transform-origin: 0 0;
		transform: rotate(-45deg);
		box-shadow: -3px 2px 2px rgba(0,0,0,0.05);
    }

    &.top {
		top: 100%;
		bottom: auto;

    	&::after {
			bottom: auto;
			top: 2px;
			left: 29px;
			transform: rotate(-225deg);
    	}
    }

    &.center {
    	left: -187px;

    	&::after {
    		left: 194px;
    	}
    }

    &.top.center::after {
    	left: 217px;
    }

    .hover-shots {
    	width: 100%;
    	display: block;
    	text-align: center;

    	img {
			display: inline-block;
			max-width: 90px;
			max-height: 67px;
			margin-right: 4px;
    	}
    }

    .profile-head {
    	padding-bottom: 60px;
    	text-align: center;

    	.head-img {
			width: 60px;
			height: 60px;
			padding: 4px;
			background-color: #f4f4f4;
			margin: -30px auto 5px auto;
			border-radius: 50%;
    	}

    	.img-group {
    		margin-top: 10px;

    		img {
				border-radius: 50%;
				height: 24px;
				width: 24px;
				margin: 0 2px;
    		}
    	}

    	h1 {
			font-size: 22px;
			line-height: 1;
    		color: $font-color;
    	}

    	h3 {
			font-size: 13px;
			margin: 5px 0 0 0;
			font-weight: normal;
			text-align: center;
    	}
    }

    .hover-stats {
    	position: absolute;
    	width: calc(100% - 40px);
    	margin: 0 20px 15px 20px;
    	bottom: 0;
    	left: 0;
    	padding-top: 10px;
    	@include flex-v-center;
    	border-top: 1px solid #eee;

    	.badge {
    		opacity: 1;
    		margin-right: 12px;
    	}

    	.count {
    		margin-right: 12px;
    		font-size: 13px;
    		color: #999;

    		span {
    			color: $black;
    			margin-right: 3px;
    		}
    	}

    	.on-teams {
    		position: absolute;
			top: 6px;
			right: 0;

			strong {
				margin: 0;
				font-size: 13px;
				font-weight: normal;
				color: #999;
			}

			.vertical-middle {
				display: inline-block;
				height: 24px;
				width: 0;
				vertical-align: middle;
			}

    		img {
				position: relative;
				width: 24px;
				margin: 0 2px;
				vertical-align: middle;
				border-radius: 50%;

				&:hover {
					opacity: 0.75;
				}
    		}
    	}
    }
}
</style>
