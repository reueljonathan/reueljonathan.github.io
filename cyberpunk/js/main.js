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
	backCreditsBtn = doc.getElementById("backCreditsBtn"),
	gameInitialized = false,
	//timer.innerText = totalTime;
	gamePaused = true;

doc.addEventListener("webkitTransitionEnd", function(e){
	actualScreen.setAttribute("class", "screen-false");

	if(newScreen == gameScreen && !gameInitialized){
		//gamvas.start("gameCanvas", false);
		gameInitialized = true;
	}
}, false);
doc.addEventListener("transitionend", function(e){
	actualScreen.setAttribute("class", "screen-false");
	if(newScreen == gameScreen && !gameInitialized){
		//gamvas.start("gameCanvas", false);
		gameInitialized = true;
	}
}, false);

infoBtn.onclick = function(){
	actualScreen = menuScreen;
	newScreen = infoScreen;
	infoScreen.style.zIndex="1";
	menuScreen.style.zIndex="0";
	infoScreen.setAttribute("class", "screen-true");
}
creditsBtn.onclick = function(){
	actualScreen = menuScreen;
	newScreen = creditsScreen;
	creditsScreen.style.zIndex="1";
	menuScreen.style.zIndex="0";
	creditsScreen.setAttribute("class", "screen-true");
}

backCreditsBtn.onclick = function(){
	actualScreen = creditsScreen;
	menuScreen.style.zIndex="2";
	newScreen = menuScreen;
	creditsScreen.style.zIndex="0";	
	menuScreen.setAttribute("class", "screen-true");
}
backInfoBtn.onclick = function(){
	actualScreen = infoScreen;
	newScreen = menuScreen;
	menuScreen.style.zIndex="2";
	infoScreen.style.zIndex="0";	
	menuScreen.setAttribute("class", "screen-true");
}

playBtn.onclick = function(){
	actualScreen = menuScreen;
	newScreen = gameScreen;
	gameScreen.style.zIndex="0";
	menuScreen.style.zIndex="0";	
	gameScreen.setAttribute("class", "screen-true");
}

/*function count(){
	if(totalTime>0){
		totalTime--;
		timer.innerHTML = totalTime;
		setTimeout("count()", 1000);
	}	
}*/