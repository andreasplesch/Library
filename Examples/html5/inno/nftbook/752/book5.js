var pageFlip = 0;

var BK = {

	
	V: {
		aButtonStates: [1, 2, 2, 2, 1, 0, 1, 2, 1],
		aButtonStates3d: [],
		aButtonIds: [
			"book2d3d",
			"pageprev",
			"pagenumberbox",
			"pagenext",
			"openbook",
			"closebook",
			"bookreset",
			"pagelink",
			"bookhelp"
		],
		aPageUrls: '[]',
		sCenterRotation: "0 0 0",
		sPosition: "0 60 0",
		sUrlBook: "",
		iZDist: 60,
		iCenterOpen: 10,
		bIs2D: 0,
		bIsOpen: 0,
		bUrlPage: 0,
		iPageCurrent: 1,
		iPageLast: 11,
		oPreloadNext: new Image(),
		oPreloadNextAfterNext: new Image(),
		oPreloadPrevious: new Image(),
		oPreloadPreviousBeforePrevious: new Image(),
		sUrlPage: "",
		sUrlPageLink: "",
		sUserDevice : 0,
		sBgMode : "light",
	},
	
	
	A: {

flipmode: function (){
    //flip between dark and light background
	BK.V.sBgMode = BK.V.sBgMode == "light" ? "dark" : "light";
	var eA = document.querySelector("[DEF="+ BK.V.sBgMode + "Sky]");
	eA.setAttribute("set_bind", true);
	//dark buttons
	//document.querySelector(".buttonsbox").style.background = BK.V.sBgMode == "light" ? "white" : "white";
	document.querySelector(".buttonsbox").style.filter = BK.V.sBgMode == "light" ? "invert(0)" : "invert(100%)";
},

book2d3d: function(){
	var eA, iH;
	if (BK.V.bIs2D){
		BK.V.bIs2D = 0;
		BK.A.dg("book3d").style.display = "block";
		BK.A.dg("book2d").style.opacity = "0";
		window.setTimeout(function(){
			BK.A.dg("book2d").style.display = "none";
			BK.A.dg("book3d").style.display = "block";
			BK.A.dg("book3d").style.opacity = "1";
			}, 250);
		BK.V.aButtonStates = [];
		BK.V.aButtonStates3d.forEach(function(iB){
			BK.V.aButtonStates.push(iB);
		});
		BK.A.buttons();
		eA = BK.A.dg("pageprev").childNodes[1].onclick = BK.A.pageprev;
		eA = BK.A.dg("pagenext").childNodes[1].onclick = BK.A.pagenext;
	} else {
		iH = BK.A.dg("book3d").clientHeight;
		BK.V.bIs2D = 1;
		BK.A.dg("book3d").style.opacity = "0";
		BK.A.dg("book2d").style.height = (iH - 20) + "px";
		BK.A.dg("book2d").style.maxHeight = (iH - 20) + "px";
		BK2D.V.aMax = [(iH - 20) * 1.3, iH - 20];
		window.setTimeout(function(){
			BK.A.dg("book3d").style.display = "none";
			BK.A.dg("book2d").style.display = "block";
			BK.A.dg("book2d").style.opacity = "1";
			if (!BK2D.V.bInited){
				BK2D.V.bInited = 1;
				BK2D.init();
			}
		}, 250);
		
		BK.V.aButtonStates3d = [];
		BK.V.aButtonStates.forEach(function(iB){
			BK.V.aButtonStates3d.push(iB);
		});
		BK.V.aButtonStates = [1, 1, 1, 1, 0, 0, 0, 0, 1];
		BK.A.buttons();
	}
},



bookclose: function(){
	var eA;
	BK.V.aButtonStates = [1, 2, 2, 2, 1, 0, 1, 2, 1];
	BK.A.buttons();
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
	BK.V.aButtonStates = [1, 1, 1, 1, 0, 1, 1, 2, 1];
	BK.A.buttons();
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
	aSz = [241, 332, 28];
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



buttons: function(event){
	var eA, aU, eI, sA, sT, aSvg, iI;
	for (iI = 0; iI < BK.V.aButtonStates.length; iI++){
		eA = BK.A.dg(BK.V.aButtonIds[iI]);
		switch (BK.V.aButtonStates[iI]){
			case 0:
				eA.style.width = "0";
				eA.style.margin = "0 0 0 0";
				eA.style.padding = "0";
			break;
			case 1:
				eA.style.width = "22%";
				eA.style.margin = "0 1% 0 0";
				eA.style.padding = "1%";
				eA = eA.childNodes[1].childNodes[1].childNodes[1];
				eA.className.baseVal = "bkbuttonactive";
				if (iI == 2){
					eA = BK.A.dg("pagenumber");
					eA.disabled = "";
					eA.value = BK.V.iPageCurrent;		
				}
			break;
			case 2:
				eA.style.width = "22%";
				eA.style.margin = "0 1% 0 0";
				eA.style.padding = "1%";
				eA = eA.childNodes[1].childNodes[1].childNodes[1];
				eA.className.baseVal = "bkbuttoninactive";
				if (iI == 3){
					BK.A.dg("pagenumber").disabled = "disabled";
				}
			break;
		}
	}
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
	eA.setAttribute("url", "book5.x3d");
	eA.onload = function(){
		iI = window.setInterval(function(){
			eA = document.querySelector('Inline');
			if (eA){
				window.clearInterval(iI);
				BK.A.init2();
			}
		}, 20);
	}


},



init2: function(event){
	var eA, aU, eI, sA, sT, aSvg, iI;
	BK.A.buttons();
	aSvg = [];
	aSvg.push(BK.A.dg("openbook").childNodes[1].childNodes[1].childNodes[1].attributes.d.nodeValue);
	aSvg.push(BK.A.dg("pageprev").childNodes[1].childNodes[1].childNodes[1].attributes.d.nodeValue);
	aSvg.push(BK.A.dg("pagenext").childNodes[1].childNodes[1].childNodes[1].attributes.d.nodeValue);
	aSvg.push(BK.A.dg("closebook").childNodes[1].childNodes[1].childNodes[1].attributes.d.nodeValue);
	aSvg.push(BK.A.dg("bookreset").childNodes[1].childNodes[1].childNodes[1].attributes.d.nodeValue);
	aSvg.push(BK.A.dg("pagelink").childNodes[1].childNodes[1].childNodes[1].attributes.d.nodeValue);

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
	eA = eI.querySelector("[DEF=previousPageTex]");
	eA.setAttribute("url", "./" + (BK.V.iPageCurrent - 2) + ".jpg");
	eA = eI.querySelector("[DEF=currentPageTex]");
	eA.setAttribute("url", "./" + (BK.V.iPageCurrent + 0) + ".jpg");
	eA = eI.querySelector("[DEF=nextPageTex]");
	eA.setAttribute("url", "./" + (BK.V.iPageCurrent + 2) + ".jpg");
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
	BK.A.pagesearch();
	eA = document.querySelector("Inline").querySelector("[DEF=TIMEFlipRight]");
	if (eA.getFieldValue('isActive')) {
	  eA.setAttribute("enabled", false)
	};
	if (BK.V.iPageCurrent < BK.V.iPageLast) eA.setAttribute("startTime", Date.now() / 1000);
},



pagenextbusy: function(event) {
	if (event.fieldName == "isActive") {
		if  (event.value == true) {
		}
		if  (event.value == false) {
			event.target.setAttribute("enabled", true);
			if (BK.V.iPageCurrent < BK.V.iPageLast) BK.V.iPageCurrent += 2;
			BK.A.dg("pagenumber").value = BK.V.iPageCurrent;
			BK.A.pagestexture();
		}
	}
},



pageprev: function(){
	var eA;
	if ((!BK.V.bIsOpen) || (BK.V.iPageCurrent === -1)){
		return;
	}
	BK.A.pagesearch();
	eA = document.querySelector("Inline").querySelector("[DEF=TIMEFlipLeft]");
	if (eA.getFieldValue('isActive')) {
	    eA.setAttribute("enabled", false);
	};
	if (BK.V.iPageCurrent > -1) eA.setAttribute("startTime", Date.now() / 1000);
},



pageprevbusy: function(event) {
	if (event.fieldName == "isActive") {
		if  (event.value == true){ 
		}
		if  (event.value == false){
			event.target.setAttribute("enabled", true);
			if (BK.V.iPageCurrent > -1) BK.V.iPageCurrent -= 2;
			BK.A.dg("pagenumber").value = BK.V.iPageCurrent;
			BK.A.pagestexture();
		}
	}
},



pagesearch: function(){
	var eA, iP;
	eA = BK.A.dg("pagenumber");
	iP = parseInt(eA.value);
	if (iP != BK.V.iPageCurrent){
		if (!(iP % 2)){
			iP--;
		}
		BK.V.iPageCurrent = iP - 2;
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
	eA = eI.querySelector("[DEF=currentPageTex]");
	eA.setAttribute("url", "./" + BK.V.iPageCurrent + ".jpg");
	eA = eI.querySelector("[DEF=nextPageTex]");
	eA.setAttribute("url", "./" + (BK.V.iPageCurrent + 2) + ".jpg");
	eA = eI.querySelector("[DEF=previousPageTex]");
	eA.setAttribute("url", "./" + (BK.V.iPageCurrent - 2) + ".jpg");
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



var BK2D = {

V: {
	aMax: [0, 0],
	aPreload: ['cover,back'],
	bInited: 0,
	iPageCurrent: 0 ,
	iPreloaded: 0,
	iPreloadedLast: 0,
},



preloader: function(){
	var eA, aP, aF, iMax;
	if (!BK2D.V.iPreloaded){
		aP = [1100, 16, 927, 1186, 8, 16, 927, 1186];
	} else {
		aP = [16, 8, 982, 1163, 1046, 8, 982, 1163];
	}
	if (BK2D.V.iPreloaded < BK2D.V.iPreloadedLast){
		eA = new Image();
		eA.setAttribute('crossOrigin', 'anonymous');
		aF = BK2D.V.aPreload[BK2D.V.iPreloaded].split(",");
		eA.src = aF[0] + ".jpg";
		eA.onload = function(){
			var eC, oC, eH, oH, sI, sJ, eP, iP;
			eC = BK.A.ele(0, "", "canvas");
			eC.width = 2048;
			eC.height = 2048;
			oC = eC.getContext("2d");
			oC.drawImage(eA, 0, 0);
			eH = BK.A.ele(0, "", "canvas");
			eH.width = aP[2];
			eH.height = aP[3];
			oH = eH.getContext("2d");
			oH.drawImage(eC, aP[0], aP[1], aP[2], aP[3], 0, 0, aP[2], aP[3]);
			sI = eH.toDataURL("image/png");
			oH.drawImage(eC, aP[4], aP[5], aP[6], aP[7], 0, 0, aP[6], aP[7]);
			sJ = eH.toDataURL("image/png");
			eP = BK.A.dg("page-" + aF[0]);
			eP.innerHTML = "";
			eP = BK.A.ele(eP, "imgwh100", "img");
			eP.src = sI;
			eP = BK.A.dg("page-" + aF[1]);
			eP.innerHTML = "";
			eP = BK.A.ele(eP, "imgwh100", "img");
			eP.src = sJ;
			if (BK2D.V.iPreloaded == 1){
				pageFlip = new St.PageFlip(
					BK.A.dg("demoBookExample"),{
					width: 550,
					height: 733,
					size: "stretch",
					minWidth: 150,
					maxWidth: BK2D.V.aMax[0] / 2,
					minHeight: 200,
					maxHeight: BK2D.V.aMax[1],
					maxShadowOpacity: 0.5,
					showCover: true,
					mobileScrollSupport: false,
				});		
				pageFlip.loadFromHTML(document.querySelectorAll(".page"));
				document.querySelector(".btn-next").addEventListener("click", () => {
					if (BK2D.V.iPageCurrent - 1 < BK.V.iPageLast){
						pageFlip.flipNext(); 
					}
				});
				document.querySelector(".btn-prev").addEventListener("click", () => {
					pageFlip.flipPrev(); 
				});
				pageFlip.on("flip", (e) => {
					var iP;
					eA = document.querySelector("#pagenumber");
					iP = eA.value;
					eA.value = e.data + 1;
					BK2D.V.iPageCurrent = parseInt(eA.value);
					BK2D.V.iPreloadedLast = BK2D.V.iPageCurrent + 2;
					BK2D.preloader();
				});
			}
			BK2D.V.iPreloaded++;
			BK2D.preloader();
		}
	}
},



init: function(){
	var iI, aF, sA, eA;

//	for (iI = 0; iI < ((BK.V.iPageLast - 1) / 2); iI++){
	for (iI = 0; iI < ((BK.V.iPageLast - 1) ); iI++){
			sA = (iI * 2 + 1) + ',' + (iI * 2 + 2);
		BK2D.V.aPreload.push(sA);
	}
	for (iI = 1; iI < BK2D.V.aPreload.length; iI++){
		aF = BK2D.V.aPreload[iI].split(",");
		eA = BK.A.dg("allpages");
		eB = BK.A.ele(eA, "page");
		eB = BK.A.ele(eB, "page-content");
		eP = BK.A.ele(eB, "page-image");
		eP.id = "page-" + aF[0];
		eB = BK.A.ele(eA, "page");
		eB = BK.A.ele(eB, "page-content");
		eP = BK.A.ele(eB, "page-image");
		eP.id = "page-" + aF[1];
	}
	BK2D.V.iPreloadedLast = 2;
	window.onresize = BK2D.resize;
	BK2D.resize();
	BK2D.preloader();
},



resize: function(){
	var eA, iW, iH;
	eA = BK.A.dg("book2d");
	iW = eA.parentNode.clientWidth;
	iH = eA.parentNode.clientHeight - 140;
	if (iW / 1.5 <= iH){
		eA.style.height = (iW / 1.5) + "px";
	} else {
		eA.style.width = (iH * 1.5) + "px";
	}

},



};


	


console.log("book5js");
