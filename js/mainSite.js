var doc = document,
	homeBtn = doc.getElementById("homeButton"),
	artsBtn = doc.getElementById("artsButton"),
	gamesBtn = doc.getElementById("gamesButton"),
	contactBtn = doc.getElementById("contactButton"),
	home = doc.getElementById("home"),
	arts = doc.getElementById("arts"),
	games = doc.getElementById("games"),
	contact = doc.getElementById("contact");

homeBtn.onclick = function(){
	home.setAttribute("class", "screen screen-active");
	arts.setAttribute("class", "screen screen-out");
	games.setAttribute("class", "screen screen-out");
	contact.setAttribute("class", "screen screen-out");
}
artsBtn.onclick = function(){
	home.setAttribute("class", "screen screen-out");
	arts.setAttribute("class", "screen screen-active");
	games.setAttribute("class", "screen screen-out");	
	contact.setAttribute("class", "screen screen-out");
}
gamesBtn.onclick = function(){
	home.setAttribute("class", "screen screen-out");
	arts.setAttribute("class", "screen screen-out");
	games.setAttribute("class", "screen screen-active");
	contact.setAttribute("class", "screen screen-out");
}
contactBtn.onclick = function(){
	home.setAttribute("class", "screen screen-out");
	arts.setAttribute("class", "screen screen-out");
	games.setAttribute("class", "screen screen-out");	
	contact.setAttribute("class", "screen screen-active");
}

var imageDiv = doc.getElementById("imageDiv"),
	sources3d = ["img/3d/1.png","img/3d/2.png","img/3d/3.png", "img/3d/4.png"],
	descriptions = ["Made on Blender (blender render)","Made on Blender (blender render)","Made on Blender (blender render)", "Blender Cycles Render"];
					


for(var i = 0; i<sources3d.length; i++){
	var div = doc.createElement("div");
	var description = doc.createElement("div");
	div.setAttribute("class", "imgShower");
	div.style.background="url("+sources3d[i]+")";
	description.textContent = descriptions[i];
	description.setAttribute("class", "imgDescription");
	div.appendChild(description);
	imageDiv.appendChild(div);
}