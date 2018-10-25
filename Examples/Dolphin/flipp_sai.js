var browser = X3D.getBrowser(X3D.createBrowser());
var scene = browser.createScene();
scene.setProfile = 'Immersive';
scene.setEncoding = 'SCRIPTED';
//specification version only from xml attribute or vrml, is readOnly per spec.
scene.setMetaData('title','flipp.x3d');
//add others
var n1=scene.createNode('Viewpoint', false);
scene.rootNodes[0]=n1;



