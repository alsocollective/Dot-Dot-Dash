jQuery(document).ready(function($) {
	//initiallizing royalslider
	$(".royalSlider").royalSlider({
		arrowsNav: false,
		keyboardNavEnabled: true,
		controlNavigation: "none",
		autoScaleSlider: false,
		autoHeight: false
	});

	//load image as the backgrounds
	$("#image1").backstretch("/static/img/landscape1.jpeg");
	$("#image2").backstretch("/static/img/landscape2.jpg");
	$("#image3").backstretch("/static/img/landscape3.jpg");

	//making the nav button
	addEvent("aboutLink","about");
	addEvent("serviceLink","services");
	addEvent("clientsLink","clients");
	addEvent("ourWorkLink","work");
	addEvent("contactLink","contact");

	/*
	making a div at a static location from top for sticky
	*/
	$("#largeLogo").one('load',function(){
		$(setUpStaticLocationOfSticky()).waypoint(function(){
			$("#sticky_navigation").toggleClass("nav_fixed");
			$(".squareLogoHide").toggleClass("squareLogo");
		})
	}).each(function() {
  			if(this.complete) $(this).load();
	});

	//centering text ontop of the images
	//centerText(document.getElementById("image1"));

	//adding things that need to be done when window is resized
	window.addEventListener("resize",function(e){
		//centerText(document.getElementById("image1"));
	});
});


/////////////////
//OUR FUNCTIONS//
/////////////////

function addEvent(link, endPoint){
	document.getElementById(link).addEventListener('click', function(){
		goToThisEndPoint(endPoint);
	});
}

function goToThisEndPoint(location){
	var top = $(document.getElementById(location)).offset().top;
	var body = $("body,html");
	if(location == "work"){
		top += 100;
	}
	$(body).animate({scrollTop : top-100},1000);
	setTimeout(function(){
		//wait till after the scroll
		setHashTag(location);
	},1100);
}

function setHashTag(newTag){
	var element = document.getElementById(newTag);
	element.id = "";
	window.location.replace("#"+newTag);
	element.id = newTag;
}

function setUpStaticLocationOfSticky(){
	var newElement = document.createElement("div");
	newElement.id= "staticSticky";

	var logoHight = document.getElementById("largeLogo").height //$("#largeLogo").height();

	newElement.style.marginTop =  (logoHight+100) +"px";
	document.body.insertBefore(newElement,document.body.firstChild)
	return newElement;
}

function centerText(parentElement){
	//make sure that the div is the next element NO SPACES!!!
	var childElement = parentElement.childNodes[0];
//	var totalWidth = $(parentElement).width();
	var totalHeight = $(parentElement).height();
//	var width = $(childElement).width();
	var height = $(childElement).height();
//	childElement.style.marginLeft = ((totalWidth-width)/2)+"px"
	childElement.style.marginTop = ((totalHeight-height)/2)+"px"
}




