/* (c) 2024 void157

	This Source Code Form is subject to the terms of the Mozilla Public License, v.2.0.
	If a copy of the MPL was not distributed with this file, You can obtain one at
	http://mozilla.org/MPL/2.0/.
*/

var gestureExtension = (() => {
	// console.log("swipeGesture extension start")

	// (load variables)
	var startAreaRange = 0.05
	// var unit_y_pos = "vh"
	const iconPos = 0.5
	const iconSize = window.innerWidth * 0.08

	const clientWidth = document.documentElement.clientWidth
	const maxScrollWidth = document.documentElement.scrollWidth
	// const defaultIconTop = (document.documentElement.clientHeight - iconSize) * 0.5
	const backStartAreaScreenX = parseInt(clientWidth * 0.05)
	// const backStartAreaScrollX = parseInt(maxScrollWidth * 0.05)
	// const forwardStartAreaScreenX = clientWidth - backStartAreaScreenX
	// const forwardStartAreaScrollX = maxScrollWidth - backStartAreaScrollX

	const backEndAreaScreenX = parseInt(clientWidth * 0.24)
	// const backEndAreaScrollX = parseInt(maxScrollWidth * 0.24)
	const forwardEndAreaScreenX = clientWidth - backEndAreaScreenX
	// const forwardEndAreaScrollX = maxScrollWidth - backEndAreaScrollX

	/*
	<svg width="32mm" height="32mm" version="1.1" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
	<circle r="16" cx="16" cy="16" fill="#333"/>
	<path d="m16.5 8.5-7.5 7.5 7.5 7.5 1.5-1.5-5-5h11v-2h-11l5-5z" fill="#8000d7"/>
	</svg>
	*/

	const purple = browser.runtime.getURL('../icons/arrow_p.png');;
	const white = browser.runtime.getURL('../icons/arrow_w.png');;
	
	// Making icon element.
	const arrowIcon = document.createElement('img');
	arrowIcon.style.position = "fixed"
	arrowIcon.style.translate = "0% -50%"
	arrowIcon.style.display = "none"
	arrowIcon.src = white
	document.body.appendChild(arrowIcon);

	// let pinchRatio = 1

	
	let swipedBackEnough = false
	let swipedForwardEnough = false

	// let ticking = false

	// Function for pointer position and icon position.
	function convertCurve(x) {
		if (x <= 2) {
			return -0.25*(x-2)**2
		} else {
			return
		}
	}

	function touchStart(evt) {
		// backEndAreaScreenX / visualViewport.scale
		// if ((evt.touches[0].screenX < backStartAreaScreenX) && (evt.touches[0].clientX < backStartAreaScrollX)) {

		// touch座標がscale補正後の指定範囲内 && viewportが画面（左）端にあること
		if ((evt.touches[0].pageX < backStartAreaScreenX / visualViewport.scale) &&
			visualViewport.pageLeft == 0) {
			arrowIcon.src = white
			arrowIcon.style.top = String(visualViewport.offsetTop + visualViewport.height * iconPos) + "px"
			arrowIcon.style.width = String(iconSize / visualViewport.scale) + "px"
			arrowIcon.style.scale = 1

			addEventListener("touchmove", touchMoveBack, {passive: false})
			addEventListener("touchend", touchEndBack)
		}

		// if ((evt.touches[0].screenX > forwardStartAreaScreenX) && (evt.touches[0].clientX > forwardStartAreaScrollX)) {
		if (((clientWidth - evt.touches[0].pageX) < backStartAreaScreenX / visualViewport.scale) && 
			visualViewport.pageLeft + visualViewport.width > document.documentElement.scrollWidth - 0.1) {
			arrowIcon.src = white
			arrowIcon.style.top = String(visualViewport.offsetTop + visualViewport.height * iconPos) + "px"
			arrowIcon.style.width = String(iconSize / visualViewport.scale) + "px"
			arrowIcon.style.scale = -1

			addEventListener("touchmove", touchMoveForward, {passive: false})
			addEventListener("touchend", touchEndForward)
		}
	}

	function touchMoveBack(evt) {
		if (evt.changedTouches[0].identifier == 0) {
			evt.preventDefault()
			// touch = evt.touches[0]
			// arrowIcon.style.scale = 1 / visualViewport.scale

			if (evt.touches[0].pageX < iconSize / visualViewport.scale) {
				arrowIcon.style.display = "none"
				// pinchRatio = touch.clientX / touch.screenX
				arrowIcon.style.width = String(iconSize / visualViewport.scale) + "px"
				// arrowIcon.style.top = String(visualViewport.offsetTop + visualViewport.height * iconPos) + "px"
			} else {
				if (evt.changedTouches[0].pageX < backEndAreaScreenX / visualViewport.scale) {
					// arrowIcon.style.left = String((convertCurve(evt.touches[0].pageX / visualViewport.scale / iconSize) - 1) * iconSize / visualViewport.scale) + "px"
					arrowIcon.style.left = String((convertCurve(evt.touches[0].pageX * visualViewport.scale / iconSize)) * iconSize / visualViewport.scale) + "px"
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
	
	function touchMoveForward(evt) {
		if (evt.changedTouches[0].identifier == 0) {
			evt.preventDefault()
			// touch = evt.touches[0]
			if ((document.documentElement.scrollWidth - iconSize / visualViewport.scale) < evt.touches[0].pageX) {
				arrowIcon.style.display = "none"
				// pinchRatio = (maxScrollWidth - touch.clientX) / (clientWidth - touch.screenX)
				arrowIcon.style.width = String(iconSize / visualViewport.scale) + "px"
				// arrowIcon.style.top = String(visualViewport.offsetTop + visualViewport.height * iconPos) + "px"
			} else {
				if (evt.changedTouches[0].pageX > (document.documentElement.scrollWidth - backEndAreaScreenX / visualViewport.scale)) {
					arrowIcon.style.left = String(document.documentElement.scrollWidth - convertCurve((document.documentElement.scrollWidth - evt.touches[0].pageX) * visualViewport.scale / iconSize) * iconSize - iconSize / visualViewport.scale) + "px"
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
