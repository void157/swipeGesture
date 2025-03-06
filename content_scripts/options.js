const icon = document.getElementById("icon");
const form0 = document.getElementById("form0")

form0.addEventListener("reset", function(){
	icon.style.width = "8vw"
	icon.style.top = "50vh"
	startArea.style.width = "5vw"
	endArea.style.width = "76vw"
	iconPosRange.max = 100
	endAreaRange.max = 100
})

const iconPosRange = document.getElementById("icon_position_range");
const iconPosNum = document.getElementById("icon_position_num")
const iconPosUnit = document.getElementById("icon_position_unit")

function setIconPosNum(){
	icon.style.top = iconPosRange.value + (iconPosUnit.selectedIndex === 0 ? "vh" : "px")
	iconPosNum.value = iconPosRange.value
}
function setIconPosRange(){
	icon.style.top = iconPosNum.value + (iconPosUnit.selectedIndex === 0 ? "vh" : "px")
	iconPosRange.value = iconPosNum.value
}
function setIconPosUnit(){
	if (iconPosUnit.selectedIndex === 0) {
		// %
		var temp = Number(iconPosRange.value)
		iconPosRange.max = 100
		iconPosNum.value = iconPosNum.value / visualViewport.height * 100
		iconPosRange.value = temp / visualViewport.height * 100
		// iconPosRange.min = 0
	} else {
		// px
		iconPosRange.max = visualViewport.height
		iconPosNum.value = visualViewport.height * iconPosNum.value / 100
		iconPosRange.value = visualViewport.height * iconPosRange.value / 100
		// iconPosRange.min = 0
	}
	// icon.style.top = iconPosNum.value + (iconPosUnit.selectedIndex === 0 ? "vh" : "px")
}
iconPosRange.addEventListener("input", setIconPosNum)
iconPosNum.addEventListener("input", setIconPosRange)
iconPosUnit.addEventListener("change", setIconPosUnit)

const iconSizeRange = document.getElementById("icon_size_range");
const iconSizeNum = document.getElementById("icon_size_num");
const iconSizeUnit = document.getElementById("icon_size_unit");

iconSizeNum.addEventListener("input", function(){
	icon.style.width = iconSizeNum.value + (iconSizeUnit.selectedIndex === 0 ? "vw" : "px")
	iconSizeRange.value = iconSizeNum.value
})

iconSizeRange.addEventListener("input", function(){
	icon.style.width = iconSizeRange.value + (iconSizeUnit.selectedIndex === 0 ? "vw" : "px")
	iconSizeNum.value = iconSizeRange.value
})

iconSizeUnit.addEventListener("change", function(){
	if (iconSizeUnit.selectedIndex === 0) {
		// %
		var temp = Number(iconSizeRange.value)
		iconSizeRange.max = 50
		iconSizeNum.value = iconSizeNum.value / visualViewport.width * 100
		iconSizeRange.value = temp / visualViewport.width * 100
		// iconSizeRange.min = 0
	} else {
		// px
		iconSizeRange.max = visualViewport.width / 2
		iconSizeNum.value = visualViewport.width * iconSizeNum.value / 100
		iconSizeRange.value = visualViewport.width * iconSizeRange.value / 100
		// iconSizeRange.min = 0
	}
	// icon.style.top = iconSizeNum.value + (iconSizeUnit.selectedIndex === 0 ? "vh" : "px")
})

const startAreaRange = document.getElementById("start_area_range")
const startAreaNum = document.getElementById("start_area_num")
const startAreaUnit = document.getElementById("start_area_unit")
const startArea = document.getElementById("start_area")

startAreaRange.addEventListener("input", function(){
	startArea.style.width = startAreaRange.value + (startAreaUnit.selectedIndex === 0 ? "vw" : "px")
	startAreaNum.value = startAreaRange.value
})

startAreaNum.addEventListener("input", function(){
	// 0 to 49
	// startAreaNum.value = Math.max(0.0, Math.min(startAreaNum.value, 49.0))
	startArea.style.width = startAreaNum.value + (startAreaUnit.selectedIndex === 0 ? "vw" : "px")
	startAreaRange.value = startAreaNum.value
})

startAreaUnit.addEventListener("change", function(){
	if (startAreaUnit.selectedIndex === 0) {
		// %
		var temp = Number(startAreaRange.value)
		startAreaRange.max = 50
		startAreaNum.max = 50
		startAreaNum.value = temp / visualViewport.width * 100
		startAreaRange.value = startAreaNum.value
		// startAreaRange.min = 0
	} else {
		// px
		startAreaRange.max = visualViewport.width / 2
		startAreaNum.max = startAreaRange.max
		startAreaNum.value = visualViewport.width * startAreaNum.value / 100
		startAreaRange.value = startAreaNum.value
		// startAreaRange.min = 0
	}
	// startArea.style.width = startAreaNum.value + (startAreaUnit.selectedIndex === 0 ? "vw" : "px")
})

const endAreaRange = document.getElementById("end_area_range")
const endAreaNum = document.getElementById("end_area_num")
const endAreaUnit = document.getElementById("end_area_unit")
const endArea = document.getElementById("end_area")	

endAreaRange.addEventListener("input", function(){
	if (endAreaUnit.selectedIndex === 0) {
		// %
		endArea.style.width = (100 - endAreaRange.value) + "vw"
	} else {
		// px
		endArea.style.width = (visualViewport.width - endAreaRange.value) + "px"
	}
	endAreaNum.value = endAreaRange.value
})

endAreaNum.addEventListener("input", function(){
	// 0 to 49
	// endAreaNum.value = Math.max(0.0, Math.min(endAreaNum.value, 49.0))
	if (endAreaUnit.selectedIndex === 0) {
		// %
		endArea.style.width = (100 - endAreaRange.value) + "vw"
	} else {
		// px
		endArea.style.width = (visualViewport.width - endAreaRange.value) + "px"
	}
	endAreaRange.value = endAreaNum.value
})

endAreaUnit.addEventListener("change", function(){
	if (endAreaUnit.selectedIndex === 0) {
		// %
		var temp = Number(endAreaRange.value)
		endAreaRange.max = 100
		endAreaNum.max = 100
		endAreaRange.value = temp / visualViewport.width * 100
		endAreaNum.value = endAreaRange.value
		// endAreaRange.min = 0
	} else {
		// px
		endAreaRange.max = visualViewport.width
		endAreaNum.max = visualViewport.width
		endAreaNum.value = visualViewport.width * endAreaNum.value / 100
		endAreaRange.value = endAreaNum.value
		// endAreaRange.min = 0
	}
	// endArea.style.width = (100 - endAreaNum.value) + "vw"
})

startArea.addEventListener("click", function(){
	// startArea.style.border-width = "2px"
	startArea.style.background = "repeating-linear-gradient(-45deg,#0ff,#0ff 2px,#0000 0 , #0000 9px)"
})

endArea.addEventListener("touchstart", function(){
	endArea.style.background = "repeating-linear-gradient(-45deg,#0ff,#0ff 5px,transparent 0 , transparent 9px);"
})

// color settings

// const iconCircle = document.getElementById("icon_circle");
// const iconArrow = document.getElementById("icon_arrow");

// const colorPickerArrow = document.getElementById("arrow_color_picker")
// const colorHexArrow = document.getElementById("arrow_color_hex")
// const colorPickerCircle = document.getElementById("circle_color_picker")
// const colorHexCircle = document.getElementById("circle_color_hex")

// colorHexArrow.addEventListener("input", function(){
	// 	colorPickerArrow.value = colorHexArrow.value
// 	iconArrow.setAttribute("fill", colorHexArrow.value)
// })

// colorPickerArrow.addEventListener("input", function(){
// 	colorHexArrow.value = colorPickerArrow.value
// 	iconArrow.setAttribute("fill", colorPickerArrow.value)

// })

// colorHexCircle.addEventListener("input", function(){
// 	colorPickerCircle.value = colorHexCircle.value
// 	iconCircle.setAttribute("fill", colorHexCircle.value)
// })

// colorPickerCircle.addEventListener("input", function(){
// 	colorHexCircle.value = colorPickerCircle.value
// 	iconCircle.setAttribute("fill", colorPickerCircle.value)

// })

function saveOptions(e) {
	e.preventDefault();
	browser.storage.local.set({
		iconPosNum: iconPosNum.value,
		iconPosUnit: iconPosUnit.selectedIndex,
		iconSizeNum: iconSizeNum.value,
		iconSizeUnit: iconSizeUnit.selectedIndex,
		startAreaNum: startAreaNum.value,
		startAreaUnit: startAreaUnit.selectedIndex,
		endAreaNum: endAreaNum.value,
		endAreaUnit: endAreaUnit.selectedIndex,
	});
	// alert(browser.storage.local.get("iconPosNum"))
}

function restoreOptions() {
	function setCurrentChoice(result) {
		iconSizeNum.value = result.iconSizeNum || 8
		iconSizeUnit.selectedIndex = result.iconSizeUnit || 0
		startAreaNum.value = result.startAreaNum || 5
		startAreaUnit.selectedIndex = result.startAreaUnit || 0
		endAreaNum.value = result.endAreaNum || 76
		endAreaUnit.selectedIndex = result.endAreaUnit || 0
		
		if (result.iconPosUnit === 0) {
			// %
			iconPosRange.max = 100
		} else {
			// px
			iconPosRange.max = visualViewport.height
		}
		iconPosNum.value = result.iconPosNum || 50
		iconPosRange.value = iconPosNum.value
		iconPosUnit.selectedIndex = result.iconPosUnit || 0
		icon.style.top = iconPosNum.value + (iconPosUnit.selectedIndex === 0 ? "vh" : "px")


		if (result.iconSizeUnit === 0) {
			// %
			iconSizeRange.max = 50
		} else {
			// px
			iconSizeRange.max = visualViewport.width / 2
		}
		iconSizeNum.value = result.iconSizeNum || 8
		iconSizeRange.value = iconSizeNum.value
		iconSizeUnit.selectedIndex = result.iconSizeUnit || 0
		icon.style.width = iconSizeNum.value + (iconSizeUnit.selectedIndex === 0 ? "vw" : "px")


		if (result.startAreaUnit === 0) {
			// %
			startAreaRange.max = 50
		} else {
			// px
			startAreaRange.max = visualViewport.width / 2
		}
		startAreaNum.value = result.startAreaNum || 5
		startAreaRange.value = startAreaNum.value
		startAreaUnit.selectedIndex = result.startAreaUnit || 0
		startArea.style.width = startAreaNum.value + (startAreaUnit.selectedIndex === 0 ? "vw" : "px")


		if (result.endAreaUnit === 0) {
			// %
			endAreaRange.max = 100
		} else {
			// px
			endAreaRange.max = visualViewport.width
		}
		endAreaNum.value = result.endAreaNum || 76
		endAreaRange.value = endAreaNum.value
		endAreaUnit.selectedIndex = result.endAreaUnit || 0
		endArea.style.width = (100 - endAreaNum.value) + "vw"
	}
	function onError(error) {
		console.log(`Error: ${error}`);
	}
	var getting = browser.storage.local.get(["iconPosNum", "iconPosUnit", "iconSizeNum", "iconSizeUnit", "startAreaNum", "startAreaUnit", "endAreaNum", "endAreaUnit"]);
	getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);