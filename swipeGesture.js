var gestureExtension = (() => {
	console.log("swipeGesture extension start")

	const maxWidth = document.documentElement.clientWidth
	const iconSize = parseInt(maxWidth * 0.08)

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

	const arrowIcon = document.body.appendChild((function(){
		let elm = document.createElementNS("http://www.w3.org/2000/svg", "svg")
		elm.setAttribute("width", "32mm")
		elm.setAttribute("height", "32mm")
		elm.setAttributeNS("", "viewBox", "0 0 32 32")
		elm.style.width = String(iconSize) + "px"
		elm.style.height = "auto"
		elm.style.position = "fixed"
		elm.style.top = "50%"
		elm.style.left = "0px"
		elm.style.scale = 1
		elm.style.display = "none"
		return elm
	})())
	arrowIcon.appendChild((function(){
		let elm = document.createElementNS("http://www.w3.org/2000/svg", "circle")
		elm.setAttribute("cx", "16")
		elm.setAttribute("cy", "16")
		elm.setAttribute("r", "16")
		elm.setAttribute("fill", "#333")
		return elm
	})())
	const arrowSign = arrowIcon.appendChild((function(){
		let elm = document.createElementNS("http://www.w3.org/2000/svg", "path")
		elm.setAttributeNS("", "d", "m16.5 8.5-7.5 7.5 7.5 7.5 1.5-1.5-5-5h11v-2h-11l5-5z")
		elm.setAttribute("fill", "#80e")
		return elm
	})())


	let pinchRatio = 1

	
	let swipedBackEnough = false
	let swipedForwardEnough = false

	let ticking = false

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
		if (evt.touches[0].clientX < backStartAreaX) {
			// pinchRatio = evt.touches[0].clientX / evt.touches[0].screenX
			// console.log(pinchRatio)
			// arrowIcon.style.width = String(iconSize * pinchRatio) + "px"
			arrowSign.setAttribute("fill", "#fff")
			arrowIcon.style.transform = "scaleX(1)"
			//arrowIcon.style.display = ""

			addEventListener("touchmove", touchMoveBack, {passive: false})
			addEventListener("touchend", touchEndBack)
		}

		if (evt.touches[0].clientX > forwardStartAreaX) {
			// pinchRatio = (maxWidth - evt.touches[0].clientX) / (maxWidth - evt.touches[0].screenX)
			// arrowIcon.style.width = String(iconSize * pinchRatio) + "px"
			arrowSign.setAttribute("fill", "#fff")
			arrowIcon.style.transform = "scaleX(-1)"
			//arrowIcon.style.display = ""

			addEventListener("touchmove", touchMoveForward, {passive: false})
			addEventListener("touchend", touchEndForward)
		}
	}

	function touchMoveBack(evt) {
		if (evt.changedTouches[0].identifier == 0) {
			evt.preventDefault()
			if (evt.touches[0].screenX < iconSize) {
				pinchRatio = evt.touches[0].clientX / evt.touches[0].screenX
				arrowIcon.style.width = String(iconSize * pinchRatio) + "px"
			} else {
				arrowIcon.style.left = String((convertCurve(evt.touches[0].screenX / iconSize) - 1) * iconSize * pinchRatio) + "px"	//値が0付近のため*pinchRatio不要
				arrowIcon.style.display = ""

				if (evt.changedTouches[0].screenX > backEndAreaX) {
					arrowSign.setAttribute("fill", "#80e")
					swipedBackEnough = true
				} else {
					arrowSign.setAttribute("fill", "#fff")
					swipedBackEnough = false
				}
			}
			
		}
	}
	
	function touchMoveForward(evt) {
		if (evt.changedTouches[0].identifier == 0) {
			evt.preventDefault()
			if (maxWidth - iconSize < evt.touches[0].screenX) {
				pinchRatio = (maxWidth - evt.touches[0].clientX) / (maxWidth - evt.touches[0].screenX)
				arrowIcon.style.width = String(iconSize * pinchRatio) + "px"
			} else {
				arrowIcon.style.left = String(maxWidth - convertCurve((maxWidth - evt.touches[0].screenX) / iconSize) * iconSize * pinchRatio) + "px"
				arrowIcon.style.display = ""
				
				if (evt.changedTouches[0].screenX < forwardEndAreaX) {
					arrowSign.setAttribute("fill", "#80e")
					swipedForwardEnough = true
				} else {
					arrowSign.setAttribute("fill", "#fff")
					swipedForwardEnough = false
				}
			}
		}
	}

	function touchEndBack(evt) {
		if (evt.changedTouches[0].identifier == 0) {
			arrowIcon.style.display = "none"
			if (swipedBackEnough) {
				swipedBackEnough = false
				// history.back()
				console.log("back")
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
				// history.forward()
				console.log("fore")
			}
			removeEventListener("touchmove", touchMoveForward, {passive: false})
			removeEventListener("touchend", touchEndForward)
		}
	}

	addEventListener("touchstart", touchStart, {passive: false})

})()
