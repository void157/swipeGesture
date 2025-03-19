/* (c) 2024 void157

	This Source Code Form is subject to the terms of the Mozilla Public License, v.2.0.
	If a copy of the MPL was not distributed with this file, You can obtain one at
	http://mozilla.org/MPL/2.0/.
*/

var gestureExtension = (() => {
	console.log("swipeGesture extension start")

	const purple = browser.runtime.getURL('../icons/arrow_p.png')
	const white = browser.runtime.getURL('../icons/arrow_w.png')

	// (load variables)

	let iconSizeNum
	let iconSizeUnit
	let iconPosNum
	let iconPosUnit
	let startAreaNum
	let startAreaUnit
	let endAreaNum
	let endAreaUnit

	let arrowIcon

	let backStartAreaScreenX
	let backEndAreaScreenX

	// function restoreOptions() {
	function restore(result) {
		iconSizeNum = result.iconSizeNum || 8
		iconSizeUnit = (result.iconSizeUnit === 0 ? "vw" : "px")
		iconPosNum = result.iconPosNum || 50
		iconPosUnit = (result.iconPosUnit === 0 ? "vh" : "px")
		startAreaNum = result.startAreaNum || 5
		startAreaUnit = (result.startAreaUnit === 0 ? "vw" : "px")
		endAreaNum = result.endAreaNum || 76
		endAreaUnit = (result.endAreaUnit === 0 ? "vw" : "px")

		/*
		<svg width="32mm" height="32mm" version="1.1" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
		<circle r="16" cx="16" cy="16" fill="#333"/>
		<path d="m16.5 8.5-7.5 7.5 7.5 7.5 1.5-1.5-5-5h11v-2h-11l5-5z" fill="#8000d7"/>
		</svg>
		*/

		// Making icon element.
		arrowIcon = document.createElement('img')
		arrowIcon.style.position = "fixed"
		arrowIcon.style.translate = "0% -50%"
		arrowIcon.style.display = "none"
		arrowIcon.style.zIndex = Number.MAX_SAFE_INTEGER
		arrowIcon.src = white
		
		arrowIcon.style.top = iconPosNum + iconPosUnit
		arrowIcon.style.width = iconSizeNum + iconSizeUnit
		document.body.appendChild(arrowIcon)

		backStartAreaScreenX = (startAreaUnit == "vw" ? visualViewport.width * startAreaNum / 100 : startAreaNum + startAreaUnit)
		backEndAreaScreenX = (endAreaUnit == "vw" ? visualViewport.width * endAreaNum / 100 : endAreaNum + endAreaUnit)	// vw or px
		// console.log(backStartAreaScreenX, backEndAreaScreenX)
		// console.log(iconSizeNum, iconSizeUnit, iconPosNum, iconPosUnit, startAreaNum, startAreaUnit, endAreaNum, endAreaUnit)
	}
	function onError(error) {
		console.log(`Error: ${error}`)
	}
	var getting = browser.storage.local.get(["iconPosNum", "iconPosUnit", "iconSizeNum", "iconSizeUnit", "startAreaNum", "startAreaUnit", "endAreaNum", "endAreaUnit"]);
	getting.then(restore, onError)
	// }

	// document.addEventListener("DOMContentLoaded", restoreOptions);

	// let pinchRatio = 1

	let swipedBackEnough = false
	let swipedForwardEnough = false

	// let ticking = false

	// Function for pointer position and icon position.
	function convertCurve(x) {
		// if (x <= 2) {
		// 	return -0.25*(x-2)**2
		// } else {
		// 	return
		// }
		if (x <= 1) {
			return 2 * x - 2
		} else if (x <= 3) {
			return -0.25 * (x-3)**2 + 1
		} else {
			return 1
		}
	}

	function touchStart(evt) {
		// backEndAreaScreenX / visualViewport.scale
		// if ((evt.touches[0].screenX < backStartAreaScreenX) && (evt.touches[0].clientX < backStartAreaScrollX)) {

		// touch座標がscale補正後の指定範囲内 && viewportが画面（左）端にあること
		if ((evt.touches[0].pageX < backStartAreaScreenX / visualViewport.scale) && visualViewport.pageLeft == 0) {
			arrowIcon.src = white
			arrowIcon.style.top = String(visualViewport.offsetTop + (iconPosUnit == "px" ? iconPosNum / visualViewport.scale : visualViewport.height * iconPosNum / 100)) + "px"
			arrowIcon.style.width = String(iconSizeNum / visualViewport.scale) + iconSizeUnit
			arrowIcon.style.scale = 1

			addEventListener("touchmove", touchMoveBack, {passive: false})
			addEventListener("touchend", touchEndBack)
		}

		// if ((evt.touches[0].screenX > forwardStartAreaScreenX) && (evt.touches[0].clientX > forwardStartAreaScrollX)) {
		if (((document.documentElement.scrollWidth - evt.touches[0].pageX) < backStartAreaScreenX / visualViewport.scale) && 
			visualViewport.pageLeft + visualViewport.width > document.documentElement.scrollWidth - 1) {
			arrowIcon.src = white
			arrowIcon.style.top = String(visualViewport.offsetTop + (iconPosUnit == "px" ? iconPosNum / visualViewport.scale : visualViewport.height * iconPosNum / 100)) + "px"
			arrowIcon.style.width = String(iconSizeNum / visualViewport.scale) + iconSizeUnit
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

			// if (evt.touches[0].pageX < iconSizeNum / visualViewport.scale) {
			// 	arrowIcon.style.display = "none"
			// 	// pinchRatio = touch.clientX / touch.screenX
			// 	arrowIcon.style.width = String(iconSizeNum / visualViewport.scale) + iconSizeUnit
			// } else {
			if (evt.changedTouches[0].pageX < backEndAreaScreenX / visualViewport.scale) {
				arrowIcon.style.left = String(convertCurve(evt.touches[0].pageX * visualViewport.scale / iconSizeNum) * iconSizeNum / visualViewport.scale) + iconSizeUnit
				arrowIcon.style.display = ""
				arrowIcon.src = white
				swipedBackEnough = false
			} else {
				arrowIcon.src = purple
				swipedBackEnough = true
			}
			// }
		}
	}

	function touchMoveForward(evt) {
		if (evt.changedTouches[0].identifier == 0) {
			evt.preventDefault()
			// touch = evt.touches[0]
			// if ((document.documentElement.scrollWidth - iconSizeNum / visualViewport.scale) < evt.touches[0].pageX) {
			// 	arrowIcon.style.display = "none"
			// 	arrowIcon.style.width = String(iconSizeNum / visualViewport.scale) + iconSizeUnit
			// } else {
			if (evt.changedTouches[0].pageX > (document.documentElement.scrollWidth - backEndAreaScreenX / visualViewport.scale)) {
				// arrowIcon.style.left = String(document.documentElement.scrollWidth - (convertCurve((document.documentElement.scrollWidth - evt.touches[0].pageX) * visualViewport.scale / iconSizeNum) + 1) * iconSizeNum) + iconSizeUnit
				arrowIcon.style.left = String(document.documentElement.scrollWidth - (convertCurve((document.documentElement.scrollWidth - evt.touches[0].pageX) * visualViewport.scale / iconSizeNum) + 1) * iconSizeNum / visualViewport.scale) + iconSizeUnit
				console.log(document.documentElement.scrollWidth - (convertCurve((document.documentElement.scrollWidth - evt.touches[0].pageX) * visualViewport.scale / iconSizeNum) + 1) * iconSizeNum / visualViewport.scale)
				arrowIcon.style.display = ""
				arrowIcon.src = white
				swipedForwardEnough = false
			} else {
				arrowIcon.src = purple
				swipedForwardEnough = true
			}
			// }
		}
	}

	function touchEndBack(evt) {
		if (evt.changedTouches[0].identifier == 0) {
			removeEventListener("touchmove", touchMoveBack, {passive: false})
			removeEventListener("touchend", touchEndBack)
			arrowIcon.style.display = "none"
			if (swipedBackEnough) {
				swipedBackEnough = false
				history.back()
				// console.log("back")
			}
		}
	}

	function touchEndForward(evt) {
		if (evt.changedTouches[0].identifier == 0) {
			removeEventListener("touchmove", touchMoveForward, {passive: false})
			removeEventListener("touchend", touchEndForward)
			arrowIcon.style.display = "none"
			if (swipedForwardEnough) {
				swipedForwardEnough = false
				history.forward()
				// console.log("fore")
			}
		}
	}

	addEventListener("touchstart", touchStart, {passive: false})

})()
