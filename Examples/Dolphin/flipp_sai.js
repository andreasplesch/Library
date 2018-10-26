/*
X-ITE flavored, external SAI to create in memory scene
*/
var browser = X3D.getBrowser(X3D.createBrowser());
var scene = browser.createScene();
scene.setProfile = 'Immersive';
scene.setEncoding = 'SCRIPTED';
//specification version only from xml attribute or vrml, is readOnly per spec.
//scene header
scene.setMetaData('title','flipp.x3d');
//add others
//first root node
//x-ite requires two-step node creation process
//createNode creates internal node
//SFNode is wrapper for easy access to fields
var n1 = new X3D.SFNode(scene.createNode('Viewpoint', false));
n1.position = new X3D.SFVec3f(0, 0, 800);
n1.description = 'cam0 description';
//conformant SAI way of DEF setting
scene.updateNamedNode('cam0', n1);
//SAI way of adding root node to scene
scene.rootNodes.push(n1);
//second root node with children
var n2 = new X3D.SFNode(scene.createNode('Transform', false));
scene.updateNamedNode('trans', n2);
n2.rotation = new X3D.SFRotation(1, 0, 0, 0.78);
//build up children field
var shape = new X3D.SFNode(scene.createNode('Shape', false));
shape.appearance = new X3D.SFNode(scene.createNode('Appearance', false));
shape.appearance.material = new X3D.SFNode(scene.createNode('Material', false));
scene.updateNamedNode('mat', shape.appearance.material); // also works
shape.appearance.material.ambientIntensity=0.52;
shape.appearance.material.diffuseColor=new X3D.SFColor(0.337255, 0.4, 0.788235);
shape.appearance.material.specularColor=new X3D.SFColor(1,1,1);
shape.geometry = new X3D.SFNode(scene.createNode('IndexedFaceSet', false));
shape.geometry.creaseAngle = 2;










