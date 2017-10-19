var xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function(){
	if(this.readyState == 4 && this.status == 200){
		document.getElementById("content").innerHTML = xhttp.responseText;
	}
}

xhttp.open("GET", "pages/about.html", true);
xhttp.send();