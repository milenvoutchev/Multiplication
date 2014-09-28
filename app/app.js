var App = {
	settings: {
		numBegin: 1,
		numEnd: 144,
		step: 1,
		containerId: "app-container",
		singleElementTag: "span",
		singleElementClass: "app-number",
		sayToConsole: true
	},
	numbers: [],
	init: function () {
		///<summary> Start the app </summary>
		var app = this;

		app.getData();
		app.showData();
		app.attachEvents();
	},
	getData: function (){
		///<summary> Generate our numbers (data) and save to app </summary>
		var app = this;
		
		var numbers = [];
		for(i = app.settings.numBegin; i<= app.settings.numEnd; i += app.settings.step){
			numbers.push(i);
		}
		app.numbers = numbers;
		
		app.say("getData: numbers populated: " + numbers.length);
	},
	showData: function () {
		///<summary> Populate our template and send it to the page </summary>
		var app = this;

		if ( typeof app.numbers != "object" || app.numbers.length == 0 ){
			app.say("showData called with no valid data");
			return false;
		}
		
		// prepare html for numbers
		var newHTML = new String();	
		app.numbers.forEach(function(number){
			// prepare number element
			var element = document.createElement(app.settings.singleElementTag);
			element.innerText = number;
			element.setAttribute("data-number", number);
			element.setAttribute("class", app.settings.singleElementClass);
			
			newHTML += element.outerHTML;
		});			

		// populate template
		document.getElementById(app.settings.containerId).innerHTML = newHTML;

		app.say("showData: app container populated");
	},
	attachEvents: function () {
		///<summary> Attach events </summary>
		var app = this;

		var element = document.getElementById(app.settings.containerId);
		
		element.addEventListener("click", function( event ) {

			var currentNumber = event.target.getAttribute("data-number");
			app.say('click ', currentNumber);
			var multiples = app.findMiltiples(currentNumber);	// find multiples for clicked number
			
			// check operation (on/off highlight)
			if ( event.target.classList.contains("on") ){
				// remove all highlight
				app.highlightElements(multiples, false);
			} else {
				// add highlight
				app.highlightElements(multiples, true);
			}
		}, false);

	},
	findMiltiples: function (baseNumber) {
		///<summary> Return multiples of number </summary>
		var app = this;
		
		var result = [];
		app.numbers.forEach(function(thisNumber){
			if ( thisNumber % baseNumber == 0 ){
				result.push(thisNumber);
			}
		});
		
		return result;
	},
	highlightElements: function (numbers, hightlightOn) {
		///<summary> Highlight numbers </summary>
		var app = this;

		var elements = document.getElementById(app.settings.containerId).childNodes;

		numbers.forEach(function(thisNumber){
			var position = app.numbers.indexOf(thisNumber);
			if ( hightlightOn ) {
				elements[position].classList.add("on");
			} else {
				elements[position].classList.remove("on");
			}
		});
		app.say('hightlight for:', numbers);
	},
	say: function (message){
		///<summary> Central logging method </summary>
		var app = this;
		if ( console && console.log && app.settings.sayToConsole) 
			console.log( arguments.length > 1 ? arguments : message );
	}
}
