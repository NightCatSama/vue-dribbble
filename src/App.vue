<template>
	<div id="app">
		<v-header></v-header>
		<v-nav></v-nav>
		<div class="container">
			<ul class="list">
				<li v-for="(obj, i) in data">
					<div class="card">
						<div class="main">
							<img :src="obj.images.teaser" alt="">
							<a :href="obj.html_url" class="info">
								<strong v-html="obj.title"></strong>
								<small v-html="htmlToText(obj.description)"></small>
								<em v-html="format(obj.created_at)"></em>
							</a>
						</div>
						<div class="tools-group">
							<span v-if="obj.attachments_count" class="attachments"></span>
							<span class="view">{{ obj.views_count }}</span>
							<span class="cmnt">{{ obj.comments_count }}</span>
							<span class="fav">{{ obj.likes_count }}</span>
						</div>
					</div>
					<div class="attribution">
						<template v-if="obj.team">
							<img :src="obj.team.avatar_url" alt="head-img">
							<a href="/RypeArts">{{ obj.team.name }}</a>
							<a class="badge team-badge" href="teams">team</a>
						</template>
						<template v-else>
							<img :src="obj.user.avatar_url" alt="head-img">
							<a href="/RypeArts">{{ obj.user.name }}</a>
							<a class="badge" href="/pro" v-if="obj.user.pro">pro</a>
						</template>
					</div>
				</li>
			</ul>
			<div v-if="isLoad" class="loading-more">
				<img src="./assets/load-more.gif" height="32" width="32" alt="">
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
import { vHeader, vFooter, vNav } from './components/'

export default {
	name: 'app',
	data() {
		return {
			data: [],
			current: 1,
			isLoad: true,
			per_page: 20,
			total_page: 10,
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
		htmlToText(str) {
			return str && str.replace(/<.*?>/g, '')
		},
		loadList() {
			fetch(`https://api.dribbble.com/v1/shots?access_token=3ec6a30b7a0ab9fd9f0020e238ec546a72362b008c88c8ce5d0365a9ed125b6f&page=${this.current}&per_page=${this.per_page}`)
			.then((data) => data.json())
			.then((data) => {
				this.data = this.data.concat(data)
				this.isLoad = false
			})
		},
		scroll(e) {
			this.scrollTop = document.body.scrollTop
		}
	},
	mounted() {
		this.loadList()
		document.addEventListener('scroll', this.scroll, false)
	}
}
</script>

<style lang="scss">
@import './styles/util';
@import './styles/reset';

body {
	background-color: #f4f4f4;
}

.container {
	@include flex-h-center;
	flex-direction: column;
	flex-wrap: wrap;
	padding: 30px 80px;

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

		@include min-screen(2059px) {
		    width: auto;
		    max-width: auto;
		    @include flex-h-center;
		}

		@include max-screen(2059px) {
		    max-width: 1750px;
		}

		@include max-screen(1927px) {
		    max-width: 1500px;
		}

		@include max-screen(1677px) {
		    max-width: 1250px;
		}

		@include max-screen(1427px) {
		    max-width: 1000px;
		}

		@include max-screen(1177px) {
		    max-width: 750px;
		}

		@include max-screen(920px) {
		    max-width: 500px;
		}

		li {
			margin-bottom: 15px;
			width: 220px;
			margin: 0 15px 15px 15px;

			@include max-screen(530px) {
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
	}

	.card {
		box-shadow: 0 0 1px 0px rgba(0, 0, 0, 0.16);
		width: 100%;
		display: flex;
		flex-direction: column;
		background-color: $white;
		padding: 8px;
	}
}

.main {
	position: relative;
	cursor: pointer;
	height: 0;
	overflow: hidden;
	padding-bottom: 75%;
	img {
		width: 100%;
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

	.attachments {
		position: absolute;
		left: 0;
		margin: -2px 0 0 0;
		background-size: contain;
		width: 16px;
		height: 16px;
		background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NDkxMSwgMjAxMy8xMC8yOS0xMTo0NzoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkIxQjUyMjNFMEY3QTExRTRBNjMyQkQ3RUIxRDA3QTYzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkIxQjUyMjNGMEY3QTExRTRBNjMyQkQ3RUIxRDA3QTYzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NzMxMzI1NkIwRjVDMTFFNEE2MzJCRDdFQjFEMDdBNjMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NzMxMzI1NkMwRjVDMTFFNEE2MzJCRDdFQjFEMDdBNjMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4AEA7MAAACu0lEQVR42rSXTUhVQRTH37u9skUWhhYFRSVJi6LEKKMwSCki+1z0Ba0KW6UW0jdpSkVQrqxNiwyjNkKLsF49sJKgRRF9gbRJUDEiNQoqtAz/A2fidJjRmXtvB36LOW/u/Z83c+bMuclMJpOIyRaDvWA9KADZ4DN4A9rATRr/Y0EMwjPALfAanABFJK4sD5SCRvAB1IJUnAEUghdgj8O7poA6cB9MjyOAleARmOP5XBltyaQoAUwEW8A78Jv5n4PdYBbIAgtBDfgoni+m7UgkY0jC2aAK/AGnwYhhTi64A9Yw3xDIT8WQhH3g2Dhz+sF28JJtmVqhfT4BJMFqYiroBvdAj+PzKogL4CrzbUp5nPHrYLnwq/1vohUYdnhPmxgvCxyz/alBPEFnuhq0ggkO7+qmXPl7NAMH8Qdg2jjzNoMKhwCyxcn7HoQQV8vYALqEv9IhgLVi3GMLoNgiXg/KwRlQAn6x3xbxCmexKjHuCCziaYt4LRv3gi+Gcmuz41QFuTUHIcWV7aSLiBeWTxbxw3QE5VY+4wGs8BDfAVqEL01BmMQbhe8rOMTvAlVO73qI39aXCdkw3XQu4j/ANp3EOoAmsZw+4qr2HwCvHMXVkX3Mr+OlVKe5XfQUb/EQb5cNyS4xUTUYp4SvdAzx5rDiupRuEL5Lhiv1oEF8P7jhKF5OzUvC1BPmC98Tw7zO/yGuV2Cy8A0Y5p2nuUvANToxkcV1AKp4zGW+BeC9mDdkyIvI4noLOoVvq0eTciSKuA5ANgk1hppgE78cRVwHoI7XT+bLo6BmjtGanYxDXAfQT0nGTXU/b2l/51Ou5JCAqmLn4hDnbblqpx6CdSG64tDi/C4YoXLc7vm86gc2hhWXX0bfqCrWiZywWZo+RDuifFQEhjb7LJgHjtJ+95F/kPLiClhF/7wr6lfNqAADALZ1stInT4qGAAAAAElFTkSuQmCC");
	}

	.view {
		padding-left: 18px;
		background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAALCAYAAACgR9dcAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAcNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAQAAADiNfZLfbtsgFMZfBdGbVpqN8Z85RnUrz3a0XniqskjrrYNpg1IDArK4ebVe7JH2CsNpnE1TWq44h+93OAe+69tBtXTDLFixJy5y+Pv1FwS8y+GPpAkaVbI1/7rX7Pv+25LuNzTr4O0NuB7I0Kue2RYM/bMwZMhh28kVI24/phEEB4nd5LAYD8BDcw9KqRlI/MSjQYhBmvk4iTOMP4EwwBHCAQozD2MSpwR/BscF3W26eySLan68y0U5XFurCEK73c7fRb7UTwhnWYaCEIWh5xSeeRG2HTxhLqYKFTNUc2W5FGCM25Xc2hzCaYRencoK4x/G8ans0dAqhP0A/SNsmo+lfX9SG7tgjx+rzfJFMbRgRm41ZU5+McKKlJq1VuqllM/TK96vpZVmLRUoS3DZtJSLMb46AE1D7oSxraDsrsqhy/icdySI53UaV7MwSdxj1/GXWV0XURrM0qIukyyd2ErSbc+EndjuL5u9y45eeKOZ5j9ZN9eyB4eZCT/Ty7woi6gMsasXne/lje3O9HJkw3dZ5JpB//30lHL2Gbcn37rg5HwmnN218/UfC1/y/sQMO74AAADYSURBVCjPfdK7LoVBFAXgEcQl4Wh0HkLjBZz38BoahUo8gIKKiMKtOP2XkyMSoVERiWsUJBoSWhyamWSy81OsYu+19qx9mYQU0MY+3tHHEzYxF7V1MI0Ofv5AH+sYjcUzuAviZ/TwGvKnaJXiFm6DYAVD+eEJ7Ab+CMMJ24G4wAAWcYMFjDV0sJzwGZI72fEjx+c5Pgm6h4StkLysnO+z83iD81KZ+SoQq9XMkzgMfBeD9bavg+AFZ1X7Bcf1tgumcPDPnb+xhpGmT1Iwjz284QuP2MBs1P4CDDXLDMS4FmkAAAAASUVORK5CYII=");
	}

	.cmnt {
		padding-left: 14px;
		background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAA7CAYAAABPCmvyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QUNCQTIwN0U1M0VBMTFFNUE4Q0ZCNjYzQTA0RkUwODAiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QUNCQTIwN0Q1M0VBMTFFNUE4Q0ZCNjYzQTA0RkUwODAiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkE5NjQ5NjAzRjY5RjExRTFCNUEwRTY2NUZGRTUyOERFIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkE5NjQ5NjA0RjY5RjExRTFCNUEwRTY2NUZGRTUyOERFIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+MUTw+AAAAUhJREFUeNrs1jFLw0AYxvFcSRcR3FyEriK42qKuLoKL4Cq4+QGKkmKdpIri4ODm5tqlg9ghiAgKml1wqKCT0EXFRcQS/y9cJBVP7wZRag5+UMr7JCF3D60Kw9DTqx+LmMUo+nCHE+wikqGcHh7HFbYxiQHkUcA8zrEmgz6G0dRDpqVQRUvuUPtmOL3KEpjy7NdIznNb1xI4cAjsSWAFbYvhBnYkcIsSLg2D96hgDh1ff3mDR/35CGd40hc5xnOSTgLLGMSS3Bavxg1JHQ2r5fpaPRXHsVPAD4LgZx8pHZA+lHGKB7zoPdpH8WMg60Ov9yEJbGl/oA+qPbOZ9SHrw+/8Pjif1l4KFDeaX/5fiirT0XuAYelDHUOGC8tVa4RW1dj6ofThwvKIL/zPPvCqrPvAbCe9cdKBic/6wGB3Hxju6gMDxj68CTAAIByv8kjDc3EAAAAASUVORK5CYII=");
	}

	.fav {
		padding-left: 14px;
		background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAtCAYAAACahYp0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAbhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAQAAADiNfZLRbtsgFIZfBdGbTZqNIfFcUL0qcxKtF66qNNJ2SzBtUGpAQBY3r9aLPdJeYTits2mSyxXn8H+Hc+C/uu4sFzsZwEY+Kl3C3y+/IFBNCb/ndVbbSm7Vt6OT98fbtTjuBG3g9Rdw1bGuta0MHHTtk/asKyFvzEayuO/TCIKTJOxKOOsPwI/6DlTGSZCneSIygkFBU5xPKcafAMnwBOEMEZpgzKYFw5/B24LxNtc8sNV8+XZXjEq4DcEyhA6HQ3qYpMY9IkwpRRlBhCRRkfhnHXiXaH8xVJhLL5yyQRkN+phvzD6UEA4jtPZcVvv0NE4qTIs6bhFOM/SPsK7fl7btWe3DSj68r/brZyvRSnqzd0JG+UUPW1Y5yYNxa2Oehle825pg/NZYUFXgQ82F0n388QTUNbvRPnAt5M28hDGTKtWwHBc0J2RC8mqJ8WL69XKxmE2K7LKYLaqcFgM7N2LfSh0GtvnLTkfZ3guvtHTqp2yWzrTgNDNT473g8V5e2Wa8FzLKotgM+u+nh1S0T789+zYGZ+dLHe3uoq//ALHu8oYBn0TrAAABXklEQVRIx+3Uv0ocURzF8c9e5gHshJA+RVY2XQIpTLGkUEElL5BC8xSJVYqgpdokKGxa/xaiqfIEImihJIGNMYvYiCE2rltMmjs4LLtmp1EET3nuOcP9zW++U6rVajCJD+jDV7xBC5/wEn/xDnMJxvDRlarYwiUGoteHWfxOYrNdj3TW+4Cy3lUOOChQqAfUChTmA+aw00N4Oyu0MIqja8KHGEczRKOBF9jvEN6LZw0IuYOfeIbVnLeC5/iVGUnb087xKi4ztJU7FjKtdxumlKapIgoKqnChVK1Wb+ZKr3GMC2zgIR5gLXonmMhe6zAWUYrlYXyJn8yT6PVH+s4STOXCmR53udHbgEqBESoB3wsUjgI+FygshPg32OshvIuZgGaE4/iacCNCdpHtoR4h6TTPNwxmTOQ3/QNPsZnzNqJX78bDH4xEiAKWkP4PoBTLdwig5HRo+h6ge4BuBaB/RexvZh8Yu2QAAAAASUVORK5CYII=");
	}
}

.attribution {
	@include flex-v-center;
	font-size: 14px;
	padding: 10px 5px;
	color: #aaa;

	img {
		width: 16px;
		height: 16px;
		border-radius: 50%;
	}

	a {
		color: $blue;
		margin: 0 3px;
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
</style>
