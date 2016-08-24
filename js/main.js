'use strict';

// First the user will need to choose how long they want their paragraph to be.
// Store the user's selection in a variable
// Display the paragraph

var potterApp = {};
var potterWordList = {};

potterApp.init = function () {
	potterApp.getData();
	potterApp.reset();
	potterApp.generateLorem();
	potterApp.copyButton();
};

potterApp.getData = function () {
	$.getJSON("js/potter.json", function (data) {
		potterWordList = data.results;
	});
};

potterApp.findSize = function () {
	// media query event handler
	if (matchMedia) {
		var mq = window.matchMedia("(min-width: 940px)");
		mq.addListener(WidthChange);
		WidthChange(mq);
		$(window).on("resize", function () {
			console.log(mq);
			WidthChange(mq);
		});
	}

	// media query change
	function WidthChange(mq) {
		if (mq.matches) {
			// window width is at least 940px
			//If body does NOT have this class add the scroll
			!$(".clickable").hasClass("hvr-wobble-horizontal");
		} else {
			// window width is less than 940px
			$(".clickable").removeClass("hvr-wobble-horizontal");
			$(window).off('scroll');
		}
	}
};

potterApp.reset = function () {
	$('.clickable').click(function () {
		$('.selected').removeClass('selected');
		$(this).addClass('selected');
		$('.textOutput').empty();
		$('.textOutput').removeClass('load');
	});
};

potterApp.generateLorem = function () {
	$('#generateLorem').on('submit', function (e) {
		// Prevent default submit action and insert submitted value from radio button into variable
		e.preventDefault();

		var loremLength = $('input[name=sizeChoice]:checked', '#generateLorem').val();
		console.log(loremLength);

		// If user clicks submit without selecting a size option, they will receive an alert.
		if (loremLength == null) {
			window.alert("Please choose a length.");
		}
		// If the user makes a selection, run the program.
		else {
				// First create an empty array.
				// This is where each word generated from the potterWordList will be stored.
				var potterLorem = [];

				// Now loop for array items until we reach desiredSize
				for (var i = 0; i < loremLength; i++) {
					// Generate a random number to serve as an index for the potterWordList array
					var randomNumber = Math.floor(Math.random() * loremLength + 1);
					// Assign a variable to the value retrieved from the index of the potterWordList array
					var potterWord = potterWordList[randomNumber];
					// Add the generated word to the new list using .push();
					potterLorem + potterLorem.push(potterWord);
					//Use .join() to seperate the words in the generated paragraph
					var potterSpace = potterLorem.join(" ");
				}

				console.log(potterLorem);

				$(".textOutput").addClass("load");
				$(".textOutput").prepend("You're a wizard Harry " + potterSpace + " I solemnly swear that I am up to no good.");

				var copyButton = $('<button>').text('COPY ME').attr('class', 'copyButton').attr('data-clipboard-target', '.textOutput');
				$('.copyContainer').append(copyButton);
			};
	});
};

potterApp.copyButton = function () {
	var clipboard = new Clipboard('.copyButton');
	// create a new instance of Clipboard plugin for the button element
	// using the class selector: .buttonClass

	// when text is copied into clipboard use it
	clipboard.on('success', function (e) {
		console.info('Action:', e.action);
		console.info('Text:', e.text);
		console.info('Trigger:', e.trigger);
		$('.log').text('Copied!');
		$('.copyButton').attr('title', 'Copied');
		e.clearSelection();
	});

	clipboard.on('error', function (e) {
		console.error('Action:', e.action);
		console.error('Trigger:', e.trigger);
	});

	$('.copyButton').attr('title', 'Copied');
};

$(function () {
	potterApp.init();
});