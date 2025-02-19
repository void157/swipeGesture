const icon = document.getElementById("icon");
const form0 = document.getElementById("form0")

form0.addEventListener("reset", function(){
	icon.style.width = "8vw"
	icon.style.top = "50vh"
	startArea.style.width = "5vw"
	endArea.style.width = "76vw"
})

const iconPosRange = document.getElementById("position_range");
const posNum = document.getElementById("icon_y_position")

iconPosRange.addEventListener("input", function(){
	icon.style.top = iconPosRange.value + "%"
	posNum.value = iconPosRange.value
})

posNum.addEventListener("input", function(){
	icon.style.top = posNum.value + "%"
	iconPosRange.value = posNum.value
})

const iconSizeRange = document.getElementById("icon_size_range");
const iconSizeNum = document.getElementById("icon_size_num");

iconSizeNum.addEventListener("input", function(){
	icon.style.width = iconSizeNum.value + "vw"
	iconSizeRange.value = iconSizeNum.value
})

iconSizeRange.addEventListener("input", function(){
	icon.style.width = iconSizeRange.value + "vw"
	iconSizeNum.value = iconSizeRange.value
})

const startAreaRange = document.getElementById("start_area_range")
const startAreaNum = document.getElementById("start_area_num")
const startArea = document.getElementById("start_area")

startAreaRange.addEventListener("input", function(){
	startArea.style.width = startAreaRange.value + "vw"
	startAreaNum.value = startAreaRange.value
})

startAreaNum.addEventListener("input", function(){
	// 0 to 49
	// startAreaNum.value = Math.max(0.0, Math.min(startAreaNum.value, 49.0))
	startArea.style.width = startAreaNum.value + "vw"
	startAreaRange.value = startAreaNum.value
})


const endAreaRange = document.getElementById("end_area_range")
const endAreaNum = document.getElementById("end_area_num")
const endArea = document.getElementById("end_area")	

endAreaRange.addEventListener("input", function(){
	endArea.style.width = (100 - endAreaRange.value) + "vw"
	endAreaNum.value = endAreaRange.value
})

endAreaNum.addEventListener("input", function(){
	// 0 to 49
	// endAreaNum.value = Math.max(0.0, Math.min(endAreaNum.value, 49.0))
	endArea.style.width = (100 - endAreaNum.value) + "vw"
	endAreaRange.value = endAreaNum.value
})

startArea.addEventListener("click", function(){
	// startArea.style.border-width = "2px"
	startArea.style.background = "repeating-linear-gradient(-45deg,#0ff,#0ff 2px,#0000 0 , #0000 9px)"
})

endArea.addEventListener("touchstart", function(){
	endArea.style.background = "repeating-linear-gradient(-45deg,#0ff,#0ff 5px,transparent 0 , transparent 9px);"
})

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