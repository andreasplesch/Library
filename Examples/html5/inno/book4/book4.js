
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
		sUrlPage: "",
		sUrlPageLink: "",
		sUserDevice : 0,
	},
	
	
	A: {
	
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
	var sTexSel003 = "DEF="+sPos+"PageTex003";
	var iChoice = 0; // image, 1 movie
	eI = document.querySelector("Inline");
	if ( BK.V.aMoviePages.indexOf(iPage) > -1 ) // a movie page
	{
		sExt = ".mp4";
		sTexSel += "_movie";
		sTexSel003 += "_movie";
		iChoice = 1;
	}
	eA = eI.querySelector("["+sTexSel+"]");
	eA.setAttribute("url", "./" + iPage + sExt);
	eA = eI.querySelector("["+sTexSel003+"]");
	eA && eA.setAttribute("url", "./" + iPage + sExt);
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
	BK.V.oPreloadNext.src = "./" + (BK.V.iPageCurrent + 2) + ".jpg";
	BK.V.oPreloadPrevious.src = "./" + (BK.V.iPageCurrent - 2) + ".jpg";
	BK.V.oPreloadNextAfterNext.src = "./" + (BK.V.iPageCurrent + 4) + ".jpg";
	BK.V.oPreloadPreviousBeforePrevious.src = "./" + (BK.V.iPageCurrent - 4) + ".jpg";
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
