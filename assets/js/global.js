window.onload = function () {

	window.debug = true;	// set to true iff you want console log output
	
	var canvas = document.getElementById("main-canvas");
	window.ctx = canvas.getContext("2d");
	// canvas.style.display = "none";

	draw();
}


function draw() {
	// draw the cube
	drawCube();
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

	for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 3; j++) {
			window.ctx.moveTo(0, 200*j);
			window.ctx.lineTo(600, 200*j);
			window.ctx.stroke();

			window.ctx.moveTo(200*i, 0);
			window.ctx.lineTo(200*i, 600);
			window.ctx.stroke();

			var left = 0;
			for (var a = 0; a < 3; a++) {
				for (var b = 0; b < 3; b += 2) {
					startX = b * 200;
					if (a % 2 == 0) {
						startX = (b+1) * 200;
						window.ctx.fillStyle = "#FF0000";		//red 
					}
					window.ctx.fillRect(startX + left, (a * 200) , 200, 200);
				}
			}
		}
	}

	if (window.debug) {
		console.log("finished drawing game board");
	}
}

function drawCube() {
	var scene = new THREE.Scene();		//scene
	//camera
	var camera = new THREE.PerspectiveCamera(45, 1, 1, 1000);

	//renderer
	var renderer = new THREE.WebGLRenderer({ alpha: true });
	renderer.setSize(200, 200);
	document.body.appendChild(renderer.domElement);

	var geometry = new THREE.BoxGeometry(10, 10, 10);
	var material = new THREE.MeshBasicMaterial({color: 0xfffff, wireframe: true});
	var cube = new THREE.Mesh(geometry, material);
	cube.rotation.y = Math.PI * 45 / 180;
	scene.add(cube);
	camera.position.y = 16;
	camera.position.z = 20;
	camera.lookAt(cube.position);

	var render = function() {
		requestAnimationFrame(render);
		renderer.render(scene, camera);
	};

	render();
}