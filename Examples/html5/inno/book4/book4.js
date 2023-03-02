
var BK = {

	
	V: {
		aPageUrls: '[]',
		sCenterRotation: "0 0 0",
		sPosition: "0 60 0",
		sUrlBook: "",
		iZDist: 60,
		iCenterOpen: 10,
		bIsOpen: 0,
		bUrlPage: 0,
		iPageCurrent: 1,
		iPageLast: 25,
		aMoviePages: [3], // array of mp4 movie pages
		oPreloadNext: new Image(),
		oPreloadNextAfterNext: new Image(),
		oPreloadPrevious: new Image(),
		oPreloadPreviousBeforePrevious: new Image(),
		oPreloadNextMovie: BK.A.createVideo(),
		oPreloadNextAfterNextMovie: BK.A.createVideo(),
		oPreloadPreviousMovie: BK.A.createVideo(),
		oPreloadPreviousBeforePreviousMovie: BK.A.createVideo(),
		sUrlPage: "",
		sUrlPageLink: "",
		sUserDevice : 0,
	},
	
	A: {

createVideo : function(){
	var v = document.createElement('video');
	v.preload = "auto";
	v.muted = true;
	v.autoplay = true;
	v.crossOrigin = "anonymous";
	return v;
}
	
bookclose : function(){
	var eA;
	eA = BK.A.dg("closebook");
	eA.style.display = "none";
	eA = BK.A.dg("openbook");
	eA.style.display = "block";
	eA = BK.A.dg("pageprev");
	eA.childNodes[1].baseVal = "bkbuttoninactive";
	eA = BK.A.dg("pagenext");
	eA.childNodes[1].baseVal = "bkbuttoninactive";
	eA = BK.A.dg("pagelink");
	eA.childNodes[1].baseVal = "bkbuttoninactive";
	eA = document.querySelector("Inline").querySelector("[DEF=TIMEClose]");
	eA.setAttribute("startTime", Date.now() / 1000);
	BK.V.sPosition = "0 " + BK.V.iZDist + " 0";
	BK.V.sCenterRotation = "0 0 0";
	BK.A.bookreset();
	BK.V.bIsOpen = 0;
},



bookhelp: function(){
	BK.A.modalopen();
},


bookopen: function(){
	var eA;
	eA = BK.A.dg("openbook");
	eA.style.display = "none";
	eA = BK.A.dg("closebook");
	eA.style.display = "block";
	eA = BK.A.dg("pageprev");
	eA.childNodes[1].className.baseVal = "bkbuttonactive";
	eA = BK.A.dg("pagenext");
	eA.childNodes[1].style.fill.baseVal = "bkbuttonactive";
	eA = document.querySelector("Inline").querySelector("[DEF=TIMEOpen]");
	eA.setAttribute("startTime", Date.now() / 1000);
	eA = document.querySelector('Inline').querySelector("[DEF=spin_TRAFO]");
	eA.setAttribute("center",  "0 0 0");
	BK.V.bIsOpen = 1;
	BK.V.sPosition = BK.V.iCenterOpen + " " + BK.V.iZDist+ " 0";
	BK.V.sCenterRotation = "10 0 0";
	BK.A.bookreset();
	BK.A.pagestexture();
},



bookreset: function(){
	var eI;
	document.querySelector("X3D").runtime.resetView();
	eI = document.querySelector("Inline");
	eI.querySelector("[DEF=spin_TRAFO]").setAttribute("rotation", "0 0 1 0");
	eI = document.querySelector("ViewPoint");
	eI.setAttribute("centerOfRotation", BK.V.sCenterRotation);
	eI.setAttribute("position", BK.V.sPosition);
	eI.setAttribute("orientation", "0.00 0.707 0.707 3.1415");
},



bookscalecenter: function(){
	var eA, sA, aSz, aSc, aMd, aSp, aCn;
	aMd = [252, 288, 20];
	aSz = [246, 281, 21];
	aSp = ("0 0 0").split(" ");
	aSc = [aSz[0] / aMd[0], aSz[2] / aMd[2], aSz[1] / aMd[1]];
	aCn = [aSp[0] * aSc[0], aSp[2] * aSc[2], aSp[1] * aSc[1]];
	eA = document.querySelector('Inline').querySelector("[DEF=StoryBookScaler]");
	sA = aSc[0] + " " + aSc[1] + " " + aSc[2];
	eA.setAttribute("scale", sA);
	eA = document.querySelector('Inline').querySelector("[DEF=spin_TRAFO]");
	sA = aCn[0] + " " + aCn[1] + " " + aCn[2];
	eA.setAttribute("center",  sA);
},






covertexture: function(eA){
	eA.setAttribute("url", "./cover.jpg");
},


dg: function(sId){
	return document.getElementById(sId);
},



ele: function(eParent, sClassName, sType){
	var eX;
	if (!sType){
		sType = "div";
	}
	eX = document.createElement(sType);
	if (sClassName){
		eX.className = sClassName;	
	}
	if (eParent){
		eParent.appendChild(eX);	
	}
	return eX;
},



init(event) {
	var eA, iI;
	eA = event.target.querySelector("Inline");
	eA.setAttribute("url", "book4.x3d");
	eA.onload = BK.A.init2;
	// eA.onload = function(){
	// 	iI = window.setInterval(function(){
	// 		eA = document.querySelector('Inline');
	// 		if (eA){
	// 			window.clearInterval(iI);
	// 			BK.A.init2();
	// 		}
		// }, 20);
	//}


},



init2: function(event){
	var eA, aU, eI, sA, sT, aSvg, sD;
	aSvg = [];
	sD = BK.A.dg("openbook").childNodes[1].attributes.d.nodeValue;
	aSvg.push(sD);
	sD = BK.A.dg("pageprev").childNodes[1].attributes.d.nodeValue;
	aSvg.push(sD);
	sD = BK.A.dg("pagenext").childNodes[1].attributes.d.nodeValue;
	aSvg.push(sD);
	sD = BK.A.dg("closebook").childNodes[1].attributes.d.nodeValue;
	aSvg.push(sD);
	sD = BK.A.dg("bookreset").childNodes[1].attributes.d.nodeValue;
	aSvg.push(sD);
	sD = BK.A.dg("pagelink").childNodes[1].attributes.d.nodeValue;
	aSvg.push(sD);

	BK.A.dg("helpmodalclose").onclick = BK.A.modalclose;
	window.onclick = function(event){
	  if (event.target == BK.A.dg("helpmodal")){
		BK.A.modalclose();
	  }
	};
	sA = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);
	sT = "<h3><u>Welcome to the Future of Digital Books!</u></h3>";
	if (!sA){
		BK.V.sUserDevice = "Computer";
		BK.A.dg("navbuttons").style.maxWidth = "500px";
		sT += "To play with your book is really simple. Click and hold anywhere on the book " + 
		"with your mouse and as you start moving your mouse, the book will rotate " + 
		"and spin around its center. Double-clicking anywhere on the book will set " +
		"that point as the new rotation point for the book.<br><br>" + 
		"Holding Control down while clicking and dragging will move the book around " + 
		"on your screen.<br><br>" +
		"Clicking on the <svg viewBox='0 0 1000 500' class='buttonsvghelp'><path d='" + aSvg[0] + 
		"'></path></svg> button will open your book to a set starting point or, " +
		"if you have read the book before in the same browser (and you have cookies enabled), " + 
		"to the last page you were on.<br><br>" +
		"Use the <svg viewBox='0 0 1000 500' class='buttonsvghelp'><path d='" + aSvg[1] + 
		"'></path></svg><svg viewBox='0 0 1000 500' class='buttonsvghelp'><path d='" + aSvg[2] + 
		"'></path></svg> buttons to page forward and backward through your book. To skip to a " +
		"specific page in the book, just add <b>?page=</b> plus the page number you want to go to, " + 
		"to the end of the URL in your browser - <b>Only Use Odd Numbers!</b> - for example " +
		"myawesomebook.com/?page=113<br><br>" +
		"The <svg viewBox='0 0 1000 500' class='buttonsvghelp'><path d='" + aSvg[3] + 
		"'></path></svg> button closes the book when you are done.<br>" +
		"Use the scroller on your mouse (or right-click and hold while dragging) to zoom in " +
		"and out of your book.<br><br>" + 
		"If you lose control of your book - we have all been there - you can use the " + 
		"<svg viewBox='0 0 1000 500' class='buttonsvghelp'><path d='" + aSvg[4] + 
		"'></path></svg> button " +
		"to reset your book to the starting position.<br><br>" +
		"To learn more about the page you are on, click on the " + 
		"<svg viewBox='0 0 1000 500' class='buttonsvghelp'><path d='" + aSvg[5] + 
		"'></path></svg>" +
		" button to be taken to " + 
		"linked web content (if the button is grayed out, it means there is no linked content).";
	} else {
		BK.V.sUserDevice = sA[0];
		BK.A.dg("helpmodalcopy").style.fontSize = "80%";
		sT = "One finger touch and drag will rotate and spin the book. Two-finger touch "  +
		"and drag will move the book around.<br><br>" +
		"Clicking on the <svg viewBox='0 0 1000 500' class='buttonsvghelp'><path d='" + aSvg[0] + 
		"'></path></svg> button will open your book to a set starting point or, " + 
		"if you have read the book before in the same browser (and you have " +
		"cookies enabled), to the last page you were on.<br><br>" +
		"Use the <svg viewBox='0 0 1000 500' class='buttonsvghelp'><path d='" + aSvg[1] + 
		"'></path></svg><svg viewBox='0 0 1000 500' class='buttonsvghelp'><path d='" + aSvg[2] + 
		"'></path></svg> buttons to page forward and backward through your book." +
		"The <svg viewBox='0 0 1000 500' class='buttonsvghelp'><path d='" + aSvg[3] + 
		"'></path></svg> button closes the book when you are done.<br><br>" + 
		"Use a two-finger pinch to zoom in and out of your book.<br><br>" +
		"If you lose control of your book - we have all been there - you can use the " +
		"<svg viewBox='0 0 1000 500' class='buttonsvghelp'><path d='" + aSvg[4] + 
		"'></path></svg>" + 
		"button to reset your book to the starting position.<br><br>" +
		"To learn more about the page you are on, click on the" +
		"<svg viewBox='0 0 1000 500' class='buttonsvghelp'><path d='" + aSvg[5] + 
		"'></path></svg>" +
		"button to be taken to " + 
		"linked web content (if the button is grayed out, it means there is no linked content).";
	}
	BK.A.dg("navbuttons").style.opacity = 1;
	BK.A.dg("helpmodalcopy").innerHTML = sT;
	BK.V.aPageUrls = JSON.parse(BK.V.aPageUrls);
	aU = window.location.href.split("?page=");
	BK.V.sUrlPage = aU[0];
	if ((aU[1]) && (parseInt(aU[1]))){
		BK.V.bUrlPage = 1;
		BK.V.iPageCurrent = parseInt(aU[1]);
		if (BK.V.iPageCurrent == 9999){
			BK.V.iPageCurrent = BK.V.iPageLast;
		}
	}
	BK.A.bookscalecenter();
	eI = document.querySelector("Inline");
	eA = eI.querySelector("[DEF=coverPageTex]");
	BK.A.covertexture(eA);
	BK.A.setX3DTexture();
	eA = document.querySelector('Inline').querySelector('[DEF=spinCLOCK]');
	eA.setAttribute('startTime', Date.now () / 1000);
	if (BK.A.dg("cor")){
		sA = eA.getAttribute("centerOfRotation");
		BK.A.dg("cor").value = sA;
		sA = eA.getAttribute("orientation");
		BK.A.dg("ori").value = sA;
		sA = eA.getAttribute("position");
		BK.A.dg("pos").value = sA;
	}
},

setX3DTexture: function(){
	// var eI, eA;
	// eI = document.querySelector("Inline");
	// eA = eI.querySelector("[DEF=previousPageTex]");
	// BK.A.imageormovie(eA, BK.V.iPageCurrent - 2);
	// eA = eI.querySelector("[DEF=previousPageTex003]"); //right
	// BK.A.imageormovie(eA, BK.V.iPageCurrent - 2);
	BK.A.switchShape("previous", BK.V.iPageCurrent - 2);
	BK.A.switchShape("current",  BK.V.iPageCurrent - 0);
	BK.A.switchShape("next",     BK.V.iPageCurrent + 2);
	// //eA.setAttribute("url", "./" + (BK.V.iPageCurrent - 2) + ".jpg");
	// eA = eI.querySelector("[DEF=currentPageTex]"); //left
	// BK.A.imageormovie(eA, BK.V.iPageCurrent - 0);
	// eA = eI.querySelector("[DEF=currentPageTex003]"); //right
	// BK.A.imageormovie(eA, BK.V.iPageCurrent - 0);
	// //eA.setAttribute("url", "./" + (BK.V.iPageCurrent + 0) + ".jpg");
	// eA = eI.querySelector("[DEF=nextPageTex]");
	// BK.A.imageormovie(eA, BK.V.iPageCurrent + 2);
	// eA = eI.querySelector("[DEF=nextPageTex003]");
	// BK.A.imageormovie(eA, BK.V.iPageCurrent + 2);
	//eA.setAttribute("url", "./" + (BK.V.iPageCurrent + 2) + ".jpg");
},

switchShape: function(sPos, iPage){
	var eI, eA;
	var sExt = ".jpg";
	var sTexSel = "DEF="+sPos+"PageTex";
	// var sTexSel003 = "DEF="+sPos+"PageTex003";
	var iChoice = 0; // image, 1 movie
	eI = document.querySelector("Inline");
	if ( BK.V.aMoviePages.indexOf(iPage) > -1 ) // a movie page
	{
		sExt = ".mp4";
		sTexSel += "_movie";
		// sTexSel003 += "_movie";
		iChoice = 1;
	}
	eA = eI.querySelector("["+sTexSel+"]");
	eA.setAttribute("url", "./" + iPage + sExt);
	// eA = eI.querySelector("["+sTexSel003+"]");
	// eA && eA.setAttribute("url", "./" + iPage + sExt);
	eI.querySelectorAll("Switch[DEF*="+sPos+"]").forEach(
		function(eSwitch){
			eSwitch.setAttribute("whichChoice", iChoice);
		}
	)
},

// imageormovie: function(eA, iPage){
// 	if ( BK.V.aMoviePages.indexOf(iPage) > -1 ) // a movie page
// 	{
// 		if (eA.nodeName.toLowerCase() == 'movietexture')
// 		{
// 			eA.setAttribute("url", "./" + iPage + ".mp4");
// 		}
// 		else
// 		{
// 			eA.replaceWith( BK.A.movie(iPage, eA.getAttribute("DEF") ) );
// 		}
// 	}
// 	else
// 	{
// 		if (eA.nodeName.toLowerCase() == 'imagetexture')
// 		{
// 			eA.setAttribute("url", "./" + iPage + ".jpg");
// 		}
// 		else
// 		{
// 			eA.replaceWith( BK.A.image(iPage, eA.getAttribute("DEF") ) );
// 		}
// 	}
// },

// image: function(iPage, sDef){
// 	var eA = document.createElement("ImageTexture");
// 	eA.setAttribute("DEF", sDef);
// 	eA.setAttribute("crossOrigin", "anonymous");
// 	eA.setAttribute("url","./" + iPage + ".jpg");
// 	return eA;
// },

// movie: function(iPage, sDef){
// 	var eA = document.createElement("MovieTexture");
// 	eA.setAttribute("DEF", sDef);
// 	eA.setAttribute("crossOrigin", "anonymous");
// 	eA.setAttribute("url","./" + iPage + ".mp4");
// 	eA.setAttribute("loop", "true");
// 	return eA;
// },

modalclose: function(){
	var eA;
	eA = BK.A.dg("helpmodal");

	eA.style.opacity = 0;
	window.setTimeout(function(){
		eA.style.display = "none";
	}, 150);
},



modalopen: function(){
	var eA;
	eA = BK.A.dg("helpmodal");
	eA.style.display = "block";
	window.setTimeout(function(){
		eA.style.opacity = 1;
	}, 1);
},



pagelink: function(){
	if (BK.V.sUrlPageLink){
		window.open(BK.V.sUrlPageLink, "_child");
	}
},



pagenext: function(){
	var eA;
	if ((!BK.V.bIsOpen) || (BK.V.iPageCurrent == BK.V.iPageLast)){
		return;
	}
	eA = document.querySelector("Inline").querySelector("[DEF=TIMEFlipRight]");
	eA.setAttribute("startTime", Date.now() / 1000);
},



pagenextbusy: function(event) {
	if (event.fieldName == "isActive") {
		if  (event.value == true) {
		}
		if  (event.value == false) {
			BK.V.iPageCurrent += 2;
			BK.A.pagestexture();
		}
	}
},



pageprev: function(){
	var eA;
	if ((!BK.V.bIsOpen) || (BK.V.iPageCurrent === -1)){
		return;
	}
	eA = document.querySelector("Inline").querySelector("[DEF=TIMEFlipLeft]");
	eA.setAttribute("startTime", Date.now() / 1000);
},



pageprevbusy: function(event) {
	if (event.fieldName == "isActive") {
		if  (event.value == true){ 
		}
		if  (event.value == false){
			BK.V.iPageCurrent -= 2;
			BK.A.pagestexture();
		}
	}
},



pagespreload() {
	var iNext = BK.V.iPageCurrent + 2;
	var iNextNext = BK.V.iPageCurrent + 4;
	var iPrevious = BK.V.iPageCurrent - 2;
	var iPreviousPrevious = BK.V.iPageCurrent - 4;
	var sType = function (iPage) { return BK.V.aMoviePages.indexOf(iPage) > -1 ? "Movie" : "" };
	var sExt = function (iPage) { return BK.V.aMoviePages.indexOf(iPage) > -1 ? ".mp4" : ".jpg" };

	BK.V["oPreloadNext"+sType(iNext)].src = "./" + iNext + sExt(iNext);
	BK.V["oPreloadPrevious"+sType(iPrevious)].src = "./" + iPrevious + sExt(iPrevious);
	BK.V["oPreloadNextAfterNext"+sType(iNextNext)].src = "./" + iNextNext + sExt(iNextNext);
	BK.V["oPreloadPreviousBeforePrevious"+sType(iPreviousPrevious)].src = "./" + iPreviousPrevious + sExt(iPreviousPrevious);;
},



pagestexture: function(){
	var sUrl, oA, oB, eI, eA, sU;
	BK.A.pagespreload();
	if (BK.V.bUrlPage){
		window.history.pushState
		("", "", BK.V.sUrlPage + "?page=" + BK.V.iPageCurrent);
	}
	eI = document.querySelector("Inline");
	eA = eI.querySelector("[DEF=paper002_current]");
	eA.setAttribute("visible", true);
	eA = eI.querySelector("[DEF=paper002_next]");
	eA.setAttribute("visible", false);
	eA = eI.querySelector("[DEF=paper002_previous]");
	eA.setAttribute("visible", false);
	eA = eI.querySelector("[DEF=paper003_current]");
	eA.setAttribute("visible", true);
	eA = eI.querySelector("[DEF=paper003_next]");
	eA.setAttribute("visible", false);
	eA = eI.querySelector("[DEF=paper003_previous]");
	eA.setAttribute("visible", false);
	BK.A.setX3DTexture();
	sU = "";
	BK.V.aPageUrls.forEach(function(aU){
		if (aU[0] == BK.V.iPageCurrent){
			sU = aU[1];
		}
	});
	if ((!sU) && (BK.V.sUrlBook)){
		sU = BK.V.sUrlBook;
	}
	if (BK.V.bIsOpen){
		BK.V.sUrlPageLink = sU;
		eA = BK.A.dg("pagelink");
		if (sU){
			eA.childNodes[1].className.baseVal = "bkbuttonactive";
		} else {
			eA.childNodes[1].className.baseVal = "bkbuttoninactive";
		}
		eA = BK.A.dg("pageprev");
		if (BK.V.iPageCurrent < 0){
			eA.childNodes[1].className.baseVal = "bkbuttoninactive";
		} else {
			eA.childNodes[1].className.baseVal = "bkbuttonactive";
		}
		eA = BK.A.dg("pagenext");
		if (BK.V.iPageCurrent >= BK.V.iPageLast){
			eA.childNodes[1].className.baseVal = "bkbuttoninactive";
		} else {
			eA.childNodes[1].className.baseVal = "bkbuttonactive";
		}
	}
},



},



};


console.log("book4js");

//patch x3dom

x3dom.Texture.prototype.updateTexture = function ()
{
    var gl = this.gl;
    var doc = this.doc;
    var tex = this.node;

    // Set sampler
    this.samplerName = tex._type;

    // Set texture type
    if ( x3dom.isa( tex, x3dom.nodeTypes.X3DEnvironmentTextureNode ) )
    {
        this.type = gl.TEXTURE_CUBE_MAP;
    }
    else
    {
        this.type = gl.TEXTURE_2D;
    }

    // Set texture format
    if ( x3dom.isa( tex, x3dom.nodeTypes.PixelTexture ) )
    {
        switch ( tex._vf.image.comp )
        {
            case 1:
                this.format = gl.LUMINANCE;
                break;
            case 2:
                this.format = gl.LUMINANCE_ALPHA;
                break;
            case 3:
                this.format = gl.RGB;
                break;
            case 4:
                this.format = gl.RGBA;
                break;
        }
    }
    else
    {
        this.format = gl.RGBA;
    }

    // Set texture min, mag, wrapS and wrapT
    if ( tex._cf.textureProperties.node !== null )
    {
        var texProp = tex._cf.textureProperties.node;

        this.wrapS = x3dom.Utils.boundaryModesDic( gl, texProp._vf.boundaryModeS );
        this.wrapT = x3dom.Utils.boundaryModesDic( gl, texProp._vf.boundaryModeT );

        this.minFilter = x3dom.Utils.minFilterDic( gl, texProp._vf.minificationFilter );
        this.magFilter = x3dom.Utils.magFilterDic( gl, texProp._vf.magnificationFilter );

        this.anisotropicDegree = Math.min( Math.max( texProp._vf.anisotropicDegree, 1.0 ), x3dom.caps.MAX_ANISOTROPY );

        if ( texProp._vf.generateMipMaps === true )
        {
            this.genMipMaps = true;

            if ( this.minFilter == gl.NEAREST )
            {
                this.minFilter = gl.NEAREST_MIPMAP_NEAREST;
            }
            else if ( this.minFilter == gl.LINEAR )
            {
                this.minFilter = gl.LINEAR_MIPMAP_LINEAR;
            }

            if ( this.texture && ( this.texture.ready || this.texture.textureCubeReady ) )
            {
                gl.bindTexture( this.type, this.texture );
                gl.generateMipmap( this.type );
                gl.bindTexture( this.type, null );
            }
        }
        else
        {
            this.genMipMaps = false;

            if ( ( this.minFilter == gl.LINEAR_MIPMAP_LINEAR ) ||
                ( this.minFilter == gl.LINEAR_MIPMAP_NEAREST ) )
            {
                this.minFilter = gl.LINEAR;
            }
            else if ( ( this.minFilter == gl.NEAREST_MIPMAP_LINEAR ) ||
                ( this.minFilter == gl.NEAREST_MIPMAP_NEAREST ) )
            {
                this.minFilter = gl.NEAREST;
            }
        }
    }
    else
    {
        if ( tex._vf.repeatS == false )
        {
            this.wrapS = gl.CLAMP_TO_EDGE;
        }
        else
        {
            this.wrapS = gl.REPEAT;
        }

        if ( tex._vf.repeatT == false )
        {
            this.wrapT = gl.CLAMP_TO_EDGE;
        }
        else
        {
            this.wrapT = gl.REPEAT;
        }

        if ( this.samplerName == "displacementMap" )
        {
            this.wrapS = gl.CLAMP_TO_EDGE;
            this.wrapT = gl.CLAMP_TO_EDGE;
            this.minFilter = gl.NEAREST;
            this.magFilter = gl.NEAREST;
        }
    }

    // Looking for child texture
    var childTex = ( tex._video && tex._needPerFrameUpdate === true );

    // Set texture
    if ( tex._isCanvas && tex._canvas )
    {
        if ( this.texture == null )
        {
            this.texture = gl.createTexture();
        }
        this.texture.width = tex._canvas.width;
        this.texture.height = tex._canvas.height;
        this.texture.ready = true;

        gl.bindTexture( this.type, this.texture );
        gl.texImage2D( this.type, 0, this.format, this.format, gl.UNSIGNED_BYTE, tex._canvas );
        if ( this.genMipMaps )
        {
            gl.generateMipmap( this.type );
        }
        gl.bindTexture( this.type, null );
    }

    else if ( x3dom.isa( tex, x3dom.nodeTypes.RenderedTexture ) )
    {
        if ( tex._webgl && tex._webgl.fbo )
        {
            if ( tex._webgl.fbo.dtex && tex._vf.depthMap )
            {
                this.texture = tex._webgl.fbo.dtex;
            }
            else
            {
                this.texture = tex._webgl.fbo.tex;
            }
        }
        else
        {
            this.texture = null;
            x3dom.debug.logError( "Try updating RenderedTexture without FBO initialized!" );
        }
        if ( this.texture )
        {
            this.texture.ready = true;
        }
    }
    else if ( x3dom.isa( tex, x3dom.nodeTypes.PixelTexture ) )
    {
        if ( tex._vf.origChannelCount == 0 ) {tex.setOrigChannelCount( tex._vf.image.comp );}

        if ( this.texture == null )
        {
            if ( this.node._DEF )
            {
                this.texture = this.cache.getTexture2DByDEF( gl, this.node._nameSpace, this.node._DEF );
            }
            else
            {
                this.texture = gl.createTexture();
            }
        }
        this.texture.width = tex._vf.image.width;
        this.texture.height = tex._vf.image.height;
        this.texture.ready = true;

        var pixelArr = tex._vf.image.array;
        var pixelArrfont_size = tex._vf.image.width * tex._vf.image.height * tex._vf.image.comp;

        var pixels = new Uint8Array( pixelArrfont_size );

        pixels.set( pixelArr );

        gl.bindTexture( this.type, this.texture );
        gl.pixelStorei( gl.UNPACK_ALIGNMENT, 1 );
        gl.texImage2D( this.type, 0, this.format,
            tex._vf.image.width, tex._vf.image.height, 0,
            this.format, gl.UNSIGNED_BYTE, pixels );
        if ( this.genMipMaps )
        {
            gl.generateMipmap( this.type );
        }
        gl.bindTexture( this.type, null );
    }
    else if ( x3dom.isa( tex, x3dom.nodeTypes.MovieTexture ) || childTex )
    {
        var that = this;
        var p = document.getElementsByTagName( "body" )[ 0 ];

        if ( this.texture == null )
        {
            this.texture = gl.createTexture();
        }

        if ( this.dashtexture )
        {
            var element_vid = document.createElement( "div" );
            element_vid.setAttribute( "class", "dash-video-player" + x3dom.Texture.textNum );
            tex._video = document.createElement( "video" );
            tex._video.setAttribute( "preload", "auto" );
            tex._video.setAttribute( "muted", "muted" );

            var scriptToRun = document.createElement( "script" );
            scriptToRun.setAttribute( "type", "text/javascript" );
            scriptToRun.innerHTML = "startDashVideo(\"" + tex._vf.url[ 0 ] +
                "\",\".dash-video-player" + x3dom.Texture.textNum + " video\")";
            element_vid.appendChild( scriptToRun );
            element_vid.appendChild( tex._video );
            p.appendChild( element_vid );
            tex._video.style.visibility = "hidden";
            tex._video.style.display = "none";
        }
        else
        {
            if ( !childTex && !tex._video )
            {
                tex._video = document.createElement( "video" );
                tex._video.setAttribute( "preload", "auto" );
                tex._video.setAttribute( "muted", "muted" );
                tex._video.setAttribute( "autoplay", "" );
                tex._video.setAttribute( "playsinline", "" );
                tex._video.crossOrigin = "anonymous";
                // p.appendChild( tex._video );
                // tex._video.style.visibility = "hidden";
                // tex._video.style.display = "none";
                // tex._video.load();
            }

            tex._video.querySelectorAll( "source" ).forEach(
                function( source )
                {
                    source.remove();
                }
            );
            
            for ( var i = 0; i < tex._vf.url.length; i++ )
            {
                var videoUrl = tex._nameSpace.getURL( tex._vf.url[ i ] );
                x3dom.debug.logInfo( "Adding video file: " + videoUrl );
                var src = document.createElement( "source" );
                src.setAttribute( "src", videoUrl );
                tex._video.appendChild( src );
            }
            tex._video.load();
        }

        var requestAnimFrameId = 0;

        var updateMovie = function ()
        {
            gl.bindTexture( that.type, that.texture );
            gl.texImage2D( that.type, 0, that.format, that.format, gl.UNSIGNED_BYTE, tex._video );
            if ( that.genMipMaps )
            {
                gl.generateMipmap( that.type );
            }
            gl.bindTexture( that.type, null );
            that.texture.ready = true;
            that.doc.needRender = true;
            window.requestAnimFrame( updateMovie );
        };

        var startVideo = function ()
        {
            //x3dom.debug.logInfo( "startVideo" );
            window.removeEventListener( "mousedown", startVideo );
            window.removeEventListener( "keydown", startVideo );
            if ( !( tex._video instanceof HTMLMediaElement ) )
            {
                x3dom.debug.logInfo( "No video exists." );
                return;
            }
            tex._video.playbackRate = tex._vf.speed;
            tex._video.play()
                .then( function fulfilled ()
                {
                    if ( requestAnimFrameId )
                    {
                        x3dom.debug.logInfo( "The video has already started, startVideo() is called repeatedly." );
                        // clearInterval( tex._intervalID );
                        // tex._intervalID = null;
                    }
                    // tex._intervalID = setInterval( updateMovie, 16 );
                    requestAnimFrameId = window.requestAnimFrame(updateMovie);
                } )
                .catch( function rejected ( err )
                {
                    x3dom.debug.logInfo( "Waiting for interaction: " + err );
                    window.addEventListener( "mousedown", startVideo );
                    window.addEventListener( "keydown", startVideo );
                } );
        };

        var pauseVideo = function ()
        {
            //x3dom.debug.logInfo( "pauseVideo" );
            window.removeEventListener( "mousedown", startVideo );
            window.removeEventListener( "keydown", startVideo );
            tex._video.pause();
            // clearInterval( tex._intervalID );
            // tex._intervalID = null;
            window.cancelAnimationFrame( requestAnimFrameId );
        };

        var videoDone = function ()
        {
            // clearInterval( tex._intervalID );
            // tex._intervalID = null;
            window.cancelAnimationFrame( requestAnimFrameId );
            requestAnimFrameId = 0;
            if ( tex._vf.loop === true )
            {
                startVideo();
                // tex._video.play();
                // tex._intervalID = setInterval( updateMovie, 16 );
            }
        };

        tex._video.startVideo = startVideo;
        tex._video.pauseVideo = pauseVideo;

        // Start listening for the canplaythrough event, so we do not
        // start playing the video until we can do so without stuttering
        tex._video.addEventListener( "canplaythrough", startVideo, true );

        // Start listening for the ended event, so we can stop the
        // texture update when the video is finished playing
        tex._video.addEventListener( "ended", videoDone, true );
    }
    else if ( x3dom.isa( tex, x3dom.nodeTypes.X3DEnvironmentTextureNode ) )
    {
        this.texture = this.cache.getTextureCube( gl, doc, tex.getTexUrl(), false,
            tex._vf.crossOrigin, tex._vf.scale, this.genMipMaps, tex._vf.flipY );
    }
    else
    {
        this.texture = this.cache.getTexture2D( gl, doc, tex._nameSpace.getURL( tex._vf.url[ 0 ] ),
            false, tex._vf.crossOrigin, tex._vf.scale, this.genMipMaps, tex._vf.flipY, tex );
    }
};


x3dom.Texture.prototype.update = function() {
	if (x3dom.isa(this.node, x3dom.nodeTypes.Text)) {
		this.updateText();
	} else {
		this.updateTexture();
	}
	//AP: this prevented USE Appearance updates
	//this.node.validateGLObject();
};



x3dom.Utils.createTexture2D = function(gl, doc, src, bgnd, crossOrigin, scale, genMipMaps, flipY, tex) {
	flipY = flipY || false;
	var texture = gl.createTexture();
	//Create a 4 pixel texture to prevent 'texture not complete' warning
	//AP: change to white here, could be any RGB color
	var data = new Uint8Array([255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]);
	gl.bindTexture(gl.TEXTURE_2D, texture);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 2, 2, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);
	if (genMipMaps) {
		gl.generateMipmap(gl.TEXTURE_2D);
	}
	gl.bindTexture(gl.TEXTURE_2D, null);
	texture.ready = false;
	if (src == null || src == "") {
		return texture;
	}
	var image = new Image();
	switch (crossOrigin.toLowerCase()) {
		case "anonymous":
		{
			image.crossOrigin = "anonymous";
		}
		break;
		case "use-credentials":
		{
			image.crossOrigin = "use-credentials";
		}
		break;
		case "none":
		{//this is needed to omit the default case, if default is none, erase this and the default case
		}
		break;
		default:
		{
			if (x3dom.Utils.forbiddenBySOP(src)) {
				image.crossOrigin = "anonymous";
			}
		}
	}
	if (tex && tex.getOrigChannelCount() === 0) {
		var xhr = new XMLHttpRequest();
		xhr.open("GET", src);
		xhr.onloadstart = function() {
			xhr.responseType = "arraybuffer";
		}
		xhr.onload = function() {
			var mimeType = xhr.getResponseHeader("Content-Type")
				, imageData = new Uint8Array(xhr.response)
				, channelcount = x3dom.Utils.detectChannelCount(imageData, mimeType);
			if (channelcount) {
				tex.setOrigChannelCount(channelcount);
			}
			image.src = x3dom.Utils.arrayBufferToObjectURL(imageData, mimeType);
		}
		x3dom.RequestManager.addRequest(xhr);
	} else {
		image.src = src;
	}
	doc.incrementDownloads();
	image.onload = function() {
		texture.originalWidth = image.width;
		texture.originalHeight = image.height;
		if (scale) {
			image = x3dom.Utils.scaleImage(image);
		}
		if (bgnd == true || flipY == true) {
			gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
		}
		gl.bindTexture(gl.TEXTURE_2D, texture);
		//gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
		if (genMipMaps) {
			gl.generateMipmap(gl.TEXTURE_2D);
		}
		gl.bindTexture(gl.TEXTURE_2D, null);
		if (bgnd == true || flipY == true) {
			gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
		}
		//Save image size
		texture.width = image.width;
		texture.height = image.height;
		texture.ready = true;
		doc.decrementDownloads();
		doc.needRender = true;
	};
	image.onerror = function(error) {
		x3dom.Utils.tryDDSLoading(texture, gl, doc, src, genMipMaps, flipY, tex).then(function() {
			doc.decrementDownloads();
			doc.needRender = true;
		}, function() {
			x3dom.debug.logError("[Utils|createTexture2D] Can't load Image: " + src);
			doc.decrementDownloads();
		});
	};
	return texture;
};

