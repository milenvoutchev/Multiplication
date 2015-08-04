var app = (function () {
    "use strict";

	var settings = {
		numBegin: 1,
		numEnd: 144,
		step: 1,
		containerId: "app-container",
		singleElementTag: "span",
		singleElementClass: "app-number",
		onClass: "on",
		sayToConsole: true
	};

    var numbers = [];

    var init = function () {
		///<summary> Start the app </summary>

		getData();
		showData();
		attachEvents();
	};

    var getData = function (){
		///<summary> Generate our numbers (data) and save to app </summary>

		for(var i = settings.numBegin; i<= settings.numEnd; i += settings.step){
			numbers.push(i);
		}

		say("getData: numbers populated: " + numbers.length);
	};

    var showData = function () {
		///<summary> Populate our template and send it to the page </summary>

		if ( typeof numbers != "object" || numbers.length == 0 ){
			say("showData called with no valid data");
			return false;
		}

		// prepare elements for numbers
		var newElements = new Array();	// use array for fast concatenation
		numbers.forEach(function(number){
			// prepare number element
			var element = document.createElement(settings.singleElementTag);
			element.innerText = number;
			element.setAttribute("data-number", number);
			element.setAttribute("class", settings.singleElementClass);

			newElements.push(element.outerHTML);
		});

		// combine elements to one html & populate template
		document.getElementById(settings.containerId).innerHTML = newElements.join("");

		say("showData: app container populated");
	};

    var attachEvents = function () {
		///<summary> Attach events </summary>

		var element = document.getElementById(settings.containerId);

		element.addEventListener("click", function( event ) {

			var currentNumber = event.target.getAttribute("data-number");
			say('click ', currentNumber);
			var multiples = findMiltiples(currentNumber);	// find multiples for clicked number
			
			// check operation (on/off highlight)
			if ( event.target.classList.contains("on") ){
				// remove all highlight
				highlightElements(multiples, false);
			} else {
				// add highlight
				highlightElements(multiples, true);
			}
		}, false);

	};

    var findMiltiples = function (baseNumber) {
		///<summary> Return multiples of number </summary>

		var result = [];
		numbers.forEach(function(thisNumber){
			if ( thisNumber % baseNumber == 0 ){
				result.push(thisNumber);
			}
		});
		
		return result;
	};

    var highlightElements = function (numbersToHighlight, hightlightOn) {
		///<summary> Highlight numbers </summary>

		var elements = document.getElementById(settings.containerId).childNodes;

		numbersToHighlight.forEach(function(thisNumber){
			var position = numbers.indexOf(thisNumber);	// find elements using their index instead of DOM search for speed
			if ( hightlightOn ) {
				elements[position].classList.add(settings.onClass);
			} else {
				elements[position].classList.remove(settings.onClass);
			}
		});
		say('hightlight for:', numbersToHighlight);
	};

    var say = function (message){
		///<summary> Central logging method </summary>
		if ( console && console.log && settings.sayToConsole)
			console.log( arguments.length > 1 ? arguments : message );
	};

    return {
        init: init,
        settings: settings,
        findMiltiples: findMiltiples,
        highlightElements: highlightElements
    }
}());