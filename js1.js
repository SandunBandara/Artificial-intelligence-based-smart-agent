JSC3D.Viewer = function(canvas, parameters) {
	if(parameters)
		this.params = {
			SceneUrl:			parameters.SceneUrl || '', 
			InitRotationX:		parameters.InitRotationX || 0, 
			InitRotationY:		parameters.InitRotationY || 0, 
			InitRotationZ:		parameters.InitRotationZ || 0, 
			ModelColor:			parameters.ModelColor || '#caa618', 
			BackgroundColor1:	parameters.BackgroundColor1 || '#ffffff', 
			BackgroundColor2:	parameters.BackgroundColor2 || '#383840', 
			BackgroundImageUrl:	parameters.BackgroundImageUrl || '', 
			RenderMode:			parameters.RenderMode || 'flat', 
			Definition:			parameters.Definition || 'standard',
		};
		else
		this.params = {
			SceneUrl: '', 
			InitRotationX: 0, 
			InitRotationY: 0, 
			InitRotationZ: 0, 
			ModelColor: '#caa618', 
			BackgroundColor1: '#ffffff', 
			BackgroundColor2: '#383840', 
			BackgroundImageUrl: '', 
			RenderMode: 'flat', 
			Definition: 'standard', 

			};

			his.ctx2d = null;
	this.canvasData = null;
	this.bkgColorBuffer = null;
	this.colorBuffer = null;
	this.zBuffer = null;
	this.selectionBuffer = null;
	this.frameWidth = canvas.width;
	this.frameHeight = canvas.height;
	this.scene = null;
	this.defaultMaterial = null;
	this.sphereMap = null;
	this.isLoaded = false;
	this.isFailed = false;
	this.abortUnfinishedLoadingFn = null;
	this.needUpdate = false;
	this.needRepaint = false;
	this.initRotX = 0;
	this.initRotY = 0;
	this.initRotZ = 0;
	this.zoomFactor = 1;
	this.panning = [0, 0];
	this.rotMatrix = new JSC3D.Matrix3x4;
	this.transformMatrix = new JSC3D.Matrix3x4;
	this.sceneUrl = '';
	this.modelColor = 0xcaa618;
	this.bkgColor1 = 0xffffff;
	this.bkgColor2 = 0x383840;
	this.bkgImageUrl = '';
	this.bkgImage = null;
	this.renderMode = 'flat';
	this.definition = 'standard';
	this.isMipMappingOn = false;
	this.creaseAngle = -180;
	this.sphereMapUrl = '';
	this.showProgressBar = true;
	this.buttonStates = {};
	this.keyStates = {};
	this.mouseX = 0;
	this.mouseY = 0;
	this.isTouchHeld = false;
	this.baseZoomFactor = 1;
	this.onloadingstarted = null;
	this.onloadingcomplete = null;
	this.onloadingprogress = null;
	this.onloadingaborted = null;
	this.onloadingerror = null;
	this.onmousedown = null;
	this.onmouseup = null;
	this.onmousemove = null;
	this.onmousewheel = null;
	this.beforeupdate = null;
	this.afterupdate = null;