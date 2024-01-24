var gestureExtension = (function() {
	console.log("MyGesture extension loaded")
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
