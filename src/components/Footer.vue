<template>
    <footer>
		<div class="footer-top">
			<div class="footer-mod">
				<p class="logo">
                    <a href="/">
                    	<img width="80" alt="dribbble" src="https://d13yacurqjgara.cloudfront.net/assets/logo-footer-hd-a05db77841b4b27c0bf23ec1378e97c988190dfe7d26e32e1faea7269f9e001b.png">
                    </a>
                    <br>
                    Show and tell for designers
                </p>
                <p class="about">
                	What are you working on? Dribbble is a community of designers sharing screenshots of their work, process, and projects.
                </p>
			</div>
			<div class="footer-mod">
                <ul class="extra-links">
                    <li><a id="f-home" href="/about">About</a></li>
                    <li><a href="http://help.dribbble.com">Help</a></li>
                    <li><a href="/contact">Contact</a></li>
                    <li><a href="/terms">Terms</a></li>
                    <li><a href="/guidelines">Guidelines</a></li>
                    <li><a href="/privacy">Privacy</a></li>
                    <li><a href="http://shop.dribbble.com/">Shop</a></li>
                    <li><a href="/testimonials">Testimonials</a></li>
                    <li><a href="/branding">Brand</a></li>
                    <li><a href="/advertise">Advertise</a></li>
                    <li><a href="http://developer.dribbble.com">API</a></li>
                    <li><a href="/integrations">Integrations</a></li>
                </ul>
            </div>
            <div class="footer-mod">
                <h3>
                    <a href="/jobs">
                    	Jobs
                    	<span class="meta">for Designers</span>
                	</a>
                </h3>
                <ol class="jobs-list">
                    <li>
                        <a class="item-team tooltip" rel="tipsy" href="/WeAreTM" original-title="Visit the team's profile">
                            <img src="https://d13yacurqjgara.cloudfront.net/users/715478/avatars/normal/d80a6b0ae9d8875ef64bb5e7ed42854b.jpeg?1418333883" alt="D80a6b0ae9d8875ef64bb5e7ed42854b">
                        </a>
                        <a class="item-link" data-url="http://weare.tm/jobs" href="http://weare.tm/jobs">
							<span class="item-title">TM</span>
                            <span class="item-desc">Senior UI Designer</span>
                        </a>
                    </li>
                    <li>
                        <a class="item-team tooltip" rel="tipsy" href="/schoology" original-title="Visit the team's profile">
                            <img src="https://d13yacurqjgara.cloudfront.net/users/447025/avatars/normal/sgy2.png?1384969055" alt="Sgy2">
                        </a>
                        <a class="item-link" data-url="http://grnh.se/o8mkex1" href="http://grnh.se/o8mkex1">
							<span class="item-title">Schoology</span>
                            <span class="item-desc">Senior UX Designer</span>
                        </a>
                    </li>
                </ol>
            </div>
		</div>
		<div class="footer-bottom">
	        <h4 class="pixels-groups">
				<strong>615,041,208,842</strong> pixels dribbbled
			</h4>
			<div class="pull-left">
				<p>Copyright © 2009–2016 Dribbble LLC. All screenshots © their respective owners. Shipped from Salem, Mass. USA.</p>
				<p class="follow">
		            <a href="/dribbble">
		            	<img width="24" src="https://d13yacurqjgara.cloudfront.net/assets/icon-team-dribbble-8706862cdb0afa7f43f9e0218b073515f0a2bef19780961d324ae4620ebe249b.png" alt="Icon team dribbble">
		            </a>
		            <a href="http://twitter.com/dribbble">
		            	<img width="24" src="https://d13yacurqjgara.cloudfront.net/assets/icon-team-twitter-1fa6921d96b16e47f00ad0381ebbab59ba089c22b21f9bce783c9a4a077f40e9.png" alt="Icon team twitter">
		            </a>
		            <a href="http://facebook.com/dribbble">
		            	<img width="24" src="https://d13yacurqjgara.cloudfront.net/assets/icon-team-facebook-4d63851997b88eb903858057327d93df9f950a55c5104a3a19206f2005682ea3.png" alt="Icon team facebook">
		            </a>
		            <a href="http://instagram.com/dribbble">
		            	<img width="24" src="https://d13yacurqjgara.cloudfront.net/assets/icon-team-instagram-5dfdcd1478ea4a1c1e109b32adbd3878062aa1eb571da63ac379e0da1d2d5762.png" alt="Icon team instagram">
		            </a>
		            <a href="/stories">
		                <img width="24" src="https://d13yacurqjgara.cloudfront.net/assets/icon-team-blog-2705adcb7ee6522051e175d10683208f0fa0ad17daa15fdf3f36aca99c540312.png" alt="Icon team blog">
		            </a>
		        </p>
			</div>
		</div>
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
	display: flex;
	flex-direction: column;
	color: $font-color;
	font-size: 13px;
	color: #999;
	padding: 30px 30px 20px 30px;
	background-color: $white;
	border-top: 1px solid #e5e5e5;

	p {
		margin: 0 50px 10px 0;
		line-height: 1.6;
		box-sizing: content-box;
	}

	h3 {
		margin: 2px 0 14px 0;
		font-size: 14px;
		font-weight: 500;
		color: #999;

		a {
			font-weight: 500;
			color: #999;

			&:hover {
				color: #444;
			}
		}
	}
}

.footer-top {
	display: flex;
	margin-bottom: 20px;

	.logo img:hover {
		opacity: .75;
	}

	.footer-mod {
		width: 25%;
		display: flex;
		flex-direction: column;

		p.about {
			max-width: 300px;
		}
	}

	@include max-screen(800px) {
		flex-direction: column;
		margin-bottom: 0;
		.footer-mod {
			margin-top: 10px;
			width: 100%;
		}
	}
}

.extra-links {
	margin-right: 50px;
	column-count: 3;
	column-gap: 20px;

	@include max-screen(1100px) {
		column-count: 2;
		column-gap: 20px;
	}

	@include max-screen(800px) {
		column-count: 3;
		column-gap: 20px;
	}

	li {
		a {
			font-size: 13px;
			line-height: 1.8;
			font-weight: normal;
			white-space: nowrap;
			color: #999;

			&:hover {
				color: #444;
			}
		}
	}
}

.jobs-list {
	li {
		display: flex;
		margin: 0 10px 10px 0;
	}
	.item-info {
		width: calc(100% - 40%);
	}
	.item-link {

		span {
			display: block;
			height: 50%;
			margin-left: 10px;
		}

		.item-title {
			color: $blue;
		}

		.item-desc {
			color: #999;
			font-size: 12px;
		}

		&:hover {
			opacity: .6;
		}
	}
	img {
		width: 30px;
    	border-radius: 50%;
	}
}

.footer-bottom {
	position: relative;
	overflow: hidden;

	.pull-left {
		float: left;
	}

	p.follow img {
		margin-right: 10px;
		opacity: .37;

		&:hover {
			opacity: .72;
		}
	}

	h4.pixels-groups {
		float: right;
		height: 56px;
	    width: 25%;
		display: block;
		padding-left: 56px;
		margin-top: 10px;
		color: #999;
		font-size: 14px;
		background: url("../assets/dribbble.png") no-repeat;
		background-size: contain;

		strong {
			display: block;
			padding-top: 4px;
			font-size: 1.5em;
			line-height: 1.2;
			font-weight: bold;
			color: #333;
		}

		@include max-screen(1100px) {
			float: left;
			width: 100%;
			margin-bottom: 10px;
		}
	}
}
</style>
