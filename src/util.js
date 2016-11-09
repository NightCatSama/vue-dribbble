'use strict'

window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame

const QuadEaseIn = (t, b, c, d) => c * ((t = t / d - 1) * t * t + 1) + b

//  滚动到具体位置
const scrollTo = (end, time = 800) => {
	let scrollTop = window.pageYOffset || document.documentElement.scrollTop
	let b = scrollTop
	let c = end - b
	let d = time
	let start = null

	return new Promise((resolve, reject) => {
		function step(timeStamp) {
			if (start === null) start = timeStamp
			let progress = timeStamp - start
			if (progress < time) {
				if (document.documentElement.scrollTop) {
					document.documentElement.scrollTop = QuadEaseIn(progress, b, c, d)
				}
				else {
					document.body.scrollTop = QuadEaseIn(progress, b, c, d)
				}
				window.requestAnimationFrame(step)
			}
			else {
				document.body.scrollTop = end
				resolve(end)
			}
		}
		window.requestAnimationFrame(step)
	})
}

//  滚动到顶部
const scrollToTop = (time) => {
	time = typeof time === 'number' ? time : 800
	return scrollTo(0, time)
}

//  滚动到某元素
const scrollToElem = (elem, time, offset) => {
	let top = elem.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0)
	return scrollTo(top - (offset || 0), time)
}

export default {
	methods: {
		scrollToTop,
		scrollToElem,
		scrollTo
	}
}
