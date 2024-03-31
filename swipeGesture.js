/* (c) 2024 void157

	This Source Code Form is subject to the terms of the Mozilla Public License, v.2.0.
	If a copy of the MPL was not distributed with this file, You can obtain one at
	http://mozilla.org/MPL/2.0/.
*/

var gestureExtension = (() => {
	// console.log("swipeGesture extension start")

	const maxWidth = document.documentElement.clientWidth
	const iconSize = parseInt(maxWidth * 0.08)
	const defaultIconTop = (document.documentElement.clientHeight - iconSize) * 0.5
	const backStartAreaX = parseInt(maxWidth * 0.05)
	const forwardStartAreaX = maxWidth - backStartAreaX

	const backEndAreaX = parseInt(maxWidth * 0.24)
	const forwardEndAreaX = maxWidth - backEndAreaX

	/*
	<svg width="32mm" height="32mm" version="1.1" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
	<circle r="16" cx="16" cy="16" fill="#333"/>
	<path d="m16.5 8.5-7.5 7.5 7.5 7.5 1.5-1.5-5-5h11v-2h-11l5-5z" fill="#8000d7"/>
	</svg>
	*/

	const purple = browser.runtime.getURL('arrow_p.png');;
	const white = browser.runtime.getURL('arrow_w.png');;
	
	const arrowIcon = document.createElement('img');
	arrowIcon.style.position = "fixed"
	arrowIcon.style.top = "50%"
	arrowIcon.style.width = "34px"
	arrowIcon.style.display = "none"
	arrowIcon.src = white
	document.body.appendChild(arrowIcon);

	let pinchRatio = 1

	
	let swipedBackEnough = false
	let swipedForwardEnough = false

	// let ticking = false

	function convertCurve(x) {
		if (x <= 1) {
			return x - 1
		} else if ((1 < x) && (x < 3)) {
			return -0.25*(x-3)**2 + 1
		} else {
			return 1
		}
	}

	function touchStart(evt) {
		if ((evt.touches[0].screenX < backStartAreaX) && (evt.touches[0].clientX < backStartAreaX)) {
			arrowIcon.src = white
			arrowIcon.style.transform = "scaleX(1)"

			addEventListener("touchmove", touchMoveBack, {passive: false})
			addEventListener("touchend", touchEndBack)
		}

		if ((evt.touches[0].screenX > forwardStartAreaX) && (evt.touches[0].clientX > forwardStartAreaX)) {
			arrowIcon.src = white
			arrowIcon.style.transform = "scaleX(-1)"

			addEventListener("touchmove", touchMoveForward, {passive: false})
			addEventListener("touchend", touchEndForward)
		}
	}

	function touchMoveBack(evt) {
		if (evt.changedTouches[0].identifier == 0) {
			evt.preventDefault()
			touch = evt.touches[0]
			if (touch.screenX < iconSize) {
				arrowIcon.style.display = "none"
				pinchRatio = touch.clientX / touch.screenX
				arrowIcon.style.width = String(iconSize * pinchRatio) + "px"
				arrowIcon.style.top = String(touch.clientY + (defaultIconTop - touch.screenY) * pinchRatio) + "px"
			} else {
				if (evt.changedTouches[0].screenX < backEndAreaX) {
					arrowIcon.style.left = String((convertCurve(touch.screenX / iconSize) - 1) * iconSize * pinchRatio) + "px"	//値が0付近のため*pinchRatio不要
					arrowIcon.style.display = ""
					arrowIcon.src = white
					swipedBackEnough = false
				} else {
					arrowIcon.src = purple
					swipedBackEnough = true
				}
			}
			
		}
	}

	/*
	function touchMoveBack(evt) {
		if (!ticking) {
			window.requestAnimationFrame(() => {
					...
				}
				ticking=false
			})
			ticking = true
		}
	}
	*/

	
	function touchMoveForward(evt) {
		if (evt.changedTouches[0].identifier == 0) {
			evt.preventDefault()
			touch = evt.touches[0]
			if (maxWidth - iconSize < touch.screenX) {
				arrowIcon.style.display = "none"
				pinchRatio = (maxWidth - touch.clientX) / (maxWidth - touch.screenX)
				arrowIcon.style.width = String(iconSize * pinchRatio) + "px"
				arrowIcon.style.top = String(touch.clientY + (defaultIconTop - touch.screenY) * pinchRatio) + "px"
			} else {
				if (evt.changedTouches[0].screenX > forwardEndAreaX) {
					arrowIcon.style.left = String(maxWidth - convertCurve((maxWidth - touch.screenX) / iconSize) * iconSize * pinchRatio) + "px"
					arrowIcon.style.display = ""
					arrowIcon.src = white
					swipedForwardEnough = false
				} else {
					arrowIcon.src = purple
					swipedForwardEnough = true
				}
			}
		}
	}

	function touchEndBack(evt) {
		if (evt.changedTouches[0].identifier == 0) {
			arrowIcon.style.display = "none"
			if (swipedBackEnough) {
				swipedBackEnough = false
				history.back()
				// console.log("back")
			}
			removeEventListener("touchmove", touchMoveBack, {passive: false})
			removeEventListener("touchend", touchEndBack)
		}
	}

	function touchEndForward(evt) {
		if (evt.changedTouches[0].identifier == 0) {
			arrowIcon.style.display = "none"
			if (swipedForwardEnough) {
				swipedForwardEnough = false
				history.forward()
				// console.log("fore")
			}
			removeEventListener("touchmove", touchMoveForward, {passive: false})
			removeEventListener("touchend", touchEndForward)
		}
	}

	addEventListener("touchstart", touchStart, {passive: false})

})()
