var gestureExtension = (function() {
	console.log("swipeGesture extension start")

	/*
	<svg xmlns="http://www.w3.org/2000/svg" width="128.001" height="128.001" viewBox="0 0 33.867 33.867">
	<circle cx="16.933" cy="16.933" r="16.933" fill="#333" />
	<path d="M17.297 9.024l-7.909 7.909 7.909 7.909 1.632-1.634-5.12-5.12h11.508v-2.31H13.809l5.12-5.12z" fill="#8000d7" />
	</svg>
	*/

	// let newDiv = document.body.appendChild((function(){
	// 	let elm = document.createElement("div")
	// 	//elm.style.visibility="hidden"
	// 	elm.style.position="fixed"
	// 	return elm
	// })())
	
	// let arrowButton = newDiv.appendChild((function(){
	let arrowButton = document.body.appendChild((function(){
		let elm = document.createElementNS("http://www.w3.org/2000/svg", "svg")
		elm.setAttribute("width", "128.001")
		elm.setAttribute("height", "128.001")
		elm.setAttributeNS("", "viewBox", "0 0 33.867 33.867")
		elm.style.width="100px"
		elm.style.height="100px"
		return elm
	})())
	arrowButton.appendChild((function(){
		let elm = document.createElementNS("http://www.w3.org/2000/svg", "circle")
		elm.setAttribute("cx", "16.933")
		elm.setAttribute("cy", "16.933")
		elm.setAttribute("r", "16.933")
		elm.setAttribute("fill", "#333")
		return elm
	})())
	arrowButton.appendChild((function(){
		let elm = document.createElementNS("http://www.w3.org/2000/svg", "path")
		elm.setAttributeNS("", "d", "M17.297 9.024l-7.909 7.909 7.909 7.909 1.632-1.634-5.12-5.12h11.508v-2.31H13.809l5.12-5.12z")
		elm.setAttribute("fill", "#8000d7")
		return elm
	})())
	
	
	let touchId = 0

	let backStartAreaX = parseInt(document.documentElement.clientWidth * 0.05)
	let forwardStartAreaX = document.documentElement.clientWidth - backStartAreaX

	let backEndAreaX = parseInt(document.documentElement.clientWidth * 0.25)
	let forwardEndAreaX = document.documentElement.clientWidth - backEndAreaX

	var swipingBack = false
	var swipingForward = false
	
	var swipedBackEnough = false
	var swipedForwardEnough = false

	function touchStart(evt) {
		if (evt.touches[0].clientX < backStartAreaX) {
			swipingBack = true
		};

		if (evt.touches[0].clientX > forwardStartAreaX) {
			swipingForward = true
		};
	}

	function touchMove(evt) {
		if (swipingBack) {
			if (evt.changedTouches[0].identifier == touchId) {
				/*
					move arrow icon x=(evt.touches[0].screenX)
				*/
				if (evt.changedTouches[0].screenX > backEndAreaX) {
					/*
						change arrow icon color
					*/
					document.body.style.border = "216px solid blue";
					swipedBackEnough = true
				} else {
					/*
						change arrow icon color
					*/
					document.body.style.border = "";
					swipedBackEnough = false
				}
			}
		} else if (swipingForward) {
			if (evt.changedTouches[0].identifier == touchId) {
				/*
				move arrow icon x=(evt.touches[0].screenX)
				*/
				if (evt.changedTouches[0].screenX < forwardEndAreaX) {
					/*
						change arrow icon color
					*/
					document.body.style.border = "216px solid red";
					swipedBackEnough = true
				} else {
					/*
						change arrow icon color
					*/
					swipedBackEnough = false
					document.body.style.border = "";
				}
			}
		}
	}

	function touchEnd(evt) {
		document.body.style.border = "";
		if (swipingBack) {
			if (evt.changedTouches[0].identifier == touchId) {
				swipingBack = false
				if (swipedBackEnough) {
					swipedBackEnough = false
					// history.back()
					console.log("back")
				}
			}
		} else if (swipingForward) {
			if (evt.changedTouches[0].identifier == touchId) {
				swipingForward = false
				if (swipedForwardEnough) {
					swipedBackEnough = false
					// history.forward()
					console.log("fore")
				}
			}
		}
	}

	addEventListener("touchstart", touchStart)
	addEventListener("touchmove", touchMove)
	addEventListener("touchend", touchEnd)

	return {
		show: function() {
			console.log("left :", swipingBack, "\nright:", swipingForward)
		}
	}
})();
