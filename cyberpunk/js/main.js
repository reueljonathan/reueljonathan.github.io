var doc = document,
	actualScreen, newScreen,
	//Screens
	menuScreen = doc.getElementById("menu"),
	creditsScreen = doc.getElementById("credits"),
	gameScreen = doc.getElementById("game"),
	infoScreen = doc.getElementById("instructions"),
	//Buttons Menu
	playBtn = doc.getElementById("playBtn"),
	infoBtn = doc.getElementById("infoBtn"),
	creditsBtn = doc.getElementById("creditsBtn"),
	//Buttons Credits
	backInfoBtn = doc.getElementById("backInfoBtn"),
	backCreditsBtn = doc.getElementById("backCreditsBtn")
	;

doc.addEventListener("webkitTransitionEnd", function(e){
	actualScreen.setAttribute("class", "screen-false");
}, false);
doc.addEventListener("transitionend", function(e){
	actualScreen.setAttribute("class", "screen-false");
}, false);

infoBtn.onclick = function(){
	actualScreen = menuScreen;
	infoScreen.style.zIndex="1";
	menuScreen.style.zIndex="0";
	infoScreen.setAttribute("class", "screen-true");
}
creditsBtn.onclick = function(){
	actualScreen = menuScreen;
	creditsScreen.style.zIndex="1";
	menuScreen.style.zIndex="0";
	creditsScreen.setAttribute("class", "screen-true");
}

backCreditsBtn.onclick = function(){
	actualScreen = creditsScreen;
	menuScreen.style.zIndex="2";
	creditsScreen.style.zIndex="0";	
	menuScreen.setAttribute("class", "screen-true");
}
backInfoBtn.onclick = function(){
	actualScreen = infoScreen;
	menuScreen.style.zIndex="2";
	infoScreen.style.zIndex="0";	
	menuScreen.setAttribute("class", "screen-true");
}