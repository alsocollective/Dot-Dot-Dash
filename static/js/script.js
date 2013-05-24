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
	$("#image1").backstretch("../static/img/landscape1.jpeg");
	$("#image2").backstretch("../static/img/landscape2.jpg");
	$("#image3").backstretch("../static/img/landscape3.jpg");

	//making the nav button
	addEvent("aboutLink","about");
	addEvent("serviceLink","services");
	addEvent("clientsLink","clients");
	addEvent("ourWorkLink","work");
	addEvent("contactLink","contact");

	/*
	making a div at a static location from top for sticky
	*/
	$("#largeLogo").one('load',function(){						//when the image loads do this
		$(setUpStaticLocationOfSticky(false)).waypoint(function(){ 	//setUpStaticLocationOfSticky returns an emement
			$("#sticky_navigation").toggleClass("nav_fixed");
			$(".squareLogoHide").toggleClass("squareLogo");
		})
	}).each(function() {
  			if(this.complete) $(this).load();
	}).error(function(){
		$(setUpStaticLocationOfSticky(72)).waypoint(function(){ 	//we give an argument of a potential hight
			$("#sticky_navigation").toggleClass("nav_fixed");
			$(".squareLogoHide").toggleClass("squareLogo");
		})
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

function setUpStaticLocationOfSticky(didNotLoad){		//loaded can either come in as false, or a value
	var newElement = document.createElement("div");
	newElement.id= "staticSticky";

	if(!didNotLoad){
		var logoHight = document.getElementById("largeLogo").height //$("#largeLogo").height();
		console.log("this");
		console.log(logoHight);
	} else {
		logoHight = didNotLoad;
	}
	newElement.style.marginTop =  (logoHight+100) +"px";
	document.body.insertBefore(newElement,document.body.firstChild)
	return newElement;
}
