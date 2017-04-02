Set the initial value for a parameter to parameterize the viewer.<br />
	Available parameters are:<br />
	'<b>SceneUrl</b>':				url string that describes where to load the scene, default to '';<br />
	'<b>InitRotationX</b>':			initial rotation angle around x-axis for the whole scene, default to 0;<br />
	'<b>InitRotationY</b>':			initial rotation angle around y-axis for the whole scene, default to 0;<br />
	'<b>InitRotationZ</b>':			initial rotation angle around z-axis for the whole scene, default to 0;<br />
	'<b>CreaseAngle</b>':			an angle to control the shading smoothness between faces. Two adjacent faces will be shaded with discontinuity at the edge if the angle between their normals exceeds this value. Not used by default;<br />
	'<b>ModelColor</b>':			fallback color for all meshes, default to '#caa618';<br />
	'<b>BackgroundColor1</b>':		color at the top of the background, default to '#ffffff';<br />
	'<b>BackgroundColor2</b>':		color at the bottom of the background, default to '#383840';<br />
	'<b>BackgroundImageUrl</b>':	url string that describes where to load the image used for background, default to '';<br />
	'<b>RenderMode</b>':			render mode, default to 'flat';<br />
	'<b>Definition</b>':			quality level of rendering, default to 'standard';<br />
	'<b>MipMapping</b>':			turn on/off mip-mapping, default to 'off';<br />
	'<b>SphereMapUrl</b>':			url string that describes where to load the image used for sphere mapping, default to '';<br />
	'<b>ProgressBar</b>':			turn on/off the progress bar when loading, default to 'on'. By turning off the default progress bar, a user defined loading indicator can be used instead;<br />
	'<b>Renderer</b>':				set to 'webgl' to enable WebGL for rendering, default to ''.