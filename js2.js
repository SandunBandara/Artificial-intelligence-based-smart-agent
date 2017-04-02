
// setup input handlers.

var self = this;
	if(!JSC3D.PlatformInfo.isTouchDevice) {
		this.canvas.addEventListener('mousedown', function(e){self.mouseDownHandler(e);}, false);
		this.canvas.addEventListener('mouseup', function(e){self.mouseUpHandler(e);}, false);
		this.canvas.addEventListener('mousemove', function(e){self.mouseMoveHandler(e);}, false);
		this.canvas.addEventListener(JSC3D.PlatformInfo.browser == 'firefox' ? 'DOMMouseScroll' : 'mousewheel', 
									 function(e){self.mouseWheelHandler(e);}, false);
		document.addEventListener('keydown', function(e){self.keyDownHandler(e);}, false);
		document.addEventListener('keyup', function(e){self.keyUpHandler(e);}, false);
	}
	else if(JSC3D.Hammer) {
		JSC3D.Hammer(this.canvas).on('touch release hold drag pinch', function(e){self.gestureHandler(e);});
	}
	else {
		this.canvas.addEventListener('touchstart', function(e){self.touchStartHandler(e);}, false);
		this.canvas.addEventListener('touchend', function(e){self.touchEndHandler(e);}, false);
		this.canvas.addEventListener('touchmove', function(e){self.touchMoveHandler(e);}, false);
	}
};