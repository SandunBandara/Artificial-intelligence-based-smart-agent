JSC3D.Viewer.prototype.init = function() {
	this.sceneUrl = this.params['SceneUrl'];
	this.initRotX = parseFloat(this.params['InitRotationX']);
	this.initRotY = parseFloat(this.params['InitRotationY']);
	this.initRotZ = parseFloat(this.params['InitRotationZ']);
	this.modelColor = parseInt('0x' + this.params['ModelColor'].substring(1));
	this.bkgColor1 = parseInt('0x' + this.params['BackgroundColor1'].substring(1));
	this.bkgColor2 = parseInt('0x' + this.params['BackgroundColor2'].substring(1));
	this.bkgImageUrl = this.params['BackgroundImageUrl'];
	this.renderMode = this.params['RenderMode'].toLowerCase();
	this.definition = this.params['Definition'].toLowerCase();
	this.creaseAngle = parseFloat(this.params['CreaseAngle']);
	this.isMipMappingOn = this.params['MipMapping'].toLowerCase() == 'on';
	this.sphereMapUrl = this.params['SphereMapUrl'];
	this.showProgressBar = this.params['ProgressBar'].toLowerCase() == 'on';
	this.useWebGL = this.params['Renderer'].toLowerCase() == 'webgl';
	this.releaseLocalBuffers = this.params['LocalBuffers'].toLowerCase() == 'release';

	if(this.useWebGL && JSC3D.PlatformInfo.supportWebGL && JSC3D.WebGLRenderBackend) {
		try {
			this.webglBackend = new JSC3D.WebGLRenderBackend(this.canvas, this.releaseLocalBuffers);
		} catch(e){}
	}
	if(!this.webglBackend) {
		if(this.useWebGL) {
			if(JSC3D.console)
				JSC3D.console.logWarning('WebGL is not available. Software rendering is enabled instead.');
		}
		try {
			this.ctx2d = this.canvas.getContext('2d');
			this.canvasData = this.ctx2d.getImageData(0, 0, this.canvas.width, this.canvas.height);
		}
		catch(e) {
			this.ctx2d = null;
			this.canvasData = null;
		}
	}


	if(this.canvas.width <= 2 || this.canvas.height <= 2)
		this.definition = 'standard';
	
	switch(this.definition) {
	case 'low':
		this.frameWidth = ~~((this.canvas.width + 1) / 2);
		this.frameHeight = ~~((this.canvas.height + 1) / 2);
		break;
	case 'high':
		this.frameWidth = this.canvas.width * 2;
		this.frameHeight = this.canvas.height * 2;
		break;
	case 'standard':
	default:
		this.frameWidth = this.canvas.width;
		this.frameHeight = this.canvas.height;
		break;
	}

	this.zoomFactor = 1;
	this.panning = [0, 0];
	this.rotMatrix.identity();
	this.transformMatrix.identity();
	this.isLoaded = false;
	this.isFailed = false;
	this.needUpdate = false;
	this.needRepaint = false;
	this.scene = null;

	// create a default material for meshes that don't have one
	this.defaultMaterial = new JSC3D.Material;
	this.defaultMaterial.ambientColor = 0;
	this.defaultMaterial.diffuseColor = this.modelColor;
	this.defaultMaterial.transparency = 0;
	this.defaultMaterial.simulateSpecular = true;

	// allocate memory storage for frame buffers
	if(!this.webglBackend) {
		this.colorBuffer = new Array(this.frameWidth * this.frameHeight);
		this.zBuffer = new Array(this.frameWidth * this.frameHeight);
		this.selectionBuffer = new Array(this.frameWidth * this.frameHeight);
		this.bkgColorBuffer = new Array(this.frameWidth * this.frameHeight);
	}

	// apply background
	this.generateBackground();
	this.drawBackground();

	// wake up update routine per 30 milliseconds
	var self = this;
	(function tick() {
		self.doUpdate();
		setTimeout(tick, 30);
	}) ();

	// load background image if any
	this.setBackgroudImageFromUrl(this.bkgImageUrl);

	// load scene if any
	this.loadScene();
	
	// load sphere mapping image if any
	this.setSphereMapFromUrl(this.sphereMapUrl);
};