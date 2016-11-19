window.onload = function () {

	window.debug = true;	// set to true iff you want console log output
	
	var canvas = document.getElementById("main-canvas");
	window.ctx = canvas.getContext("2d");
	// canvas.style.display = "none";

	window.CANVAS_X_OFFSET = 200;
	window.CANVAS_Y_OFFSET = 200;


	draw();

	// mapBoard(208,208);


	handleArrowKeys();
}


function draw() {
	var coords = generateCubeConfig();
	placeDice(coords[0] , coords[1]);

	// draw the cube
	drawDice();
		// generate the cube config
			// get the initial position
			// get the initial face
			// get the final position
			// get the final face

	//draw the board  3 x 3
	drawBoard();
}


function generateCubeConfig() {
	// generate a random x between 1-3 incl.
	var x = Math.floor((Math.random()) * 3 + 1);
	// generate a random y between 1-3 incl.
	var y = Math.floor((Math.random()) * 3 + 1);

	consOut(arguments.callee.name + '() ' + 'x: ' + x + ' | y: ' + y);
	return [x,y];
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

function drawDice() {
	//renderer
	var canvas = document.getElementById("cube-canvas");
	var renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
	renderer.setSize(200, 200);
	document.body.appendChild(renderer.domElement);

	var scene = new THREE.Scene();		//scene

	// var geometry = new THREE.BoxGeometry(100, 100, 100);
	// var material = new THREE.MeshBasicMaterial({color: 0xfffff, wireframe: true});

	var materials = [];
	for (var i = 1; i <= 6; i++) {
		var img = new Image();
		
		switch (i) {
			case 1:
				img.src = 'assets/images/faces/3.png';
				break;
			case 2:
				img.src = 'assets/images/faces/4.png';
				break;
			case 3:
				img.src = 'assets/images/faces/5.png';
				break;
			case 4:
				img.src = 'assets/images/faces/2.png';
				break;
			case 5:
				img.src = 'assets/images/faces/1.png';
				break;
			case 6:
				img.src = 'assets/images/faces/6.png';
				break;
		}

		var tex = new THREE.Texture(img);
		img.tex = tex;
		img.onload = function() {
			this.tex.needsUpdate = true;
		};
		var mat = new THREE.MeshBasicMaterial({color: 0xffffff, map: tex});
		materials.push(mat);
	}

	var cubeGeo = new THREE.BoxGeometry(100,100,100,1,1,1);
	var cube = new THREE.Mesh(cubeGeo, new THREE.MeshFaceMaterial( materials ));

	// var cube = new THREE.Mesh(geometry, material);
	cube.rotation.y = Math.PI * 45 / 180;
	scene.add(cube);

	//camera
	var camera = new THREE.PerspectiveCamera(45, 1, 0.1, 10000);
	camera.position.y = 160;
	camera.position.z = 200;
	camera.lookAt(cube.position);

	scene.add(camera);

	var clock = new THREE.Clock();

	var render = function() {
		requestAnimationFrame(render);
		cube.rotation.y -= clock.getDelta();
		renderer.render(scene, camera);
	};

	render();
}

function placeDice( x, y ) {

	var x_inc = (x-1) * CANVAS_X_OFFSET;
	var y_inc = (y-1) * CANVAS_Y_OFFSET;

	// get the current position
	var position = $('#cube-canvas').position();
	consOut(arguments.callee.name + '() ' + 'x: ' + position.left + ' | y: ' + position.top); //initial position

	// adjust dice position
	$('#cube-canvas').css({ 
		left: position.left + x_inc, 
		top: position.top + y_inc
	});
	
	consOut(arguments.callee.name + '() ' + "dice placed!");
}

function handleArrowKeys() {
	$(document).keydown(function(e) {
		switch (e.which) {
			case 37: 	//left
				moveDice('left');
				break;
			case 38:  	//up
				moveDice('up');
				break;
			case 39:  	//right
				moveDice('right');
				break;
			case 40:  	//down
				moveDice('down');
				break;
			default: return;
		}
		e.preventDefault();
	});
}

function moveDice( direction ) {
	// get canvas position
	var position = $('#cube-canvas').position();
	var coords = mapBoard(position.left, position.top);
	var x_coord = coords[0];
	var y_coord = coords[1];

	if (direction == "left") {
		placeDice(x_coord - 1, y_coord);
	}
}


function mapBoard( x, y ) {
	var x_coord = ((x-8) / CANVAS_X_OFFSET) + 1;
	var y_coord = ((y-8) / CANVAS_Y_OFFSET) + 1;

	consOut(arguments.callee.name + '() ' + 'x: ' + x_coord + ' | y: ' + y_coord);
	return [x_coord, y_coord];
}

// print mssg to console out only if debuging is set to true
function consOut( mssg ) {
	if (window.debug) {
		console.log(mssg);
	}
}

function swap( arr, a, b ) {
	var temp = arr[b];
	arr[b] = arr[a];
	arr[a] = temp;
	return arr;
}