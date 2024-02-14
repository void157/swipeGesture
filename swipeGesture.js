var gestureExtension = (function() {
	console.log("swipeGesture extension start")

	const buttonSize = 35

	/*
	<svg width="32mm" height="32mm" version="1.1" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
	<circle r="16" cx="16" cy="16" fill="#333"/>
	<path d="m16.5 8.5-7.5 7.5 7.5 7.5 1.5-1.5-5-5h11v-2h-11l5-5z" fill="#ff0"/>
	</svg>
	*/

	const arrowButton = document.body.appendChild((function(){
		let elm = document.createElementNS("http://www.w3.org/2000/svg", "svg")
		elm.setAttribute("width", "32mm")
		elm.setAttribute("height", "32mm")
		elm.setAttributeNS("", "viewBox", "0 0 32 32")
		elm.style.width = String(buttonSize) + "px"
		elm.style.height = "auto"
		elm.style.display = "none"
		elm.style.position = "fixed"
		elm.style.top = "50%"
		elm.style.left = "0px"
		elm.style.scale = 1
		return elm
	})())
	arrowButton.appendChild((function(){
		let elm = document.createElementNS("http://www.w3.org/2000/svg", "circle")
		elm.setAttribute("cx", "16")
		elm.setAttribute("cy", "16")
		elm.setAttribute("r", "16")
		elm.setAttribute("fill", "#333")
		return elm
	})())
	arrowButton.appendChild((function(){
		let elm = document.createElementNS("http://www.w3.org/2000/svg", "path")
		elm.setAttributeNS("", "d", "m16.5 8.5-7.5 7.5 7.5 7.5 1.5-1.5-5-5h11v-2h-11l5-5z")
		elm.setAttribute("fill", "#8000d7")
		return elm
	})())
	
	
	const touchId = 0

	const maxWidth = document.documentElement.clientWidth

	const backStartAreaX = parseInt(maxWidth * 0.05)
	const forwardStartAreaX = maxWidth - backStartAreaX

	const backEndAreaX = parseInt(maxWidth * 0.25)
	const forwardEndAreaX = maxWidth - backEndAreaX

	let pinchRatio = 1

	let swipingBack = false
	let swipingForward = false
	
	let swipedBackEnough = false
	let swipedForwardEnough = false

	function touchStart(evt) {
		if (evt.touches[0].clientX < backStartAreaX) {
			swipingBack = true
			pinchRatio = evt.touches[0].clientX / evt.touches[0].screenX
			// console.log(pinchRatio)
			arrowButton.getElementsByTagName("path")[0].setAttribute("fill", "#fff")
			arrowButton.style.width = String(buttonSize * pinchRatio) + "px"
			arrowButton.style.transform = "scaleX(1)"
			arrowButton.style.display = ""
		};

		if (evt.touches[0].clientX > forwardStartAreaX) {
			swipingForward = true
			pinchRatio = (maxWidth - evt.touches[0].clientX) / (maxWidth - evt.touches[0].screenX)
			arrowButton.getElementsByTagName("path")[0].setAttribute("fill", "#fff")
			arrowButton.style.width = String(buttonSize * pinchRatio) + "px"
			arrowButton.style.transform = "scaleX(-1)"
			arrowButton.style.display = ""
		};
	}

	function touchMove(evt) {
		if (swipingBack) {
			if (evt.changedTouches[0].identifier == touchId) {
				/*
					move arrow icon x=(evt.touches[0].screenX)
				*/
				if (evt.changedTouches[0].screenX > backEndAreaX) {
					arrowButton.getElementsByTagName("path")[0].setAttribute("fill", "#80e")
					swipedBackEnough = true
				} else {
					arrowButton.getElementsByTagName("path")[0].setAttribute("fill", "#fff")
					swipedBackEnough = false
				}
			}
		} else if (swipingForward) {
			if (evt.changedTouches[0].identifier == touchId) {
				/*
				move arrow icon x=(evt.touches[0].screenX)
				*/
				if (evt.changedTouches[0].screenX < forwardEndAreaX) {
					arrowButton.getElementsByTagName("path")[0].setAttribute("fill", "#80e")
					swipedForwardEnough = true
				} else {
					arrowButton.getElementsByTagName("path")[0].setAttribute("fill", "#fff")
					swipedForwardEnough = false
				}
			}
		}
	}

	function touchEnd(evt) {
		if (swipingBack) {
			if (evt.changedTouches[0].identifier == touchId) {
				swipingBack = false
				arrowButton.style.display = "none"
				if (swipedBackEnough) {
					swipedBackEnough = false
					// history.back()
					console.log("back")
				}
			}
		} else if (swipingForward) {
			if (evt.changedTouches[0].identifier == touchId) {
				swipingForward = false
				arrowButton.style.display = "none"
				if (swipedForwardEnough) {
					swipedForwardEnough = false
					// history.forward()
					console.log("fore")
				}
			}
		}
	}

	addEventListener("touchstart", touchStart)
	addEventListener("touchmove", touchMove)
	addEventListener("touchend", touchEnd)

	// return {
	// 	show: function() {
	// 		console.log("left :", swipingBack, "\nright:", swipingForward)
	// 	}
	// }
})();
