var doc = document;
var imageDiv = doc.getElementById("imageDiv");
var sources3d = ["img/3d/1.png","img/3d/2.png","img/3d/3.png", "img/3d/4.png"];
var descriptions = ["Made on Blender (blender render)","Made on Blender (blender render)","Made on Blender (blender render)", "Blender Cycles Render"];
					


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