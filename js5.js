JSC3D.Viewer.prototype.paint = function() {
	if(this.webglBackend || !this.ctx2d)
		return;

	this.ctx2d.putImageData(this.canvasData, 0, 0);
};

/**
	The mouseDown event handling routine.
	@private
 */
JSC3D.Viewer.prototype.mouseDownHandler = function(e) {
	if(!this.isLoaded)
		return;

	if(this.onmousedown) {
		var info = this.pick(e.clientX, e.clientY);
		this.onmousedown(info.canvasX, info.canvasY, e.button, info.depth, info.mesh);
	}

	e.preventDefault();
	e.stopPropagation();

	if(!this.isDefaultInputHandlerEnabled)
		return;

	this.buttonStates[e.button] = true;
	this.mouseX = e.clientX;
	this.mouseY = e.clientY;
};

/**
	The mouseUp event handling routine.
	@private
 */
JSC3D.Viewer.prototype.mouseUpHandler = function(e) {
	if(!this.isLoaded)
		return;

	if(this.onmouseup) {
		var info = this.pick(e.clientX, e.clientY);
		this.onmouseup(info.canvasX, info.canvasY, e.button, info.depth, info.mesh);
	}

	e.preventDefault();
	e.stopPropagation();

	if(!this.isDefaultInputHandlerEnabled)
		return;

	this.buttonStates[e.button] = false;
};

/**
	The mouseMove event handling routine.
	@private
 */
var mousex0=0,mousey0=0;
JSC3D.Viewer.prototype.mouseMoveHandler = function(e) {
	if(!this.isLoaded)
		return;

	if(this.onmousemove) {
		var info = this.pick(e.clientX, e.clientY);
		this.onmousemove(info.canvasX, info.canvasY, e.button, info.depth, info.mesh);
	}

	e.preventDefault();
	e.stopPropagation();

	if(!this.isDefaultInputHandlerEnabled)
		return;

	var isDragging = this.buttonStates[0] == true;
	var isShiftDown = this.keyStates[0x10] == true;
	var isCtrlDown = this.keyStates[0x11] == true;
	if(isDragging) {
		if((isShiftDown && this.mouseUsage == 'default') || this.mouseUsage == 'zoom') {
			this.zoomFactor *= this.mouseY <= e.clientY ? 1.04 : 0.96;
		}
		else if((isCtrlDown && this.mouseUsage == 'default') || this.mouseUsage == 'pan') {
			var ratio = (this.definition == 'low') ? 0.5 : ((this.definition == 'high') ? 2 : 1);
			this.panning[0] += ratio * (e.clientX - this.mouseX);
			this.panning[1] += ratio * (e.clientY - this.mouseY);
		}
		else if(this.mouseUsage == 'default' || this.mouseUsage == 'rotate') {
			var rotX = (e.clientY - this.mouseY) * 360 / this.canvas.width;
			var rotY = (e.clientX - this.mouseX) * 360 / this.canvas.height;
			//this.rotMatrix.rotateAboutXAxis(rotX);
			//this.rotMatrix.rotateAboutYAxis(rotY);
			this.rotMatrix.rotateAboutYAxis(rotY);
			this.rotMatrix.rotateAboutXAxis(rotX);
		}
		this.mouseX = e.clientX;
		this.mouseY = e.clientY;
		this.update();
	}
};

JSC3D.Viewer.prototype.mouseWheelHandler = function(e) {
	if(!this.isLoaded)
		return;

	if(this.onmousewheel) {
		var info = this.pick(e.clientX, e.clientY);
		this.onmousewheel(info.canvasX, info.canvasY, e.button, info.depth, info.mesh);
	}

	e.preventDefault();
	e.stopPropagation();

	if(!this.isDefaultInputHandlerEnabled)
		return;

	this.zoomFactor *= (JSC3D.PlatformInfo.browser == 'firefox' ? -e.detail : e.wheelDelta) < 0 ? 1.1 : 0.91;
	this.update();
};

/**
	The touchStart event handling routine. This is for compatibility for touch devices.
	@private
 */
JSC3D.Viewer.prototype.touchStartHandler = function(e) {
	if(!this.isLoaded)
		return;

	if(e.touches.length > 0) {
		var clientX = e.touches[0].clientX;
		var clientY = e.touches[0].clientY;

		if(this.onmousedown) {
			var info = this.pick(clientX, clientY);
			this.onmousedown(info.canvasX, info.canvasY, 0, info.depth, info.mesh);
		}

		e.preventDefault();
		e.stopPropagation();

		if(!this.isDefaultInputHandlerEnabled)
			return;

		this.buttonStates[0] = true;
		this.mouseX = clientX;
		this.mouseY = clientY;
	}
};
