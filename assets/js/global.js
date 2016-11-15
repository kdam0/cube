window.onload = function () {

	window.debug = true;	// set to true iff you want console log output
	
	var canvas = document.getElementById("main-canvas");
	window.ctx = canvas.getContext("2d");
	// canvas.style.display = "none";

	draw();
}


function draw() {
	// draw the cube
		// generate the cube config
			// get the initial position
			// get the initial face
			// get the final position
			// get the final face

	//draw the board  6 x 6
	drawBoard();
}

function clear() {

}

function update() {

}


function generateCubeConfig() {

}

function drawBoard() {

	for (var i = 0; i < 6; i++) {
		for (var j = 0; j < 6; j++) {
			window.ctx.moveTo(0, 100*j);
			window.ctx.lineTo(600, 100*j);
			window.ctx.stroke();

			window.ctx.moveTo(100*i, 0);
			window.ctx.lineTo(100*i, 600);
			window.ctx.stroke();

			var left = 0;
			for (var a = 0; a < 6; a++) {
				for (var b = 0; b < 6; b += 2) {
					startX = b * 100;
					if (a % 2 == 0) {
						startX = (b+1) * 100;
						window.ctx.fillStyle = "#FF0000";		//red 
					}
					window.ctx.fillRect(startX + left, (a * 100) , 100, 100);
				}
			}
		}
	}

	if (window.debug) {
		console.log("finished drawing game board");
	}
}